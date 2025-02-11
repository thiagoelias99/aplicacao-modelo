import { ICreateProduct, IProduct, IUpdateProduct } from "@/models/product"
import { prismaClient } from "./prisma-client"
import { IProductRepository } from "../product-repository"
import { Prisma } from "@prisma/client"
import { PrismaIngredientRepository } from "./prisma-ingredient-repository"

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
        recipe: data.recipe,
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

  async updateProduct(data: IUpdateProduct): Promise<IProduct> {
    const [, product] = await prismaClient.$transaction([
      // Delete all ingredients from product
      prismaClient.ingredientOnProduct.deleteMany({
        where: {
          productId: data.id
        }
      }),
      // Update product creating new ingredients
      prismaClient.product.update({
        where: {
          id: data.id
        },
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          preparationTime: data.preparationTime,
          yield: data.yield,
          annotation: data.annotation,
          recipe: data.recipe,
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
    ])

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
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      ingredients: prisma.IngredientOnProduct.map((ingredientOnProduct) => ({
        ingredient: PrismaIngredientRepository.prismaToIngredientSt(ingredientOnProduct.Ingredient),
        quantity: ingredientOnProduct.quantity,
        measureUnit: ingredientOnProduct.measureUnit as EMeasureUnit
      })),
      subProducts: []
    }
  }
}

