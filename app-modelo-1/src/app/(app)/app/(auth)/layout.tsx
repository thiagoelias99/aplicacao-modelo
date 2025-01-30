import { SidebarProvider } from "@/components/ui/sidebar"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import React, { PropsWithChildren } from 'react'
import AppSidebar from "./_components/app-sidebar"
import AppHeader from "./_components/app-header"
import { prismaClient } from "@/lib/prisma"
import { Role } from "@prisma/client"

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id || !user?.email) {
    redirect('/app/entrar')
  }

  await prismaClient.user.upsert({
    create: {
      id: user.id,
      email: user.email || '',
      familyName: user.family_name || '',
      givenName: user.given_name || '',
      role: Role.USER,
      imageUrl: user.picture || '',
    },
    update: {
      imageUrl: user.picture || '',
    },
    where: {
      email: user.email
    }
  })

  return (
    <SidebarProvider className='flex flow-row w-full' defaultOpen={false}>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <main>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
