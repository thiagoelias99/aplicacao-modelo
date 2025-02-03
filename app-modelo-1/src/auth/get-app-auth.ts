"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

interface AuthResponse {
  user?: {
    client: string,
    client_id: string
    client_img?: string
    email: string
    givenName: string
    familyName: string
  }
  authenticated: boolean
}

export async function getAppAuth(): Promise<AuthResponse> {
  if (
    process.env.NODE_ENV === "test" ||
    process.env.OFFLINE_MODE === "true"
  ) {
    return {
      authenticated: true,
      user: {
        client: "offline",
        client_id: "offline",
        email: process.env.OFFLINE_USER_EMAIL as string,
        familyName: "Offline",
        givenName: "User"
      }
    }
  }

  const { getUser } = getKindeServerSession()
  const kindeUser = await getUser()

  if (!kindeUser?.email || !kindeUser?.id) {
    return { authenticated: false }
  }

  return {
    authenticated: true,
    user: {
      client: "kinde auth",
      client_id: kindeUser.id,
      client_img: kindeUser.picture || undefined,
      email: kindeUser.email,
      givenName: kindeUser.given_name || "",
      familyName: kindeUser.family_name || "",
    }
  } as AuthResponse
}