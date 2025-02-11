"use server"

import { checkAuthOrReturnNull } from "@/auth/get-app-auth"
import { ICreateProduct } from "@/models/product"
import { revalidatePath } from "next/cache"
import slugify from "slugify"
import { randomUUID } from 'node:crypto'
import { productRepository } from "@/repository/repositories"

export async function createProductAction(data: ICreateProduct) {
  await checkAuthOrReturnNull()

  const id = randomUUID()
  const slug = data.slug || slugify(data.name, { lower: true, strict: true })
  const product = await productRepository.createProduct({ ...data, slug }, id)

  revalidatePath("/app/produtos")

  return product
}