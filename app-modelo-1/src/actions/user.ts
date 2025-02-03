"use server"

import { getAppAuth } from "@/auth/get-app-auth"
import { withRole } from "@/lib/withRole"
import { ERole, IUser } from "@/models/user"
import { userRepository } from "@/repository/repositories"
import { revalidatePath } from "next/cache"
import { randomUUID } from 'node:crypto'

export async function saveUserAction(data: Partial<IUser>) {
  const id = data.id || randomUUID()

  await userRepository.saveUser({ id, ...data })
}

export async function getCurrentUserAction() {
  const auth = await getAppAuth()
  if (!auth.authenticated || !auth.user) {
    return null
  }
  const email = auth.user.email
  const user = await userRepository.getUserByEmail(email)

  return user
}

export async function updateCurrentUserAction(data: Partial<IUser>) {
  const auth = await getAppAuth()
  if (!auth.authenticated || !auth.user) {
    return null
  }
  const email = auth.user.email

  const updatedUser = await userRepository.saveUser({ email, ...data })

  revalidatePath("/app")

  return updatedUser
}

export async function deleteAccountAction() {
  const auth = await getAppAuth()
  if (!auth.authenticated || !auth.user) {
    return null
  }
  const email = auth.user.email

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