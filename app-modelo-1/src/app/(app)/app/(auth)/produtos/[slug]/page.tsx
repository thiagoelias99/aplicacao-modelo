/* eslint-disable react/no-unescaped-entities */
import { getPricingConstantsAction } from "@/actions/constant"
import { getProductBySlugAction } from "@/actions/product"
import DefaultPageTemplate from "@/components/default-page-template"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Caption, H1, H2, H3, H4, P } from "@/components/ui/typography"
import { formatCurrency } from "@/lib/utils"
import { EMeasureUnitMapper } from "@/models/ingredient"
import { IProduct, Product } from "@/models/product"
import { DotIcon } from "lucide-react"
import { notFound } from "next/navigation"

type Params = Promise<{ slug: string }>

export default async function ProductPage(props: { params: Params }) {
  const params = await props.params
  const slug = params.slug

  if (!slug) {
    return notFound()
  }
  const productDB: IProduct | null = await getProductBySlugAction(slug)
  if (!productDB) {
    return notFound()
  }
  const product = new Product(productDB)
  const taxes = await getPricingConstantsAction()
  product.setTaxes(taxes)

  return (
    <DefaultPageTemplate >
      <Card className="w-full mt-6 max-w-screen-md mx-auto">
        <CardHeader>
          <H1>{product.name}</H1>
          <CardDescription className="italic">{product.slug}</CardDescription>
        </CardHeader>
        <CardContent>
          <P className="tracking-widest italic">"{product.description}"</P>
          <section className="w-full flex flex-row justify-between gap-1 mt-4">
            <div className="w-full flex flex-col justify-center items-center gap-2 py-2 px-4 border rounded shadow">
              <Caption className="text-muted-foreground text-xs">Tempo de Preparação</Caption>
              <H3>{product.preparationTime} minutos</H3>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-2 py-2 px-4 border rounded shadow">
              <Caption className="text-muted-foreground text-xs">Tempo de Rendimento</Caption>
              <H3>{product.yield} porções</H3>
            </div>
          </section>
          <section>
            <H2 className="mt-6">Preços</H2>
            <ul className="w-full space-y-1 mt-2">
              <li className="flex flex-row justify-between items-center gap-2 py-2 px-4 border rounded shadow">
                <div>
                  <H4>Retirada / Balcão</H4>
                  <span className="text-muted-foreground text-xs">Taxa adicional de {taxes.pickUpTax.toString().replace(".", ",")}%</span>
                </div>
                <div>
                  <P className="text-muted-foreground">{formatCurrency(product.getSellingPricesWithTaxes().pickUpPrice)}</P>
                </div>
              </li>
              <li className="flex flex-row justify-between items-center gap-2 py-2 px-4 border rounded shadow">
                <div>
                  <H4>Delivery</H4>
                  <span className="text-muted-foreground text-xs">Taxa adicional de {taxes.privateDeliveryTax.toString().replace(".", ",")}%</span>
                </div>
                <div>
                  <P className="text-muted-foreground">{formatCurrency(product.getSellingPricesWithTaxes().privateDeliveryPrice)}</P>
                </div>
              </li>
              <li className="flex flex-row justify-between items-center gap-2 py-2 px-4 border rounded shadow">
                <div>
                  <H4>Delivery IFood</H4>
                  <span className="text-muted-foreground text-xs">Taxa adicional de {taxes.iFoodDeliveryTax.toString().replace(".", ",")}%</span>
                </div>
                <div>
                  <P className="text-muted-foreground">{formatCurrency(product.getSellingPricesWithTaxes().iFoodDeliveryPrice)}</P>
                </div>
              </li>
            </ul>
          </section>
          <section className="mt-6">
            <H2>Ingredientes</H2>
            <ul className="space-y-2 mt-2">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient.ingredient.id}>
                  <div className="flex flex-row justify-start items-center">
                    <DotIcon className="h-6 w-6" />
                    <H4>{ingredient.ingredient.name}</H4>
                    <p className="text-muted-foreground text-sm pl-2">{ingredient.quantity} {EMeasureUnitMapper[ingredient.measureUnit].unit}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-6">
            <H2>Receita</H2>
            <p
              className="mt-2 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: product.recipe || "Não há receita para este produto" }}
            ></p>
          </section>
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
