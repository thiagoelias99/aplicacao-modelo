"use client"

import { z } from "@/lib/pt-zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { IConstant } from "@/repository/constant-repository"
import { EConstants } from "@/lib/constants"
import { saveConstantsAction } from "@/actions/constant"

const formSchema = z.object({
  pickUpTax: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val), {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().nonnegative(),
  ]),
  privateDeliveryTax: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val), {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().nonnegative(),
  ]),
  iFoodDeliveryTax: z.union([
    z.string({ message: "Valor inválido" })
      .refine((val) => /^(\d+([.,]\d*)?|\d*[.,]\d+)$/.test(val), {
        message: "Formato inválido. Use apenas números com . ou , como separador decimal."
      })
      .transform((val) => parseFloat(val.replace(",", "."))) // Converte , para . antes do parse
      .refine((val) => !isNaN(val), {
        message: "O valor precisa ser positivo e maior que zero"
      }),
    z.number().nonnegative(),
  ])
})

interface Props {
  data: {
    pickUpTax: number
    privateDeliveryTax: number
    iFoodDeliveryTax: number
  }
  onSuccess?: () => void
  onError?: () => void
}


export default function PricingForm({ data, onSuccess, onError }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-expect-error("Input is string validated")
      pickUpTax: data.pickUpTax.toString().replace(".", ","),
      // @ts-expect-error("Input is string validated")
      privateDeliveryTax: data.privateDeliveryTax.toString().replace(".", ","),
      // @ts-expect-error("Input is string validated")
      iFoodDeliveryTax: data.iFoodDeliveryTax.toString().replace(".", ","),
    },
  })
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const preparedData: IConstant[] = [
        { key: EConstants.PICK_UP_TAX, value: values.pickUpTax.toString() },
        { key: EConstants.PRIVATE_DELIVERY_TAX, value: values.privateDeliveryTax.toString() },
        { key: EConstants.I_FOOD_DELIVERY_TAX, value: values.iFoodDeliveryTax.toString() },
      ]

      await saveConstantsAction(preparedData)

      if (onSuccess) { onSuccess() } else {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pt-6 flex flex-col gap-4">
        <ul className="w-full flex flex-col gap-2">
          <li className="w-full flex justify-between items-center gap-2">
            <p>Retirada no balcão</p>
            <FormField
              control={form.control}
              name="pickUpTax"
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
            <p>Delivery próprio</p>
            <FormField
              control={form.control}
              name="privateDeliveryTax"
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
            <p>Delivery (IFood)</p>
            <FormField
              control={form.control}
              name="iFoodDeliveryTax"
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
        </ul>
        <Button
          isLoading={form.formState.isSubmitting}
          type="submit"
          className="w-full sm:w-fit sm:px-10 self-center"
        >Salvar</Button>
      </form>
    </Form>
  )
}
