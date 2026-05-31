import type { Metadata } from "next"

import { ConsultPage } from "@/components/feature/consult/consult-page"

export const metadata: Metadata = {
  title: "Consulta de registros",
  description: "Consulte os serviços e eventos registrados pelo CPF.",
}

export default function Page() {
  return <ConsultPage />
}
