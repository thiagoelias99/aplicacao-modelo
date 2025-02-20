import { EMeasureUnit, EMeasureUnitClass, IIngredient } from "@/models/ingredient"
import { IIngredientRepository } from "../ingredient-repository"
import { prismaClient } from "./prisma-client"
import { Ingredient } from "@prisma/client"

export class PrismaIngredientRepository implements IIngredientRepository {
  async saveIngredient(data: Partial<IIngredient>): Promise<IIngredient> {
    const ingredient = await prismaClient.ingredient.upsert({
      where: {
        id: data.id
      },
      update: data,
      create: {
        id: data.id || "",
        name: data.name || "",
        slug: data.slug || "",
        description: data.description || "",
        measureUnit: data.measureUnit || "",
        measureUnitClass: data.measureUnitClass || "",
        measureUnitQuantity: data.measureUnitQuantity || 0,
        price: data.price || 0,
      }
    })

    return this.prismaToIngredient(ingredient)
  }

  async getAllIngredients(): Promise<IIngredient[]> {
    const ingredients = await prismaClient.ingredient.findMany(
      {
        orderBy: {
          name: "asc"
        }
      }
    )

    return ingredients.map(this.prismaToIngredient)
  }

  async getIngredientBySlug(slug: string): Promise<IIngredient | null> {
    const ingredient = await prismaClient.ingredient.findUnique({
      where: {
        slug
      }
    })

    return ingredient ? this.prismaToIngredient(ingredient) : null
  }

  private prismaToIngredient(prismaUser: Ingredient): IIngredient {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      slug: prismaUser.slug,
      description: prismaUser.description || undefined,
      measureUnit: prismaUser.measureUnit as EMeasureUnit,
      measureUnitClass: prismaUser.measureUnitClass as EMeasureUnitClass,
      measureUnitQuantity: prismaUser.measureUnitQuantity,
      price: Number(prismaUser.price),
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt
    }
  }

  static prismaToIngredientSt(prismaUser: Ingredient): IIngredient {
    return {
      id: prismaUser.id,
      name: prismaUser.name,
      slug: prismaUser.slug,
      description: prismaUser.description || undefined,
      measureUnit: prismaUser.measureUnit as EMeasureUnit,
      measureUnitClass: prismaUser.measureUnitClass as EMeasureUnitClass,
      measureUnitQuantity: prismaUser.measureUnitQuantity,
      price: Number(prismaUser.price),
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt
    }
  }
}