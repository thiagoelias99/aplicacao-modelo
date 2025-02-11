"use server"

import { checkAuthOrReturnNull } from "@/auth/get-app-auth"
import { ICreateProduct, IProduct, IUpdateProduct } from "@/models/product"
import { revalidatePath } from "next/cache"
import slugify from "slugify"
import { randomUUID } from 'node:crypto'
import { productRepository } from "@/repository/repositories"
import { notFound } from "next/navigation"

export async function createProductAction(data: ICreateProduct) {
  if (!await checkAuthOrReturnNull()) {
    throw new Error("Não autorizado")
  }

  try {
    const id = randomUUID()
    const slug = data.slug || slugify(data.name, { lower: true, strict: true })
    const product = await productRepository.createProduct({ ...data, slug }, id)
    revalidatePath("/app/produtos")
    return product
  }
  catch (err) {
    const error = err as Error
    if (error.message.includes("Unique constraint failed on the fields: (`slug`)")) {
      throw new Error("Já existe um produto com esse nome")
    }
    throw new Error("Erro ao cadastrar produto")
  }
}

export async function getAllProductsAction() {
  if (!await checkAuthOrReturnNull()) {
    throw new Error("Não autorizado")
  }
  try {
    return productRepository.getAllProducts()
  } catch (error) {
    console.log(error)
    throw new Error("Erro ao buscar produtos")
  }
}

export async function getProductBySlugAction(slug: string) {
  if (!await checkAuthOrReturnNull()) {
    throw new Error("Não autorizado")
  }

  try {
    const product = await productRepository.getProductBySlug(slug)
    return product ? product : notFound()
  } catch (error) {
    console.log(error)
    throw new Error("Erro ao buscar produto")
  }
}

export async function updateProductAction(data: IUpdateProduct): Promise<IProduct> {
  if (!await checkAuthOrReturnNull()) {
    throw new Error("Não autorizado")
  }

  try {
    const slug = slugify(data.name, { lower: true, strict: true })
    const product = await productRepository.updateProduct({ ...data, slug })
    revalidatePath("/app/produtos")
    return product
  } catch (err) {
    const error = err as Error
    if (error.message.includes("Unique constraint failed on the fields: (`slug`)")) {
      throw new Error("Já existe um produto com esse nome")
    }
    throw new Error("Erro ao atualizar produto")
  }
}