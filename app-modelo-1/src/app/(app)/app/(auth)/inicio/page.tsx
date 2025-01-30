import { Button } from "@/components/ui/button"
import { withRole } from "@/lib/withRole"
import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { Role } from "@prisma/client"

export default async function HomePage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  console.log(await withRole([Role.ADMIN]))

  return (
    <div>
      <p>
        Olá {user.given_name} {user.family_name}
      </p>
      <Button disabled={!await withRole([Role.ADMIN])}>Admin Only</Button>
      <LogoutLink>Log out</LogoutLink>
    </div>
  )
}
