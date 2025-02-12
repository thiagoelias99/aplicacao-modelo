import { DollarSignIcon, HouseIcon, LucideIcon, ShoppingBasketIcon, ShoppingCartIcon, UsersIcon } from "lucide-react"

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
  {
    slug: "ingredientes",
    title: "Ingredientes",
    url: "/app/ingredientes",
    icon: ShoppingBasketIcon
  },
  {
    slug: "produtos",
    title: "Produtos",
    url: "/app/produtos",
    icon: ShoppingCartIcon
  },
  {
    slug: "precificacao",
    title: "Precificação",
    url: "/app/precificacao",
    icon: DollarSignIcon
  }
]