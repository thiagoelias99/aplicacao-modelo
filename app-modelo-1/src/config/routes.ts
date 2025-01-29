import { ArrowLeftRightIcon, HouseIcon, LucideIcon, UsersIcon } from "lucide-react"

type Route = {
  title: string
  url: string
  icon: LucideIcon
}
export const routes: Route[] = [
  {
    title: "Início",
    url: "/app/inicio",
    icon: HouseIcon
  },
  {
    title: "Usuários",
    url: "/app/usuarios",
    icon: UsersIcon
  },
  {
    title: "Transações",
    url: "/app/transacoes",
    icon: ArrowLeftRightIcon,
  }
]