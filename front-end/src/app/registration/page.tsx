import type { Metadata } from "next"

import { RegistrationPage } from "@/components/registration-page"

export const metadata: Metadata = {
  title: "Cadastro de serviços e eventos",
  description: "Formulário de registro em serviços e eventos.",
}

export default function Page() {
  return <RegistrationPage />
}
