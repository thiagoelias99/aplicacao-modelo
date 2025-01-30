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
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit2Icon, XIcon } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import EditUserForm from "./edit-user-form"
import { useToast } from "@/hooks/use-toast"
import { deleteUserAction } from "@/actions/user"

function getColumns(
  setSelectedUser: (user: User) => void,
  setIsDialogOpen: (isOpen: boolean) => void,
  setIsSheetOpen: (isOpen: boolean) => void
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
      cell: (row) => <div className="flex justify-center items-center gap-2">
        <Button
          size="smIcon"
          variant="secondary"
          onClick={() => {
            setSelectedUser(row.row.original)
            setIsSheetOpen(true)
          }}
        >
          <Edit2Icon />
        </Button>
        <Button
          size="smIcon"
          variant="destructive"
          onClick={() => {
            setSelectedUser(row.row.original)
            setIsDialogOpen(true)
          }}
        >
          <XIcon />
        </Button>
      </div>,
    },
  ]
}

interface Props extends ComponentProps<'div'> {
  data: User[]
}

export default function UsersTable({ data, className, ...rest }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { toast } = useToast()

  async function handleDeleteUser() {
    try {
      if (!selectedUser) return
      await deleteUserAction(selectedUser.id)
      toast({ title: 'Usuário excluído com sucesso' })
    } catch (error) {
      switch ((error as Error).message) {
        case "Unauthorized":
          toast({ title: 'Não autorizado', description: "Você não tem a permissão necessária para fazer essa ação", variant: "destructive" })
          break
        default:
          toast({ title: 'Erro ao excluir usuário', variant: "destructive" })
          break
      }
    }
  }

  return (
    <div className={cn("container mx-auto py-10", className)} {...rest}>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DataTable columns={getColumns(setSelectedUser, setIsDialogOpen, setIsSheetOpen)} data={data} />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Usuário {selectedUser?.givenName} {selectedUser?.familyName}?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. E todos os registros pessoais serão excluídos do servidor. <br /><br />Você tem certeza que deseja excluir esse usuário?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className={buttonVariants({ variant: "destructive" })}
              >Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
