"use client"

import { buttonVariants } from "@/components/ui/button"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { MailIcon } from "lucide-react"

export default function EmailButton() {
  return (
    <LoginLink
      className={buttonVariants({
        variant: "secondary",
        className: "w-full",
      })}
      authUrlParams={{
        lang: "pt-BR",
        connection_id: process.env.KINDE_EMAIL_CODE_CONNECTION_ID || "",
      }}
    >
      <span>Continuar com </span>
      <MailIcon />
      <span>Email</span>

    </LoginLink>
  )
}