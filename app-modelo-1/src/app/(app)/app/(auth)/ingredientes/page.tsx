import { getAllIngredientsAction } from "@/actions/ingredient"
import DefaultPageTemplate from "@/components/default-page-template"
import IngredientsTable from "@/components/tables/ingredients-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FabButton from "@/components/ui/fab-button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default async function IngredientsPage() {
  const ingredients = await getAllIngredientsAction()

  return (
    <DefaultPageTemplate
      title="Ingredientes"
      className="w-full flex flex-col justify-start items-start"
    >
      <Link href={`/app/ingredientes/novo`} className="self-end">
        <FabButton className="sm:hidden"><PlusIcon /></FabButton>
        <Button className="hidden sm:block"><PlusIcon /> Adicionar Ingrediente</Button>
      </Link>
      <Card className="w-full py-6 px-4 pb-8 mt-6 sm:mt-2 sm:py-10 sm:px-6">
        <CardContent className="p-0">
          <IngredientsTable data={ingredients} />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
