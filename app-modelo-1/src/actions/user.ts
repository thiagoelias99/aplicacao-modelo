"use server"

import { prismaClient } from "@/lib/prisma"
import { withRole } from "@/lib/withRole"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateUserAction(data: Prisma.UserUpdateInput, id: string) {
  const auth = await withRole(["ADMIN", "MANAGER"])

  if (!auth) {
    throw new Error("Unauthorized")
  }

  const updatedUser = await prismaClient.user.update({
    where: { id },
    data,
  })

  revalidatePath("/app/usuarios")
  return updatedUser
}

export async function deleteUserAction(id: string) {
  const auth = await withRole(["ADMIN", "MANAGER"])

  if (!auth) {
    throw new Error("Unauthorized")
  }

  await prismaClient.user.delete({
    where: { id },
  })

  revalidatePath("/app/usuarios")
}