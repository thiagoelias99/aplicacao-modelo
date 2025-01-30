"use client"

import { ComponentProps } from "react"
import { Button } from "./ui/button"
import { ChevronLeftIcon } from "lucide-react"
import { H1 } from "./ui/typography"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"


interface Props extends ComponentProps<'div'> {
  title?: string
  enableBackButton?: boolean
}

export default function DefaultPageTemplate({ title, enableBackButton, children, className, ...rest }: Props) {
  const router = useRouter()

  return (
    <div className={cn('pt-4 pb-8 px-4 max-w-screen-2xl mx-auto', className)} {...rest}>
      <div className="w-full flex justify-start items-center sm:gap-2">
        {enableBackButton && (
          <Button
            variant="ghost" size="icon" onClick={() => router.back()}><ChevronLeftIcon />
          </Button>
        )}
        <H1>{title}</H1>
      </div>
      {children}
    </div>
  )
}
