import { getIngredientBySlugAction } from "@/actions/ingredient"
import DefaultPageTemplate from "@/components/default-page-template"
import IngredientForm from "@/components/forms/ingredient-form"
import { Card, CardContent } from "@/components/ui/card"
import { IIngredient } from "@/models/ingredient"
import { notFound } from "next/navigation"

interface Props {
  params?: {
    slug: string
  }
}

export default async function NewIngredientPage({ params }: Props) {
  if (!params?.slug) {
    return notFound()
  }
  const ingredient: IIngredient | null = await getIngredientBySlugAction(params?.slug)

  return (
    <DefaultPageTemplate
      title={ingredient ? `Atualizar ${ingredient.name}` : 'Novo Ingrediente'}
      enableBackButton
    >
      <Card className="w-full mt-6 max-w-screen-md mx-auto">
        <CardContent>
          <IngredientForm ingredient={ingredient} />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
