"use server"

import { checkAuthOrReturnNull } from "@/auth/get-app-auth"
import { EConstants } from "@/lib/constants"
import { IConstant } from "@/repository/constant-repository"
import { constantRepository } from "@/repository/repositories"
import { revalidatePath } from "next/cache"

export async function saveConstantsAction(data: IConstant[]) {
  if (!await checkAuthOrReturnNull()) {
    throw new Error("Não autorizado")
  }
  await constantRepository.saveConstants(data)
  revalidatePath("/")
}

export async function getConstantsAction(constants: EConstants[]) {
  if (!await checkAuthOrReturnNull()) {
    throw new Error("Não autorizado")
  }
  return constantRepository.getConstants(constants)
}

export async function getPricingConstantsAction() {
  if (!await checkAuthOrReturnNull()) {
    throw new Error("Não autorizado")
  }

  const data: EConstants[] = [
    EConstants.I_FOOD_DELIVERY_TAX,
    EConstants.PICK_UP_TAX,
    EConstants.PRIVATE_DELIVERY_TAX,
  ]

  const response = await constantRepository.getConstants(data)

  return {
    pickUpTax: Number(response.find(c => c.key === EConstants.PICK_UP_TAX)?.value.replace(",", ".")) || 0,
    privateDeliveryTax: Number(response.find(c => c.key === EConstants.PRIVATE_DELIVERY_TAX)?.value.replace(",", ".")) || 0,
    iFoodDeliveryTax: Number(response.find(c => c.key === EConstants.I_FOOD_DELIVERY_TAX)?.value.replace(",", ".")) || 0,
  }
}