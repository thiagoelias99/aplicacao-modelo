import { Loader2Icon } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Loader2Icon size="64" className='animate-spin text-primary' />
    </div>
  )
}