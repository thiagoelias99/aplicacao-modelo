import { IUserRepository } from "../user-repository"
import { ERole, IUser } from "@/models/user"
import { User } from "@prisma/client"
import { prismaClient } from "./prisma-client"

export class PrismaUserRepository implements IUserRepository {
  async setUserRole(emails: string[], role: ERole): Promise<void> {
    await prismaClient.user.updateMany({
      where: {
        email: {
          in: emails
        }
      },
      data: {
        role
      }
    })

    return
  }

  async saveUser(data: Partial<IUser>): Promise<IUser> {
    const user = await prismaClient.user.upsert({
      create: {
        id: data.id || '',
        email: data.email || '',
        familyName: data.familyName || '',
        givenName: data.givenName || '',
        role: ERole.USER,
        imageUrl: data.imageUrl || null,
      },
      update: {
        imageUrl: data.imageUrl || null,
      },
      where: {
        email: data.email
      }
    })

    return this.prismaToUser(user)
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await prismaClient.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return null
    }

    return this.prismaToUser(user)
  }

  async deleteUserAccount(data: { email?: string, id?: string }): Promise<void> {
    if (data.email) {
      await prismaClient.user.delete({
        where: {
          email: data.email
        }
      })
    } else if (data.id) {
      await prismaClient.user.delete({
        where: {
          id: data.id
        }
      })
    }

    return
  }

  async getUsers(): Promise<IUser[]> {
    const users = await prismaClient.user.findMany()

    return users.map(this.prismaToUser)
  }

  private prismaToUser(prismaUser: User): IUser {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      familyName: prismaUser.familyName,
      givenName: prismaUser.givenName,
      imageUrl: prismaUser.imageUrl || undefined,
      role: prismaUser.role as ERole,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt
    }
  }
}