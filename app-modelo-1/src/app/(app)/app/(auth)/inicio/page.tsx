import { getCurrentUserAction } from "@/actions/user"
import DefaultPageTemplate from "@/components/default-page-template"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { routes } from "@/config/routes"
import Link from "next/link"

export default async function HomePage() {
  const user = await getCurrentUserAction()

  return (
    <DefaultPageTemplate
      title={`Olá ${user?.givenName} ${user?.familyName}`}
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
