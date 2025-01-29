import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function HomePage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <div>
      <p>
        Olá {user.given_name} {user.family_name}
      </p>
      <LogoutLink>Log out</LogoutLink>
    </div>
  )
}
