import { HouseIcon, LucideIcon, UsersIcon } from "lucide-react"

type Route = {
  slug: string
  title: string
  url: string
  icon: LucideIcon
}
export const routes: Route[] = [
  {
    slug: "inicio",
    title: "Início",
    url: "/app/inicio",
    icon: HouseIcon
  },
  {
    slug: "usuarios",
    title: "Usuários",
    url: "/app/usuarios",
    icon: UsersIcon
  },
]