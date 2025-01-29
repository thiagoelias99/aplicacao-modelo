import { cn } from "@/lib/utils"
import React, { ComponentProps } from 'react'

export default function PrivacyPage() {

  const P = ({ children, className, ...rest }: ComponentProps<"p">) => {
    return <p
      className={cn("leading-relaxed tracking-wider", className)}
      {...rest}
    >{children}</p>
  }

  const B = ({ children, className, ...rest }: ComponentProps<"b">) => {
    return <b
      className={cn("font-semibold text-primary", className)}
      {...rest}
    >{children}</b>
  }

  const H3 = ({ children, className, ...rest }: ComponentProps<"h3">) => {
    return <h3
      className={cn("w-full text-xl font-semibold text-primary uppercase pt-4", className)}
      {...rest}
    >{children}</h3>
  }

  const UL = ({ children, className, ...rest }: ComponentProps<"ul">) => {
    return <ul
      className={cn("list-disc pl-8 space-y-1", className)}
      {...rest}
    >{children}</ul>
  }

  const LI = ({ children, className, ...rest }: ComponentProps<"li">) => {
    return <li
      className={cn("leading-relaxed tracking-wider", className)}
      {...rest}
    >{children}</li>
  }


  return (
    <div className="w-full px-4 py-8 sm:px-10 sm:py-16 flex flex-col items-start justify-start">
      <div className="w-full space-y-3">
        <h1 className="w-full text-3xl font-semibold text-center text-primary">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <h2 className="w-full text-2xl font-medium text-center text-primary uppercase">Política de Privacidade</h2>
      </div>
      <main className="w-full space-y-2 mt-6">
        <p><B>Última atualização: </B>29 de Janeiro de 2025</p>
        <P>Bem-vindo à nossa página de Política de Privacidade. O compromisso com a segurança e a transparência no uso de seus dados pessoais é uma prioridade para nós. Esta política explica como coletamos, usamos e protegemos as informações que você nos fornece.</P>

        <H3>Coleta de Informações</H3>
        <P>Podemos coletar informações de duas formas principais:</P>
        <UL>
          <LI><B>Informações fornecidas por você: </B>Dados inseridos voluntariamente em formulários ou interações com nossa plataforma.</LI>
          <LI><B>Informações automáticas: </B>Dados como endereço IP, tipo de navegador, e comportamento de navegação, coletados por meio de cookies e tecnologias similares.</LI>
        </UL>

        <H3>Uso das Informações</H3>
        <P>As informações coletadas são usadas para:</P>
        <UL>
          <LI>Melhorar a experiência do usuário na plataforma.</LI>
          <LI>Personalizar conteúdo e serviços de acordo com suas preferências.</LI>
          <LI>Realizar análises e pesquisas.</LI>
          <LI>Garantir a segurança e o bom funcionamento da aplicação.</LI>
        </UL>

        <H3>Compartilhamento de Dados</H3>
        <P>Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para cumprir obrigações legais ou prestar serviços essenciais.</P>
        <P>Sempre que o compartilhamento for necessário, asseguraremos que seus dados estejam protegidos.</P>

        <H3>Seus Direitos</H3>
        <P>Você tem o direito de:</P>
        <UL>
          <LI>Solicitar acesso, correção ou exclusão de seus dados pessoais.</LI>
          <LI>Retirar seu consentimento para o uso de seus dados, quando aplicável.</LI>
          <LI>Entrar em contato conosco para qualquer dúvida ou solicitação relacionada à privacidade.</LI>
        </UL>

        <H3>Contato</H3>
        <P>Se tiver dúvidas ou preocupações sobre esta política, entre em contato através de <B>{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</B>.</P>
      </main>
    </div>
  )
}
