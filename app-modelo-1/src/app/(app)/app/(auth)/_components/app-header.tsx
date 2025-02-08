import { SidebarTrigger } from "@/components/ui/sidebar"
import UserButton from "./user-button"
import Image from "next/image"
import { ToggleThemeButton } from "@/components/ui/toggle-theme"

export default function AppHeader() {
  return (
    <header className='bg-popover flex flex-row justify-between items-center w-full py-2 pl-2 pr-4 fixed top-0 right-0 left-0 z-40 h-10 sm:h-16'>
      <div className='flex gap-3 items-center'>
        <SidebarTrigger />
        <Image src="/app-logo.svg" alt="Logo" width={100} height={36} className="self-center" />
        {/* <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1> */}
      </div>
      <div className="flex gap-3 items-center">
        <ToggleThemeButton />
        <UserButton />
      </div>
    </header>
  )
}