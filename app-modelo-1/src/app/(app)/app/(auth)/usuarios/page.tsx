import DefaultPageTemplate from "@/components/default-page-template"
import UsersTable from "./_components/users-table"
import { prismaClient } from "@/lib/prisma"

export default async function UsersPage() {
  const users = await prismaClient.user.findMany()

  return (
    <DefaultPageTemplate
      title="Usuários"
    >
      <UsersTable data={users} />
    </DefaultPageTemplate>
  )
}
