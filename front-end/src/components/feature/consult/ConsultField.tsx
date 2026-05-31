import { IdCard } from "lucide-react"
import { type Control } from "react-hook-form"

import type { ConsultSchema } from "@/schema/consult.schema"

import InputField from "../registration/InputField"

interface ConsultFieldProps {
  control: Control<ConsultSchema>
}

function ConsultField({ control }: ConsultFieldProps) {
  return (
    <InputField<ConsultSchema>
      control={control}
      name="cpf"
      id="cpf"
      label="CPF"
      placeholder="000.000.000-00"
      icon={<IdCard className="h-4 w-4" />}
    />
  )
}

export default ConsultField
