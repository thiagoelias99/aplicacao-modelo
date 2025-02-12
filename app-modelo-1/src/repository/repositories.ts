import { IUserRepository } from "./user-repository"
import { PrismaUserRepository } from "./prisma/prisma-user-repository"
import { IIngredientRepository } from "./ingredient-repository"
import { PrismaIngredientRepository } from "./prisma/prisma-ingredient-repository"
import { PrismaProductRepository } from "./prisma/prisma-product-repository"
import { IProductRepository } from "./product-repository"
import { IConstantRepository } from "./constant-repository"
import { PrismaConstantRepository } from "./prisma/prisma-constant-repository"


export const userRepository: IUserRepository = new PrismaUserRepository()
export const ingredientRepository: IIngredientRepository = new PrismaIngredientRepository()
export const productRepository: IProductRepository = new PrismaProductRepository()
export const constantRepository: IConstantRepository = new PrismaConstantRepository()