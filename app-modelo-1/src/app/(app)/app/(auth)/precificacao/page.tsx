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
      className="w-full flex flex-col justify-start items-start"
    >
      <Card className="w-full py-6 px-4 pb-8 mt-6 sm:mt-2 sm:py-10 sm:px-6">
        <CardContent className="p-0">
          <CardDescription>Defina aqui a precificação automática dos produtos para diferentes canais de vendas</CardDescription>
          <PricingForm data={data} />
        </CardContent>
      </Card>
    </DefaultPageTemplate>
  )
}
