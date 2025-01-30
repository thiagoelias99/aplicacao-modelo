import React from 'react'
import { H2 } from "./ui/typography"

export default function UnauthorizedPage() {
  return (
    <div className="flex justify-center items-center h-full py-10 px-4">
      <H2>Você não tem permissão para acessar essa página</H2>
    </div>
  )
}
