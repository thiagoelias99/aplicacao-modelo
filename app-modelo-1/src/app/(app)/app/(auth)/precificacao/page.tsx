import { getPricingConstantsAction } from "@/actions/constant"
import DefaultPageTemplate from "@/components/default-page-template"
import PricingForm from "@/components/forms/pricing-form"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import React from 'react'

export default async function PricingPage() {
  const data = await getPricingConstantsAction()

  return (
    <DefaultPageTemplate
      title="Precificação"
      className="w-full flex flex-col justify-start items-start max-w-screen-sm mx-auto"
    >
      <Card className="w-full mt-4">
        <CardContent className="pt-4">
          <CardDescription>Defina aqui a precificação automática dos produtos para diferentes canais de vendas</CardDescription>
          <PricingForm data={data} />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
