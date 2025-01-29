"use client"

import { buttonVariants } from "@/components/ui/button"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import Image from "next/image"

export default function GoogleButton() {
  return (
    <LoginLink
      className={buttonVariants({
        variant: "secondary",
        className: "w-full",
      })}
      authUrlParams={{
        lang: "pt-BR",
        connection_id: process.env.KINDE_GOOGLE_CONNECTION_ID || "",
      }}
    >
      <span>Continuar com </span>
      <Image
        aria-hidden={true}
        src="/google.svg"
        width={24}
        height={24}
        alt="google logo"
      />
      <span>Google</span>

    </LoginLink>
  )
}