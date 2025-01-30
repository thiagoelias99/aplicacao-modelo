import DefaultPageTemplate from "@/components/default-page-template"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { routes } from "@/config/routes"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"

export default async function HomePage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <DefaultPageTemplate
      title={`Olá ${user?.given_name} ${user?.family_name}`}
    >
      <div className="flex flex-col gap-2 mt-6">
        {routes.map(route => (
          <Link key={route.slug} href={route.url}>
            <Card key={route.slug}>
              <CardHeader>
                <CardTitle>Ir para {route.title}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </DefaultPageTemplate>
  )
}
