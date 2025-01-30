"use client"

import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button, buttonVariants } from "./ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export default function CookiesNotification() {
  const { storedValue, setValue } = useLocalStorage("acceptedCookies", false)
  const [hide, setHide] = useState(true)

  useEffect(() => {
    if (!storedValue) {
      setHide(false)
    } else {
      setHide(true)
    }
  }, [storedValue])

  return (
    <div className={cn("w-full bg-black text-white p-4 fixed bottom-0 left-0 right-0 rounded-t-xl pb-6 transition-all", {
      hidden: !!hide
    })}>
      <div className="w-full flex flex-col lg:flex-row justify-center items-center container mx-auto">
        <p className="w-full text-center">Esta aplicação utiliza cookies para personalizar conteúdo, fornecer funcionalidades de mídia social e analisar nosso tráfego. <br />Ao continuar navegando, você concorda com o uso dos cookies. Para saber mais, acesse nossa Política de Privacidade.</p>
        <div className="w-full flex mt-4 gap-4 lg:hidden">
          <Button
            className="bg-white text-black rounded-md w-full"
            onClick={() => setValue(true)}
          >
            Aceitar
          </Button>
          <Link className={buttonVariants({
            variant: "link",
            className: "w-full"
          })} href="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
        <Button
          className="bg-white text-black rounded-md hidden lg:block"
          onClick={() => setValue(true)}
        >
          Aceitar
        </Button>
        <Link className={buttonVariants({
          variant: "link",
          className: "hidden lg:block"
        })} href="/politica-de-privacidade">Política de Privacidade</Link>
      </div>
    </div>
  )
}
