import { getProductBySlugAction } from "@/actions/product"
import DefaultPageTemplate from "@/components/default-page-template"
import ProductForm from "@/components/forms/product-form"
import { Card, CardContent } from "@/components/ui/card"
import { IProduct } from "@/models/product"
import { notFound } from "next/navigation"

type Params = Promise<{ slug: string }>

export default async function ProductPage(props: { params: Params }) {
  const params = await props.params
  const slug = params.slug

  if (!slug) {
    return notFound()
  }

  const product: IProduct | null = slug === 'adicionar-novo' ? null : await getProductBySlugAction(slug)

  return (
    <DefaultPageTemplate
      title={product ? `Atualizar ${product.name}` : 'Novo Produto'}
      enableBackButton
    >
      <Card className="w-full mt-6 max-w-screen-md mx-auto">
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
