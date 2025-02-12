import { getAllProductsAction } from "@/actions/product"
import DefaultPageTemplate from "@/components/default-page-template"
import ProductsTable from "@/components/tables/products-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FabButton from "@/components/ui/fab-button"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await getAllProductsAction()

  return (
    <DefaultPageTemplate
      title="Produtos"
      className="w-full flex flex-col justify-start items-start"
    >
      <Link href={`/app/produtos/editor/adicionar-novo`} className="self-end">
        <FabButton className="sm:hidden"><PlusIcon /></FabButton>
        <Button className="hidden sm:block"><PlusIcon /> Adicionar Produto</Button>
      </Link>
      <Card className="w-full mt-2">
        <CardContent className="p-0">
          <ProductsTable data={products} />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
