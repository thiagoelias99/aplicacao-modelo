/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { z } from "@/lib/pt-zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"


import ReactSelect from 'react-select'
import { useEffect, useMemo, useState } from "react"
import { getAllIngredientsAction } from "@/actions/ingredient"
import { EMeasureUnitClassMapper, EMeasureUnit, EMeasureUnitMapper, Ingredient } from "@/models/ingredient"
import { H2 } from "../ui/typography"
import { PlusIcon, XIcon } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { createProductAction, updateProductAction } from "@/actions/product"
import { IProduct, Product } from "@/models/product"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  preparationTime: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Formato inválido. Insira apenas números inteiros positivos."
      })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().int().positive(),
  ]),
  yield: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Formato inválido. Insira apenas números inteiros positivos."
      })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().int().positive(),
  ]),
  annotation: z.string().optional(),
  recipe: z.string().optional(),
  ingredients: z.array(
    z.object({
      label: z.string({ message: "Teste" }).min(2).max(50).optional(),
      value: z.string({ message: "Teste" }).min(2).max(50).optional(),
      quantity: z.union([
        z.string({ message: "Valor necessário" })
          .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
            message: "Formato inválido. Use apenas números com . ou , como separador decimal."
          })
          .transform((val) => parseFloat(val.replace(",", ".")))
          .refine((val) => !isNaN(val) && val > 0, {
            message: "O valor precisa ser positivo e maior que zero"
          }),
        z.number().positive(),
      ]).optional(),
      measureUnit: z.nativeEnum(EMeasureUnit).optional(),
    }))
    .default([]),
  profitMargin: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ]),
  sellingPrice: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val) && val > 0, {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().positive(),
  ])
})

interface Props {
  product: IProduct | null
  onSuccess?: () => void
  onError?: () => void
}

