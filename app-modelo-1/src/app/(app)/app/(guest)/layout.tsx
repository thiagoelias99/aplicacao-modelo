import React, { PropsWithChildren } from 'react'

export const dynamic = 'force-dynamic'

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full h-[70%] sm:h-[80%] px-4 sm:px-10 flex justify-center items-center">
      {children}
    </main>
  )
}
