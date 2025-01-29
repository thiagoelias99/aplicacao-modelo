import { SidebarTrigger } from "@/components/ui/sidebar"
import UserButton from "./user-button"

export default function AppHeader() {
  return (
    <header className='bg-popover flex flex-row justify-between items-center w-full py-2 pl-2 pr-4'>
      <div className='flex gap-2 items-center'>
        <SidebarTrigger />
        <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      </div>
      <UserButton />
    </header>
  )
}