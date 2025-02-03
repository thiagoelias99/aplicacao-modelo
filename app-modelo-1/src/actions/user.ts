"use server"

import { withRole } from "@/lib/withRole"
import { ERole, IUser } from "@/models/user"
import { userRepository } from "@/repository/repositories"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { randomUUID } from 'node:crypto'

export async function saveUserAction(data: Partial<IUser>) {
  const id = data.id || randomUUID()

  await userRepository.saveUser({ id, ...data })
}

export async function getCurrentUserAction() {
  const { getUser } = getKindeServerSession()
  const email = (await getUser())?.email

  if (!email) {
    return null
  }

  const user = await userRepository.getUserByEmail(email)

  return user
}

export async function updateCurrentUserAction(data: Partial<IUser>) {
  const { getUser } = getKindeServerSession()
  const email = (await getUser())?.email

  if (!email) {
    return null
  }

  const updatedUser = await userRepository.saveUser({ email, ...data })

  revalidatePath("/app")

  return updatedUser
}

export async function deleteAccountAction() {
  const { getUser } = getKindeServerSession()
  const email = (await getUser())?.email

  if (!email) {
    throw new Error("Not Found")
  }

  await userRepository.deleteUserAccount({ email })

  return
}

export async function getUsersAction() {
  const auth = await withRole([ERole.ADMIN, ERole.MANAGER, ERole.USER])

  if (!auth) {
    throw new Error("Unauthorized")
  }

  const users = await userRepository.getUsers()

  return users
}

export async function updateUserAction(data: Partial<IUser>, id: string) {
  const auth = await withRole([ERole.ADMIN, ERole.MANAGER])

  if (!auth) {
    throw new Error("Unauthorized")
  }

  const updatedUser = await userRepository.saveUser({ id, ...data })

  revalidatePath("/app/usuarios")
  return updatedUser
}

export async function deleteUserAction(id: string) {
  const auth = await withRole([ERole.ADMIN, ERole.MANAGER])

  if (!auth) {
    throw new Error("Unauthorized")
  }

  await userRepository.deleteUserAccount({ id })

  revalidatePath("/app/usuarios")
}