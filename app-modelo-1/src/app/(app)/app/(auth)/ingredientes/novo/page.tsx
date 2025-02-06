import DefaultPageTemplate from "@/components/default-page-template"
import CreateIngredientForm from "@/components/forms/create-ingredient-form"
import { Card, CardContent } from "@/components/ui/card"
import React from 'react'

export default function NewIngredientPage() {
  return (
    <DefaultPageTemplate
      title="Novo Ingrediente"
      enableBackButton
    >
      <Card className="mt-6">
        <CardContent>
          <CreateIngredientForm />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
