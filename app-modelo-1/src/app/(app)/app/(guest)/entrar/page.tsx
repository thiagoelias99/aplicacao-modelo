import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import GoogleButton from "./_components/google-button"
import EmailButton from "./_components/email-button"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-6">
      <Card className="flex flex-col">
        <CardHeader className="gap-2">
          <CardTitle className="text-2xl">Bem vindo à aplicação modelo </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p>Selecione uma opção para acessar</p>
          <GoogleButton />
          <EmailButton />
        </CardContent>

        <CardFooter className="flex-col gap-16 justify-center">
          <p className="text-center text-sm text-muted-foreground">Ao continuar você concorda com nossa <Link href="/cadastro"><b>Política de Privacidade</b></Link></p>
          <div className='w-full mt-2 flex justify-center items-center gap-2 text-muted-foreground'>
            <p>Login gerenciado por</p>
            <a href='https://kinde.com/' target='_blank'>
              <Image
                src='/kinde-logo.jpeg'
                alt='Kinde logo'
                width={56}
                height={56}
              />
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}