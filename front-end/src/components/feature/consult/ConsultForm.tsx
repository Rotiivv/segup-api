"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Card, CardContent } from "@/components/ui/card"
import { fetchJson, getApiErrorMessage } from "@/lib/api"
import { consultSchema, type ConsultSchema } from "@/schema/consult.schema"
import RegistrationCard from "../registration/RegistrationCard"

import ConsultField from "./ConsultField"
import FormHeader from "./FormHeader"
import FormActions from "../registration/FormActions"

interface ConsultRegistration {
  id: string;
  cpf: string;
  fullName: string;
  email: string;
  phone: string;
  desiredService: string;
  observation?: string;
  protocol: string;
  status: "CONFIRMED" | "CANCELED";
  createdAt?: string;
  updateError?: string
}

function ConsultForm() {
  const [registrations, setRegistrations] = React.useState<
    ConsultRegistration[]
  >([])
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    control,
    handleSubmit: hfHandleSubmit,
    formState: { isSubmitting },
  } = useForm<ConsultSchema>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      cpf: "",
    },
  });

  const handleSubmit = hfHandleSubmit(async (data) => {
    setSubmitError(null)

    try {
      const payload = await fetchJson<ConsultRegistration[]>(
        `/api/registration/${encodeURIComponent(data.cpf)}/all`,
      )

      setRegistrations(payload)
    } catch (error) {
      const apiError = error as { status?: number; data?: unknown }

      setRegistrations([])
      setSubmitError(
        getApiErrorMessage(apiError.data, "Não foi possível consultar os registros."),
      )
    }
  })

  return (
    <div className="flex justify-center">
      <div className="grid w-full gap-6">
        <Card className="w-full border-[#dde2eb] bg-white text-[#111111] shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <FormHeader />
          <CardContent>
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <ConsultField control={control} />
              <FormActions
                isSubmitting={isSubmitting}
                submitLabel="Consultar registros"
                consultLabel="Voltar para cadastro"
                consultHref="/registration"
              />
            </form>
            {submitError ? (
              <p className="mt-4 text-sm text-[#b91c1c]">{submitError}</p>
            ) : null}
          </CardContent>
        </Card>

        {registrations.length > 0 ? (
          <div className="grid gap-4">
            {registrations.map((registration) => (
              <RegistrationCard
                key={registration.id}
                status={registration.status}
                title={registration.desiredService}
                meta={`${registration.email} / ${registration.phone}`}
                name={registration.fullName}
                protocol={registration.protocol}
                registrationId={registration.id}
                onCancelled={(registrationId) => {
                  setRegistrations((current) =>
                    current.map((item) =>
                      item.id === registrationId
                        ? { ...item, status: "CANCELED" }
                        : item,
                    ),
                  );
                }}
                onConfirmed={(registrationId) => {
                  setRegistrations((current) =>
                    current.map((item) =>
                      item.id === registrationId
                        ? { ...item, status: "CONFIRMED" }
                        : item,
                    ),
                  );
                }}
                onUpdated={(registrationId, desiredService) => {
                  setRegistrations((current) =>
                    current.map((item) =>
                      item.id === registrationId
                        ? {
                            ...item,
                            desiredService,
                            updateError: undefined,
                          }
                        : item,
                    ),
                  );
                }}
                onUpdateError={(registrationId, message) => {
                  setRegistrations((current) =>
                    current.map((item) =>
                      item.id === registrationId
                        ? { ...item, updateError: message }
                        : item,
                    ),
                  );
                }}
                updateError={registration.updateError}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ConsultForm
