import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import React, { PropsWithChildren } from 'react'

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()

  if (!isUserAuthenticated) {
    redirect('/app/entrar')
  }

  return (
    <main>
      {children}
    </main>
  )
}
