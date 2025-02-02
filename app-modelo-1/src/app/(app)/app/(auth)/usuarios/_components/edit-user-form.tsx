/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import { updateUserAction } from "@/actions/user"
import { ERole, ERoleEnumMapper, IUser } from "@/models/user"

const formSchema = z.object({
  givenName: z.string().nonempty(),
  familyName: z.string().nonempty(),
  email: z.string().email(),
  role: z.nativeEnum(ERole),
})

interface Props extends ComponentProps<'div'> {
  user: IUser | null | undefined
  allowed: boolean
  onSuccess?: () => void
  onError?: () => void
}

export default function EditUserForm({ user, allowed, onSuccess, onError, className, ...rest }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      givenName: user?.givenName,
      familyName: allowed ? user?.familyName : "*******",
      email: allowed ? user?.email : "*******",
      role: user?.role,
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateUserAction(values, user!.id)
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
            name="givenName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="familyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Permissão</FormLabel>
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
                    {Object.values(ERole).map((role) => (
                      <SelectItem key={role} value={role}>{ERoleEnumMapper[role].label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={!allowed}
            isLoading={form.formState.isSubmitting}
            type="submit"
          >Salvar {!allowed && "(sem permissão)"}</Button>
        </form>
      </Form>
    </div>
  )
}
