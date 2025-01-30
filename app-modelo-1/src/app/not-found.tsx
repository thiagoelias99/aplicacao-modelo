import { buttonVariants } from "@/components/ui/button"
import { SearchXIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-6">
      <Image src="/app-logo.svg" alt="Logo" width={156} height={46} />
      <div className="flex gap-4 justify-center items-center">
        <SearchXIcon className='animate-bounce text-primary size-[46px] sm:size-[64px]' />
        <h1 className="text-2xl font-bold text-primary">404 - Página não encontrada</h1>
      </div>
      <Link
        href="/"
        className={buttonVariants()}
      >Ir para página inicial</Link>
    </div>
  )
}
