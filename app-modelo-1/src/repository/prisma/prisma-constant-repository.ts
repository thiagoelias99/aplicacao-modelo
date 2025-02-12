import { EConstants } from "@/lib/constants"
import { IConstant, IConstantRepository } from "../constant-repository"
import { prismaClient } from "./prisma-client"
import { Constant } from "@prisma/client"

export class PrismaConstantRepository implements IConstantRepository {
  async saveConstant(data: IConstant): Promise<IConstant> {
    const constant = await prismaClient.constant.upsert({
      where: {
        key: data.key
      },
      update: data,
      create: data
    })

    return this.prismaToConstant(constant)
  }

  async saveConstants(data: IConstant[]): Promise<IConstant[]> {
    const constants = await Promise.all(data.map(async (constant) => {
      return await this.saveConstant(constant)
    }))

    return constants.map(this.prismaToConstant)
  }

  async getConstant(constant: EConstants): Promise<IConstant | null> {
    const constantPrisma = await prismaClient.constant.findUnique({
      where: {
        key: constant
      }
    })

    if (!constantPrisma) {
      return null
    }

    return this.prismaToConstant(constantPrisma)
  }

  async getConstants(constant: EConstants[]): Promise<IConstant[]> {
    const constantsPrisma = await prismaClient.constant.findMany({
      where: {
        key: {
          in: constant
        }
      }
    })

    return constantsPrisma.map(this.prismaToConstant)
  }

  private prismaToConstant(prisma: Constant): IConstant {
    return {
      key: prisma.key as EConstants,
      value: prisma.value
    }
  }
}