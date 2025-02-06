"use client"/* eslint-disable @typescript-eslint/no-unused-expressions */

import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import React, { ComponentProps } from 'react'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
import { EMeasureUnit, EMeasureUnitClass, EMeasureUnitClassMapper, EMeasureUnitMapper } from "@/models/ingredient"

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  measureUnitClass: z.nativeEnum(EMeasureUnitClass),
  measureUnit: z.nativeEnum(EMeasureUnit),
  measureUnitQuantity: z.union([
    z.string({ message: 'Valor inválido' })
      .transform((val) => parseInt(val))
      .refine((val) => val > 0, { message: 'O valor precisa ser positivo e maior que zero' }),
    z.number().positive(),
  ]),
  price: z.union([
    z.string({ message: 'Valor inválido' })
      .transform((val) => parseInt(val))
      .refine((val) => val > 0, { message: 'O valor precisa ser positivo e maior que zero' }),
    z.number().positive(),
  ])
})

interface Props extends ComponentProps<'div'> {
  onSuccess?: () => void
  onError?: () => void
}

export default function CreateIngredientForm({ onSuccess, onError, className, ...rest }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      measureUnitClass: undefined,
      measureUnit: undefined,
      measureUnitQuantity: undefined,
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)
      onSuccess && onSuccess()
    } catch (error) {
      console.error(error)
      onError && onError()
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
          <FormField
            control={form.control}
            name="measureUnitClass"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
                    {/* {Object.values(EMeasureUnit).map((item) => (
                      <SelectItem key={item} value={item}>{EMeasureUnitMapper[item].unit}</SelectItem>
                    ))} */}
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
          <FormField
            control={form.control}
            name="measureUnitQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Quantidade da embalagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Preço por embalagem" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
          >Salvar</Button>
        </form>
      </Form>
    </div>
  )
}
