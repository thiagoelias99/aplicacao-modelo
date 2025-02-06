import DefaultPageTemplate from "@/components/default-page-template"
import FabButton from "@/components/ui/fab-button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default function IngredientsPage() {
  return (
    <DefaultPageTemplate
      title="Ingredientes"
    >
      <Link href={`/app/ingredientes/novo`}>
        <FabButton><PlusIcon /></FabButton>
      </Link>
    </DefaultPageTemplate>
  )
}