export default function ProductForm({ product, onSuccess, onError }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [referencePrice, setReferencePrice] = useState<number>(0)

  const productObject = useMemo(() => product ? new Product(product) : null, [product])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: productObject?.name || undefined,
      description: productObject?.description || undefined,
      preparationTime: productObject?.preparationTime || undefined,
      yield: productObject?.yield || undefined,
      annotation: productObject?.annotation || undefined,
      recipe: productObject?.recipe || undefined,
      profitMargin: productObject?.profitMargin || 10,
      sellingPrice: productObject?.sellingPrice || undefined,
      ingredients: productObject?.ingredients.map(ingredient => ({
        label: ingredient.ingredient.name,
        value: ingredient.ingredient.id,
        quantity: ingredient.quantity,
        measureUnit: ingredient.measureUnit
      })) || [],
    },
  })

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    getAllIngredientsAction()
      .then((data) => setIngredients(data.map(ingredient => new Ingredient(ingredient))))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const price = form.getValues("ingredients").reduce((acc, ingredient) => {
      if (ingredient?.value && ingredient?.quantity && ingredient?.measureUnit) {
        const selectedIngredient = ingredients.find(i => i.id === ingredient.value)
        if (selectedIngredient) {
          acc += calculateIngredientPrice(
            Number(ingredient.quantity.toString().replace(",", ".")),
            selectedIngredient.pricePerUnit
          )
        }
      }
      return acc
    }, 0)

    setReferencePrice(price)
  }, [form.watch()])

  const selectOptions = useMemo(() => {
    return ingredients.map(ingredient => ({
      label: ingredient.name,
      value: ingredient.id,
      measureUnit: EMeasureUnitClassMapper[ingredient.measureUnitClass].mainUnit,
      referencePrice: ingredient.pricePerUnit,
      referenceQuantity: ingredient.measureUnitQuantity,
      referenceUnit: ingredient.measureUnit,
    }))
  }, [ingredients])

  function handleAddIngredient() {
    const ingredients = form.getValues("ingredients")
    form.setValue("ingredients", [...ingredients, { label: undefined, value: undefined, quantity: undefined, measureUnit: undefined }])
    form.clearErrors("ingredients")
  }

  function handleRemoveIngredient(index: number) {
    const ingredients = form.getValues("ingredients")
    const newIngredients = ingredients.filter((ingredient, i) => i !== index)
    form.reset({ ...form.getValues(), ingredients: newIngredients })
  }

  function calculateIngredientPrice(quantity: number, referencePrice: number) {
    return quantity * referencePrice
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const filteredIngredients = values.ingredients.filter(ingredient => !!ingredient?.value && !!ingredient?.quantity && !!ingredient?.measureUnit)

    try {

      if (product) {
        // Update
        await updateProductAction({
          ...product,
          ...values,
          ingredients: filteredIngredients.map(ingredient => ({
            id: ingredient.value!,
            quantity: ingredient.quantity!,
            measureUnit: ingredient.measureUnit!
          }))
        })

      } else {
        // Create
        await createProductAction({
          ...values,
          ingredients: filteredIngredients.map(ingredient => ({
            id: ingredient.value!,
            quantity: ingredient.quantity!,
            measureUnit: ingredient.measureUnit!
          })),
          slug: ""
        })
      }

      if (onSuccess) { onSuccess() } else {
        toast({
          title: 'Salvo com sucesso',
        })
        router.back()
      }
    } catch (err) {
      const error = err as Error
      console.error(error)

      if (onError) { onError() } else {
        toast({
          title: 'Erro ao salvar',
          description: error.message,
          variant: "destructive"
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 pt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="lg:w-1/2">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição <i>(opcional)</i></FormLabel>
              <FormControl>
                <Input placeholder="Digite uma descrição para o produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="contents lg:flex gap-4 lg:w-full">
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem className="lg:w-full">
                <FormLabel>Tempo de Preparo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">minutos</span>
                    <Input
                      className="text-center lg:text-start placeholder:text-start"
                      placeholder="Qual o tempo de preparo?"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yield"
            render={({ field }) => (
              <FormItem className="lg:w-full">
                <FormLabel>Rendimento do produto</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">porções</span>
                    <Input
                      className="text-center lg:text-start placeholder:text-start"
                      placeholder="Qual o rendimento?"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="annotation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anotações <i>(opcional)</i></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite anotações para o produto" {...field}
                  className="min-h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recipe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receita <i>(opcional)</i></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Qual a receita do produto?" {...field}
                  className="min-h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <H2>Ingredientes ({form.getValues("ingredients").length})</H2>
          <FormDescription className="mt-1">Adicione abaixo os ingredientes necessários para o produto</FormDescription>
          <div className="w-full mt-2 flex flex-col gap-[2px]">
            <div className="w-full flex justify-between items-center gap-1 mb-1">
              <span className="w-full">Nome</span>
              <span className="w-44">Quant.</span>
            </div>
            {form.getValues("ingredients")?.map((value, index) => (
              <div
                key={index}
                className="w-full flex justify-start items-end gap-1"
              >
                <FormField
                  control={form.control}
                  name={`ingredients[${index}]` as `ingredients.${number}`}
                  key={`ingredients[${index}]`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <ReactSelect
                          options={selectOptions}
                          isLoading={isLoading}
                          isDisabled={isLoading}
                          noOptionsMessage={() => "Nenhum item encontrado"}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "transparent",
                              borderColor: "hsl(var(--border))",
                              color: "hsl(var(--foreground))",
                            }),
                            indicatorSeparator: (provided) => ({
                              ...provided,
                              display: "none"
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected ? "hsl(var(--primary))" : state.isFocused ? "hsl(var(--accent))" : "hsl(var(--popover))",
                              color: state.isSelected ? "hsl(var(--primary-foreground))" : state.isFocused ? "hsl(var(--accent-foreground))" : "hsl(var(--popover-foreground))",
                              fontSize: "0.875rem"
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "hsl(var(--foreground))",
                              fontSize: "0.875rem"
                            }),
                            input: (provided) => ({
                              ...provided,
                              color: "hsl(var(--foreground))",
                              fontSize: "0.875rem"
                            }),
                            clearIndicator: (provided) => ({
                              ...provided,
                              color: "hsl(var(--muted-foreground))",
                            }),
                            dropdownIndicator: (provided) => ({
                              ...provided,
                              color: "hsl(var(--muted-foreground))",
                              strokeWidth: 1,
                            }),
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`ingredients[${index}].quantity` as `ingredients.${number}.quantity`}
                  render={({ field }) => (
                    <FormItem className="w-52">
                      <FormControl>
                        <div className="relative w-full">
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">{EMeasureUnitMapper[form.getValues(`ingredients[${index}].measureUnit` as `ingredients.${number}.measureUnit`) as EMeasureUnit]?.unit}</span>
                          <Input
                            disabled={!form.getValues(`ingredients[${index}].value` as `ingredients.${number}.value`) || isLoading}
                            className="text-start"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  disabled={isLoading}
                  size="icon"
                  variant="destructive"
                  onClick={() => handleRemoveIngredient(index)}
                ><XIcon /></Button>
              </div>
            ))}
          </div>
          <Button
            isLoading={isLoading}
            type="button"
            variant="secondary"
            onClick={handleAddIngredient}
            className="w-full mt-2"
          ><PlusIcon /> Adicionar ingrediente</Button>
        </div>
        <div>
          <H2>Preços</H2>
          <FormDescription className="mt-1">Ajuste abaixo o preço do produto</FormDescription>
          <ul className="w-full flex flex-col gap-2 mt-2">
            <li className="w-full flex justify-between items-center gap-2">
              <p>Preço bruto dos ingredientes</p>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 text-muted-foreground border-r">R$</span>
                <Input
                  value={formatCurrency(referencePrice, { hideCurrency: true }) || "0,00"}
                  onChange={() => { }}
                  className="text-right w-28 cursor-not-allowed"
                />
              </div>
            </li>
            <li className="w-full flex justify-between items-center gap-2">
              <p>Margem de lucro</p>
              <FormField
                control={form.control}
                name="profitMargin"
                render={({ field }) => (
                  <FormItem className="text-right w-28 cursor-not-allowed">
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">%</span>
                        <Input
                          className="text-right pr-10 border-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </li>
            <li className="w-full flex justify-between items-center gap-2">
              <p>Preço sugerido</p>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 text-muted-foreground border-r">R$</span>
                <Input
                  value={formatCurrency(referencePrice * (1 + Number(form.getValues("profitMargin")?.toString().replace(",", ".")) / 100) || 0, { hideCurrency: true })}
                  onChange={() => { }}
                  className="text-right w-28 cursor-not-allowed"
                />
              </div>
            </li>
            <li className="w-full flex justify-between items-center gap-2">
              <p>Preço de Venda</p>
              <FormField
                control={form.control}
                name="sellingPrice"
                render={({ field }) => (
                  <FormItem className="text-right w-28 cursor-not-allowed">
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 text-muted-foreground border-r">R$</span>
                        <Input
                          className="pl-12 text-right border-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </li>
          </ul>
        </div>
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting}
          className="w-full sm:w-fit sm:px-10 self-center"
        >Salvar Produto</Button>
      </form>
    </Form>
  )
}
