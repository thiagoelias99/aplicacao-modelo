"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter, usePathname } from "next/navigation"
import { routes } from "@/config/routes"

export default function AppSidebar() {
  const { setOpenMobile } = useSidebar()
  const router = useRouter()
  const pathname = usePathname()


  function handleMenuClick(url: string) {
    setOpenMobile(false)
    router.push(url)
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{process.env.NEXT_PUBLIC_APP_NAME}</SidebarGroupLabel>
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