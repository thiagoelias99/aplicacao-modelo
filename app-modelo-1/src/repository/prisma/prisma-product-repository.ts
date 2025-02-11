import { ICreateProduct, IProduct } from "@/models/product"
import { prismaClient } from "./prisma-client"
import { IProductRepository } from "../product-repository"
import { Ingredient, Prisma } from "@prisma/client"
import { IIngredient } from "@/models/ingredient"

export class PrismaProductRepository implements IProductRepository {
  async createProduct(data: ICreateProduct, id: string): Promise<IProduct> {
    const product = await prismaClient.product.create({
      data: {
        id: id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        preparationTime: data.preparationTime,
        yield: data.yield,
        annotation: data.annotation,
        profitMargin: data.profitMargin,
        sellingPrice: data.sellingPrice,
        IngredientOnProduct: {
          create: data.ingredients?.map((ingredient) => ({
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
            measureUnit: ingredient.measureUnit,
          }))
        }
      },
      include: {
        IngredientOnProduct: {
          include: {
            Ingredient: true
          }
        }
      }
    })

    return this.prismaToProduct(product)
  }

  async getAllProducts(): Promise<IProduct[]> {
    const products = await prismaClient.product.findMany({
      include: {
        IngredientOnProduct: {
          include: {
            Ingredient: true
          }
        }
      }
    })

    return products.map(this.prismaToProduct)
  }

  async getProductBySlug(slug: string): Promise<IProduct | null> {
    const product = await prismaClient.product.findUnique({
      where: {
        slug: slug
      },
      include: {
        IngredientOnProduct: {
          include: {
            Ingredient: true
          }
        }
      }
    })

    if (!product) {
      return null
    }

    return this.prismaToProduct(product)
  }

  private prismaToProduct(prisma: Prisma.ProductGetPayload<{
    include: {
      IngredientOnProduct: {
        include: {
          Ingredient: true
        }
      }
    }
  }>): IProduct {
    return {
      id: prisma.id,
      name: prisma.name,
      slug: prisma.slug,
      description: prisma.description || undefined,
      preparationTime: prisma.preparationTime,
      yield: prisma.yield,
      annotation: prisma.annotation || undefined,
      recipe: prisma.recipe || undefined,
      profitMargin: prisma.profitMargin,
      sellingPrice: Number(prisma.sellingPrice),
      ingredients: prisma.IngredientOnProduct.map((ingredientOnProduct) => ({
        ...this.prismaToIngredient(ingredientOnProduct.Ingredient),
        quantity: ingredientOnProduct.quantity,
        measureUnit: ingredientOnProduct.measureUnit as EMeasureUnit
      })),
      subProducts: [],
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt
    }
  }

  private prismaToIngredient(prisma: Ingredient): IIngredient {
    return {
      id: prisma.id,
      name: prisma.name,
      slug: prisma.slug,
      description: prisma.description || undefined,
      measureUnit: prisma.measureUnit as EMeasureUnit,
      measureUnitClass: prisma.measureUnitClass as EMeasureUnitClass,
      measureUnitQuantity: prisma.measureUnitQuantity,
      price: Number(prisma.price),
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt
    }
  }
}

