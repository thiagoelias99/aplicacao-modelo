"use server"

import { getCurrentUserAction } from "@/actions/user"
import { ERole } from "@/models/user"

export async function withRole(requiredRole: ERole[]): Promise<boolean> {
  const user = await getCurrentUserAction()
  if (user === null) {
    return false
  }
  return requiredRole.includes(user.role)
}
