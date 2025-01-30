"use server"

import { prismaClient } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateUserAction(data: Prisma.UserUpdateInput, id: string) {
  const updatedUser = await prismaClient.user.update({
    where: { id },
    data,
  })

  revalidatePath("/app/usuarios")
  return updatedUser
}