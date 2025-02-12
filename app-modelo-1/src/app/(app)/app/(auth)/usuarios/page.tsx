import DefaultPageTemplate from "@/components/default-page-template"
import UsersTable from "./_components/users-table"
import { withRole } from "@/lib/withRole"
import UnauthorizedPage from "@/components/unauthorized-page"
import { ERole } from "@/models/user"
import { getUsersAction } from "@/actions/user"
import { Card, CardContent } from "@/components/ui/card"

export default async function UsersPage() {
  const auth = await withRole([ERole.ADMIN, ERole.MANAGER, ERole.USER])

  if (!auth) {
    return <UnauthorizedPage />
  }

  const users = await getUsersAction()

  return (
    <DefaultPageTemplate
      title="Usuários"
    >
      <Card className="w-full mt-2">
        <CardContent>
          <UsersTable data={users} />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
