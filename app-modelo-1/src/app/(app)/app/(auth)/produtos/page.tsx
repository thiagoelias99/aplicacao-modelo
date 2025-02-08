import DefaultPageTemplate from "@/components/default-page-template"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FabButton from "@/components/ui/fab-button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  return (
    <DefaultPageTemplate
      title="Produtos"
      className="w-full flex flex-col justify-start items-start"
    >
      <Link href={`/app/produtos/adicionar-novo`} className="self-end">
        <FabButton className="sm:hidden"><PlusIcon /></FabButton>
        <Button className="hidden sm:block"><PlusIcon /> Adicionar Produto</Button>
      </Link>
      <Card className="w-full py-6 px-4 pb-8 mt-6 sm:mt-2 sm:py-10 sm:px-6">
        <CardContent className="p-0">
          {/* <IngredientsTable data={ingredients} /> */}
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
