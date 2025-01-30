"use client"

import { deleteAccountAction } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"

export default function DeleteAccountConfirmation() {
  const [enableButton, setEnableButton] = useState(false)
  const [isCounting, setIsCounting] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  async function deleteAccount() {
    try {
      await deleteAccountAction()
      toast({
        title: "Conta deletada com sucesso",
        description: "Sua conta foi deletada com sucesso. Você será redirecionado para a página inicial."
      })
      router.push("/api/auth/logout")
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro ao deletar conta",
        description: "Ocorreu um erro ao deletar a conta. Por favor, entre em contato com o administrador.",
        variant: "destructive",
      })
    }
  }

  function startCountdown() {
    setIsCounting(true)
    setCountdown(5)

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current!)
          deleteAccount()
          setIsCounting(false)
          return 5
        }
        return prev - 1
      })
    }, 1000)
  }

  function cancelCountdown() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsCounting(false)
    setCountdown(5)
  }

  return (
    <div className="mt-4">
      <div className="flex flex-row justify-start items-center gap-4">
        <Checkbox
          disabled={isCounting}
          onCheckedChange={() => setEnableButton((current) => !current)}
          checked={enableButton}
        />
        <label>Confirmar exclusão</label>
      </div>

      {isCounting ? (
        <div className="mt-4 w-full flex flex-col gap-2">
          <p className="text-destructive text-center font-bold">Deletando em {countdown}...</p>
          <Button onClick={cancelCountdown} variant="outline" className="w-full">
            Cancelar
          </Button>
        </div>
      ) : (
        <Button
          onClick={startCountdown}
          disabled={!enableButton}
          variant="destructive"
          className="mt-4 w-full"
        >
          Deletar conta
        </Button>
      )}
    </div>
  )
}
