import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"
import { getCurrentUserAction } from "@/actions/user"

export default async function UserButton() {
  const user = await getCurrentUserAction()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex gap-1 justify-end items-center'>
        <Avatar className='w-8 h-8'>
          <AvatarImage src={undefined} />
          <AvatarFallback>{user?.givenName?.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <p className='ml-1'>{user?.givenName} {user?.familyName}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Link href='/app/perfil'>Perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogoutLink>Sair</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}