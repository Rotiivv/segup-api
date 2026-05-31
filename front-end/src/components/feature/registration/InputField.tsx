import type { ComponentProps, ReactNode } from "react"
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputFieldProps<T extends FieldValues>
  extends ComponentProps<typeof Input> {
  id: string
  label: string
  control: Control<T>
  name: FieldPath<T>
  icon?: ReactNode
}

const InputField = <T extends FieldValues>({
  id,
  label,
  control,
  name,
  icon,
  className,
  ...props
}: InputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="grid gap-2">
          <Label htmlFor={id} className="text-sm font-medium text-[#111111]">
            {label}
          </Label>
          <div className="relative">
            <Input
              {...field}
              {...props}
              id={id}
              aria-invalid={fieldState.invalid}
              className={[
                "h-10 rounded-xl border-[#dde2eb] bg-white text-[#111111] placeholder:text-[#8a93a3] focus-visible:ring-[#b85a00]/15",
                icon ? "pl-10" : "",
                className ?? "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            {icon ? (
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a776f]/70">
                {icon}
              </span>
            ) : null}
          </div>
          {fieldState.invalid ? (
            <p className="pl-2 text-xs text-red-600">
              {fieldState.error?.message}
            </p>
          ) : null}
        </div>
      )}
    />
  )
}

export default InputField
