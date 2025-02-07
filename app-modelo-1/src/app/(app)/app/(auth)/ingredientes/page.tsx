import { getAllIngredientsAction } from "@/actions/ingredient"
import DefaultPageTemplate from "@/components/default-page-template"
import IngredientsTable from "@/components/tables/ingredients-table"
import FabButton from "@/components/ui/fab-button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default async function IngredientsPage() {
  const ingredients = await getAllIngredientsAction()

  return (
    <DefaultPageTemplate
      title="Ingredientes"
    >
      <Link href={`/app/ingredientes/novo`}>
        <FabButton><PlusIcon /></FabButton>
      </Link>
      <IngredientsTable data={ingredients} />
    </DefaultPageTemplate>
  )
}
