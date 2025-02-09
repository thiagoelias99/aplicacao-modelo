"use client"

import { z } from "@/lib/pt-zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"


import ReactSelect from 'react-select'
import { useEffect, useMemo, useState } from "react"
import { getAllIngredientsAction } from "@/actions/ingredient"
import { EMeasureUnitClassMapper, IIngredient } from "@/models/ingredient"
import { H2 } from "../ui/typography"
import { PlusIcon, XIcon } from "lucide-react"

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
  ingredients: z.array(
    z.object({
      label: z.string().min(2).max(50).optional(),
      value: z.string().min(2).max(50).optional(),
      quantity: z.union([
        z.string({ message: "Valor inválido" })
          .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
            message: "Formato inválido. Use apenas números com . ou , como separador decimal."
          })
          .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
          .refine((val) => !isNaN(val) && val > 0, {
            message: "O valor precisa ser positivo e maior que zero"
          }),
        z.number().positive(),
      ]).optional()
    }))
    .default([])
})

interface Props {
  onSuccess?: () => void
  onError?: () => void
}

export default function ProductForm({ onSuccess, onError }: Props) {
  const [ingredients, setIngredients] = useState<IIngredient[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: [{ label: undefined, value: undefined }]
    },
  })
  const { toast } = useToast()

  useEffect(() => {
    getAllIngredientsAction().then(setIngredients)
  }, [])

  const selectOptions = useMemo(() => {
    return ingredients.map(ingredient => ({
      label: ingredient.name,
      value: ingredient.id,
      measureUnit: EMeasureUnitClassMapper[ingredient.measureUnitClass].mainUnit,
    }))
  }, [ingredients])

  function handleAddIngredient() {
    const ingredients = form.getValues("ingredients")
    form.setValue("ingredients", [...ingredients, { label: undefined, value: undefined, quantity: undefined }])
    form.clearErrors("ingredients")
  }

  function handleRemoveIngredient(id: string | undefined) {
    if (!id) return
    const ingredients = form.getValues("ingredients")
    const newIngredients = ingredients.filter((ingredient) => ingredient?.value !== id)
    form.reset({ ...form.getValues(), ingredients: newIngredients })
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (onSuccess) { onSuccess() } else {
        console.log(values)
        toast({
          title: 'Salvo com sucesso',
        })
      }
    } catch (error) {
      console.error(error)
      if (onError) { onError() } else {
        toast({
          title: 'Erro ao salvar',
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
            <FormItem>
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
        <FormField
          control={form.control}
          name="preparationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo de Preparo</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">minutos</span>
                  <Input
                    className="text-center"
                    placeholder="Tempo de preparo em minutos"
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
            <FormItem>
              <FormLabel>Rendimento do produto</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 text-muted-foreground border-l">pessoas</span>
                  <Input
                    className="text-center"
                    placeholder="Rendimento do produto para pessoas"
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
          name="description"
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
        <H2>Ingredientes</H2>
        <div className="w-full flex flex-col gap-1">
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
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <ReactSelect
                        options={selectOptions}
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
                  <FormItem className="w-28">
                    <FormLabel className="text-center">Quant.</FormLabel>
                    <FormControl>
                      <Input
                        className="text-center"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => handleRemoveIngredient(value?.value)}
              ><XIcon /></Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddIngredient}
        ><PlusIcon /> Adicionar ingrediente</Button>
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting}
          className="w-full sm:w-fit sm:px-10 self-center"
        >Salvar Produto</Button>
      </form>
    </Form>
  )
}
