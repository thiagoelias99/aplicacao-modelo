"use server"

import { prismaClient } from "@/lib/prisma"
import { Role } from "@prisma/client"

export async function setAdminEmails() {
  try {
    const adminsEmails: string[] = process.env.ADMIN_EMAILS?.split("|") || []

    await prismaClient.user.updateMany({
      where: {
        email: {
          in: adminsEmails
        }
      },
      data: {
        role: Role.ADMIN
      }
    })
  } catch (error) {
    console.error("Error setting admin emails", error)
    return
  }
}