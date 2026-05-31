import { z } from "zod"

export const consultSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, "Preencha o CPF.")
    .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "Preencha um CPF válido."),
})

export type ConsultSchema = z.infer<typeof consultSchema>
