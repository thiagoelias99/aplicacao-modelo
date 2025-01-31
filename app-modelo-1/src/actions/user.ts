"use server"

import { prismaClient } from "@/lib/prisma"
import { withRole } from "@/lib/withRole"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function getCurrentUserAction() {
  const { getUser } = getKindeServerSession()
  const id = (await getUser())?.id

  if (!id) {
    return null
  }

  return prismaClient.user.findUnique({
    where: { id },
  })
}

export async function updateCurrentUserAction(data: Prisma.UserUpdateInput) {
  const { getUser } = getKindeServerSession()
  const id = (await getUser())?.id

  if (!id) {
    return null
  }

  const updatedUser = await prismaClient.user.update({
    where: { id },
    data,
  })

  revalidatePath("/app")

  return updatedUser
}

export async function deleteAccountAction() {
  const { getUser } = getKindeServerSession()
  const id = (await getUser())?.id

  if (!id) {
    throw new Error("Not Found")
  }

  await prismaClient.user.delete({
    where: { id },
  })
}

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