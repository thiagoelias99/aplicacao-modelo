"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Role } from "@prisma/client"
import { prismaClient } from "./prisma"

export async function withRole(requiredRole: Role[]): Promise<boolean> {
  const { getUser } = await getKindeServerSession()
  const user = await getUser()

  if (user === null) {
    return false
  }

  const userRoles = await prismaClient.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      role: true
    }
  })

  if (userRoles === null) {
    return false
  }

  return requiredRole.includes(userRoles.role)
}
