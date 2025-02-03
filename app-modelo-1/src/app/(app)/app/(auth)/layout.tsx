import { SidebarProvider } from "@/components/ui/sidebar"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import React, { PropsWithChildren } from 'react'
import AppSidebar from "./_components/app-sidebar"
import AppHeader from "./_components/app-header"
import { ERole } from "@/models/user"
import { saveUserAction } from "@/actions/user"

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.email) {
    redirect('/app/entrar')
  }

  await saveUserAction({
    email: user.email || '',
    familyName: user.family_name || '',
    givenName: user.given_name || '',
    role: ERole.USER,
    imageUrl: user.picture || undefined,
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
