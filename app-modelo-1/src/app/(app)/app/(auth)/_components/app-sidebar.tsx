"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"
import { routes } from "@/config/routes"
import Image from "next/image"

export default function AppSidebar() {
  const { setOpenMobile, open } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()


  function handleMenuClick(url: string) {
    setOpenMobile(false)
    router.push(url)
  }

  return (
    <Sidebar collapsible='icon'>
      {open && (
        <SidebarHeader>
          <Image src="/app-logo.svg" alt="Logo" width={150} height={50} className="self-center py-4" />
          {/* <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1> */}
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.url)}
                    onClick={() => handleMenuClick(item.url)}
                    className="py-6"
                  >
                    <item.icon />
                    <span className="text-base">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}