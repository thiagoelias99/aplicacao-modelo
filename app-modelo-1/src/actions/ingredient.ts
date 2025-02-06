"use server"

import { getAppAuth } from "@/auth/get-app-auth"
import { ICreateIngredient } from "@/models/ingredient"
import { ingredientRepository } from "@/repository/repositories"
import { revalidatePath } from "next/cache"
import { randomUUID } from 'node:crypto'
import slugify from 'slugify'

export async function createIngredientAction(data: ICreateIngredient) {
  const auth = await getAppAuth()
  if (!auth.authenticated || !auth.user) {
    return null
  }

  const id = randomUUID()
  const slug = data.slug || slugify(data.name, { lower: true, strict: true })

  const ingredient = await ingredientRepository.saveIngredient({ id, slug, ...data })

  revalidatePath("/app/ingredients")

  return JSON.stringify(ingredient)
}