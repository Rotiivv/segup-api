import { IdCard, Mail, Phone, User } from "lucide-react"
import { Controller, type Control, type UseFormRegister } from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import type { RegistrationSchema } from "@/schema/registration.schema"

import InputField from "./InputField"
import { desiredServices } from "./constants"

interface FormFieldsProps {
  control: Control<RegistrationSchema>
  register: UseFormRegister<RegistrationSchema>
}

function FormFields({ control, register }: FormFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <InputField<RegistrationSchema>
        control={control}
        name="cpf"
        id="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        icon={<IdCard className="h-4 w-4" />}
      />

      <InputField<RegistrationSchema>
        control={control}
        name="fullName"
        id="fullName"
        label="Nome completo"
        placeholder="Seu nome completo"
        icon={<User className="h-4 w-4" />}
      />

      <InputField<RegistrationSchema>
        control={control}
        name="email"
        id="email"
        label="E-mail"
        type="email"
        placeholder="voce@exemplo.com"
        icon={<Mail className="h-4 w-4" />}
      />

      <InputField<RegistrationSchema>
        control={control}
        name="phone"
        id="phone"
        label="Telefone"
        type="tel"
        placeholder="(11) 99999-9999"
        icon={<Phone className="h-4 w-4" />}
      />

      <div className="grid gap-2 md:col-span-2">
        <label
          className="text-sm font-medium text-[#111111]"
          htmlFor="desiredService"
        >
          Serviço ou evento desejado
        </label>
        <Controller
          control={control}
          name="desiredService"
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="desiredService"
                  aria-invalid={fieldState.invalid}
                  className="h-10 rounded-xl border-[#dde2eb] bg-white text-[#111111] placeholder:text-[#8a93a3] focus-visible:ring-[#b85a00]/15"
                >
                  <SelectValue placeholder="Selecione um serviço ou evento" />
                </SelectTrigger>
                <SelectContent>
                  {desiredServices.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid ? (
                <p className="pl-2 text-xs text-red-600">
                  {fieldState.error?.message}
                </p>
              ) : null}
            </div>
          )}
        />
      </div>

      <div className="grid gap-2 md:col-span-2">
        <label
          className="text-sm font-medium text-[#111111]"
          htmlFor="observation"
        >
          Observação
        </label>
        <Textarea
          id="observation"
          placeholder="Informe detalhes adicionais, preferências ou necessidades específicas."
          className="min-h-30 rounded-xl border-[#dde2eb] bg-white text-[#111111] placeholder:text-[#8a93a3] focus-visible:ring-[#b85a00]/15"
          {...register("observation")}
        />
      </div>
    </div>
  )
}

export default FormFields
