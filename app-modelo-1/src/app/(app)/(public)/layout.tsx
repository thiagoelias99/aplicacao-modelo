import React, { PropsWithChildren } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full">
      <header className="w-full bg-popover">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-10 flex justify-between items-center">
          <Image src="/app-logo.svg" alt="Logo" width={150} height={50} />
          <Link className={buttonVariants({
          })} href="/app/inicio">Acessar</Link>
        </div>
      </header>
      {children}
      <footer className="w-full bg-primary">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-10 flex justify-between items-center">
          <p className="text-sm text-primary-foreground text-center pt-8 sm:text-center w-full">© Todos os Direitos Reservados 2025 – Criado por <b>Thiago Elias</b></p>
        </div>
      </footer>
    </div>
  )
}
