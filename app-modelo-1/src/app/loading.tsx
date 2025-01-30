import { Loader2Icon } from 'lucide-react'
import Image from "next/image"

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-6">
      <Image src="/app-logo.svg" alt="Logo" width={156} height={46} />
      <Loader2Icon size="64" className='animate-spin text-primary' />
    </div>
  )
}