import { getCurrentUserAction } from "@/actions/user"
import DefaultPageTemplate from "@/components/default-page-template"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UnauthorizedPage from "@/components/unauthorized-page"
import UserProfileForm from "./_components/user-profile-form"
import { TriangleAlertIcon } from "lucide-react"
import DeleteAccountConfirmation from "./_components/delete-account-confirmation"

export default async function ProfilePage() {
  const user = await getCurrentUserAction()

  if (!user) {
    return <UnauthorizedPage />
  }

  return (
    <DefaultPageTemplate
      title={user.givenName + " " + user.familyName}
      className="max-w-screen-md"
    >
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Informações do Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <UserProfileForm user={user} />
        </CardContent>
      </Card>

      <Card className="mt-8 border-2 border-destructive">
        <CardHeader className="flex flex-row justify-start items-center gap-4">
          <TriangleAlertIcon className="text-destructive" />
          <CardTitle className="text-destructive">Deletar conta</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Use o botão abaixo para deletar os seus dados pessoais da aplicação. Os dados após excluídos do servidor não poderão ser recuperados.</p>
          <DeleteAccountConfirmation />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
