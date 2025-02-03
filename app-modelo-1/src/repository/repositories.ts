import { IUserRepository } from "./user-repository"
import { PrismaUserRepository } from "./prisma/prisma-user-repository"

export const userRepository: IUserRepository = new PrismaUserRepository()