import { z } from "zod"

export const consultSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, "Preencha o CPF.")
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{11}$/, "Preencha um CPF válido.")),
})

export type ConsultSchema = z.infer<typeof consultSchema>
