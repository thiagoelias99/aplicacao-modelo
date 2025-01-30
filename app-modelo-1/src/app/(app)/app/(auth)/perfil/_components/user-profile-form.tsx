"use client"

import { z } from "@/lib/pt-zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Role, User } from "@prisma/client"
import React, { ComponentProps } from 'react'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RoleEnumMapper } from "@/lib/enum-utils"
import { updateCurrentUserAction } from "@/actions/user"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  givenName: z.string().nonempty(),
  familyName: z.string().nonempty(),
  email: z.string().email()
})

interface Props extends ComponentProps<'div'> {
  user: User | null | undefined
  onSuccess?: () => void
  onError?: () => void
}

export default function UserProfileForm({ user, className, ...rest }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      givenName: user?.givenName,
      familyName: user?.familyName,
      email: user?.email
    },
  })
  const { toast } = useToast()


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateCurrentUserAction(values)
      toast({ title: "Usuário atualizado com sucesso" })
    } catch (error) {
      console.error(error)
      toast({ title: "Erro ao atualizar usuário", variant: "destructive" })
    }
  }

  return (
    <div
      className={cn("", className)}
      {...rest}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-4 justify-start items-start">
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu sobrenome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Permissão: {RoleEnumMapper[user?.role as Role].label}</FormLabel>
          </div>

          <Button
            isLoading={form.formState.isSubmitting}
            type="submit"
          >Salvar</Button>
        </form>
      </Form>
    </div>
  )
}
