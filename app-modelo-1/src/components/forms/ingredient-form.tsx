"use client"

import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import React, { ComponentProps } from 'react'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
import { EMeasureUnit, EMeasureUnitClass, EMeasureUnitClassMapper, EMeasureUnitMapper, IIngredient, Ingredient } from "@/models/ingredient"
import { createIngredientAction, updateIngredientAction } from "@/actions/ingredient"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  measureUnitClass: z.nativeEnum(EMeasureUnitClass),
  measureUnit: z.nativeEnum(EMeasureUnit),
  measureUnitQuantity: z.union([
    z.string({ message: 'Valor inválido' })
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, { message: 'O valor precisa ser positivo e maior que zero' }),
    z.number().positive(),
  ]),
  price: z.union([
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

interface Props extends ComponentProps<'div'> {
  ingredient: IIngredient | null
  onSuccess?: () => void
  onError?: () => void
}

export default function IngredientForm({ ingredient, onSuccess, onError, className, ...rest }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ingredient?.name,
      description: ingredient?.description,
      measureUnit: ingredient?.measureUnit,
      measureUnitClass: ingredient?.measureUnitClass,
      measureUnitQuantity: ingredient?.measureUnitQuantity,
      price: ingredient?.price,
    },
  })
  const { toast } = useToast()
  const router = useRouter()


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {

      if (ingredient) {
        // Update
        await updateIngredientAction({ ...ingredient, ...values })
      } else {
        // Create
        await createIngredientAction(values)
      }

      if (onSuccess) { onSuccess() } else {
        toast({
          title: 'Ingrediente salvo com sucesso',
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
    <div
      className={cn("pt-4", className)}
      {...rest}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do ingrediente" {...field} />
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
                  <Input placeholder="Digite uma descrição para o ingrediente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="contents sm:flex gap-4">
            <FormField
              control={form.control}
              name="measureUnitClass"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Classe de Medida</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(EMeasureUnitClass).map((item) => (
                        <SelectItem key={item} value={item}>{EMeasureUnitClassMapper[item].label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="measureUnit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Unidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={!EMeasureUnitClassMapper[form.watch('measureUnitClass')]}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EMeasureUnitClassMapper[form.watch('measureUnitClass') as EMeasureUnitClass] ?
                        (
                          EMeasureUnitClassMapper[form.watch('measureUnitClass') as EMeasureUnitClass].primaryUnits.map((item) => (
                            <SelectItem key={item} value={item}>{EMeasureUnitMapper[item].unit}</SelectItem>
                          ))
                        ) : (
                          null
                        )
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="measureUnitQuantity"
            render={({ field }) => (
              <FormItem className="sm:w-1/2 sm:pr-2">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantidade da embalagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:w-1/2 sm:pr-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 text-muted-foreground border-r">R$</span>
                      <Input
                        className="pl-12"
                        placeholder="Preço total"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-xs text-gray-500 pl-2">{Ingredient.getFormattedPricePerUnit(
              Number(form.watch('price')?.toString().replace(",", ".")),
              form.watch('measureUnit'),
              form.watch('measureUnitQuantity'),
              form.watch('measureUnitClass')
            )}</span>
          </div>
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
            className="w-full sm:w-fit sm:px-10 self-center"
          >Salvar</Button>
        </form>
      </Form>
    </div>
  )
}
