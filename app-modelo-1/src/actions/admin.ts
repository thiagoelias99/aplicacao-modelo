"use server"

import { ERole } from "@/models/user"
import { userRepository } from "@/repository/repositories"

export async function setAdminEmails() {
  const adminsEmails: string[] = process.env.ADMIN_EMAILS?.split("|") || []
  await userRepository.setUserRole(adminsEmails, ERole.ADMIN)
  return
}
