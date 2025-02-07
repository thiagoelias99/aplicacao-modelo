"use client"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"

export default function FabButton({ className, ...rest }: ButtonProps) {
  return (
    <Button
      className={cn("min-w-14 h-12 rounded-2xl fixed bottom-8 right-6 z-30", className)}
      {...rest}
    >
    </Button>
  )
}
