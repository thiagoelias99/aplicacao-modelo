"use client"

import { DataTable } from "@/components/ui/data-table"
import { RoleEnumMapper } from "@/lib/enum-utils"
import { cn } from "@/lib/utils"
import { Role, User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ComponentProps, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Edit2Icon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import EditUserForm from "./edit-user-form"
import { useToast } from "@/hooks/use-toast"

function getColumns(
  setSelectedUser: (user: User) => void,
): ColumnDef<User>[] {
  return [
    {
      accessorKey: "givenName",
      header: "Nome",
    },
    {
      accessorKey: "familyName",
      header: "Sobrenome",
    },
    {
      accessorKey: "email",
      header: () => <p className="text-center">Email</p>,
      cell: (row) => <p className="text-center">{row.getValue() as string}</p>
    },
    {
      accessorKey: "role",
      header: () => <p className="text-center">Permissão</p>,
      cell: (row) => <p className="text-center">{RoleEnumMapper[row.getValue() as Role].label}</p>,
    },
    {
      accessorKey: "id",
      header: () => <p className="text-center">Ações</p>,
      cell: (row) => <div>
        <SheetTrigger
          className={buttonVariants({
            size: 'smIcon',
            variant: 'outline',
          })}
          onClick={() => setSelectedUser(row.row.original)}
        >
          <Edit2Icon />
        </SheetTrigger>
      </div>,
    },
  ]
}

interface Props extends ComponentProps<'div'> {
  data: User[]
}

export default function UsersTable({ data, className, ...rest }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()


  return (
    <div className={cn("container mx-auto py-10", className)} {...rest}>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <DataTable columns={getColumns(setSelectedUser)} data={data} />
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Usuário</SheetTitle>
          </SheetHeader>
          <EditUserForm
            user={selectedUser}
            onSuccess={() => {
              setIsSheetOpen(false)
              toast({ title: 'Usuário atualizado com sucesso' })
            }}
            onError={() => {
              setIsSheetOpen(false)
              toast({ title: 'Erro ao atualizar usuário', variant: "destructive" })
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
