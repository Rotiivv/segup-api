import { desiredServices } from "@/components/feature/registration/constants"
import { z } from "zod"

const desiredServiceValues = desiredServices.map((service) => service.value) as [
  string,
  ...string[],
]

export const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, "Preencha o CPF.")
    .transform((value) => value.replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{11}$/, "Preencha um CPF válido.")),
  fullName: z.string().trim().min(3, "Preencha o nome completo."),
  email: z.string().trim().email("Preencha com um email válido."),
  phone: z
    .string()
    .trim()
    .min(1, "Preencha o telefone.")
    .regex(/^[\d\s()+-]{8,}$/, "Preencha um telefone válido."),
  desiredService: z.enum(desiredServiceValues, {
    message: "Selecione um serviço ou evento.",
  }),
  observation: z.string().trim().max(500, "A observação deve ter no máximo 500 caracteres.").optional(),
})

export type RegistrationSchema = z.infer<typeof formSchema>
