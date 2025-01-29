import React, { PropsWithChildren } from 'react'

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full h-full sm:h-[80%] px-4 sm:px-10 flex justify-center items-center">
      {children}
    </main>
  )
}
