import { IUserRepository } from "./user-repository"
import { PrismaUserRepository } from "./prisma/prisma-user-repository"
import { IIngredientRepository } from "./ingredient-repository"
import { PrismaIngredientRepository } from "./prisma/prisma-ingredient-repository"

export const userRepository: IUserRepository = new PrismaUserRepository()
export const ingredientRepository: IIngredientRepository = new PrismaIngredientRepository()