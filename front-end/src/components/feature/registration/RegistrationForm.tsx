"use client"

import * as React from "react"
import { isAxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { api } from "@/lib/axios"
import {
  formSchema,
  type RegistrationSchema,
} from "@/schema/registration.schema"

import FormActions from "./FormActions"
import FormFields from "./FormFields"
import FormHeader from "./FormHeader"

function RegistrationForm() {
  const router = useRouter()
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit: hfHandleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<RegistrationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      fullName: "",
      email: "",
      phone: "",
      desiredService: "",
      observation: "",
    },
  })

  const handleSubmit = hfHandleSubmit(async (data) => {
    setSubmitError(null)

    try {
      const response = await api.post("/api/registration", data)

      const payload = response.data as {
        redirectUrl?: string
        protocol?: string
        desiredService?: string
        status?: string
      }

      toast.custom(
        () => (
          <div className="w-[min(92vw,520px)] rounded-none border border-[#d8eadf] bg-[#f5fbf6] px-5 py-4 text-[#111111] shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
            <div className="flex items-start gap-3">
              <Check className="mt-1 size-5 shrink-0 text-[#15803d]" />
              <div className="grid gap-3">
                <p className="text-[18px] font-medium leading-tight text-[#111111]">
                  Registro Criado com Sucesso
                </p>
                <div className="grid grid-cols-3 gap-8 text-sm text-[#334155]">
                  <span>{payload.protocol ?? "protocolo"}</span>
                  <span>{payload.desiredService ?? "Serviço"}</span>
                  <span>{payload.status ?? "Confirmado/Criado"}</span>
                </div>
              </div>
            </div>
          </div>
        ),
        { duration: 4000 },
      )

      router.push(payload.redirectUrl ?? "/registration/consult")
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message ?? error.response?.data?.error

        setSubmitError(
          error.response?.status === 409
            ? "Já existe um registro no seu CPF com esse serviço. Consulte seus registros."
            : apiMessage ?? "Não foi possível criar o registro.",
        )
        return
      }

      setSubmitError("Não foi possível criar o registro.")
    }
  })

  return (
    <div className="flex justify-center">
      <Card className="w-full border-[#dde2eb] bg-white text-[#111111] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <FormHeader />
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <FormFields control={control} register={register} />
            <FormActions isSubmitting={isSubmitting} />
          </form>
          {submitError ? (
            <p className="mt-4 text-sm text-[#b91c1c]">{submitError}</p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default RegistrationForm
