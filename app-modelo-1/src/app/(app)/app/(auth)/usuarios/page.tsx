import DefaultPageTemplate from "@/components/default-page-template"
import UsersTable from "./_components/users-table"
import { prismaClient } from "@/lib/prisma"
import { withRole } from "@/lib/withRole"
import UnauthorizedPage from "@/components/unauthorized-page"

export default async function UsersPage() {
  const auth = await withRole(["ADMIN", "MANAGER", "USER"])

  if (!auth) {
    return <UnauthorizedPage />
  }

  const users = await prismaClient.user.findMany({
    orderBy: {
      givenName: "asc",
    }
  })

  return (
    <DefaultPageTemplate
      title="Usuários"
    >
      <UsersTable data={users} />
    </DefaultPageTemplate>
  )
}
