"use client"

import { z } from "@/lib/pt-zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

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
  annotation: z.string().optional()
})

interface Props {
  onSuccess?: () => void
  onError?: () => void
}

export default function ProductForm({ onSuccess, onError }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

    },
  })
  const { toast } = useToast()

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
        <Button
          isLoading={form.formState.isSubmitting}
          type="submit"
          className="w-full sm:w-fit sm:px-10 self-center"
        >Salvar</Button>
      </form>
    </Form>
  )
}
