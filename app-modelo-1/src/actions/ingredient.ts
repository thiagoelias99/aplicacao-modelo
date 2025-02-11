"use server"

import { checkAuthOrReturnNull } from "@/auth/get-app-auth"
import { ICreateIngredient, IIngredient } from "@/models/ingredient"
import { ingredientRepository } from "@/repository/repositories"
import { revalidatePath } from "next/cache"
import { randomUUID } from 'node:crypto'
import slugify from 'slugify'

export async function createIngredientAction(data: ICreateIngredient) {
  await checkAuthOrReturnNull()

  const id = randomUUID()
  const slug = data.slug || slugify(data.name, { lower: true, strict: true })

  const ingredient = await ingredientRepository.saveIngredient({ id, slug, ...data })

  revalidatePath("/app/ingredientes")

  return ingredient
}

export async function updateIngredientAction(data: IIngredient) {
  await checkAuthOrReturnNull()

  const slug = slugify(data.name, { lower: true, strict: true })

  const ingredient = await ingredientRepository.saveIngredient({ ...data, slug })

  revalidatePath("/app/ingredientes")

  return ingredient
}

export async function getAllIngredientsAction() {
  await checkAuthOrReturnNull()
  const ingredients = await ingredientRepository.getAllIngredients()

  return ingredients
}

export async function getIngredientBySlugAction(slug: string) {
  await checkAuthOrReturnNull()
  const ingredient = await ingredientRepository.getIngredientBySlug(slug)

  return ingredient
}