import { SidebarProvider } from "@/components/ui/sidebar"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import React, { PropsWithChildren } from 'react'
import AppSidebar from "./_components/app-sidebar"
import AppHeader from "./_components/app-header"

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { isAuthenticated } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()

  if (!isUserAuthenticated) {
    redirect('/app/entrar')
  }

  return (
    <SidebarProvider className='flex flow-row w-full' defaultOpen={false}>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <main className='p-4'>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
