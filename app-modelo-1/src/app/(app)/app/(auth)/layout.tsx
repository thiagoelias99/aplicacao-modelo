import { SidebarProvider } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import React, { PropsWithChildren } from 'react'
import AppSidebar from "./_components/app-sidebar"
import AppHeader from "./_components/app-header"
import { ERole } from "@/models/user"
import { saveUserAction } from "@/actions/user"
import { getAppAuth } from "@/auth/get-app-auth"

export default async function AuthLayout({ children }: PropsWithChildren) {
  const auth = await getAppAuth()

  if (!auth.authenticated || !auth.user) {
    redirect('/app/entrar')
  }

  await saveUserAction({
    email: auth.user.email,
    familyName: auth.user.familyName,
    givenName: auth.user.givenName,
    role: ERole.USER,
    imageUrl: auth.user.client_img,
  })

  return (
    <SidebarProvider className='flex flow-row w-full' defaultOpen={false}>
      <AppSidebar />
      <div className='w-full'>
        <AppHeader />
        <main className="w-full mt-10 sm:mt-16">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
