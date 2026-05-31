import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function FormHeader() {
  return (
    <CardHeader>
      <span className="inline-flex w-fit rounded-full border border-[#e2e6ef] bg-white px-3 py-1 text-xs font-medium text-[#b85a00]">
        Consulta
      </span>
      <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Consulte em quais serviços você está registrado
      </CardTitle>
      <CardDescription className="max-w-2xl text-sm leading-6 text-[#5e6472]">
        Informe seu CPF para visualizar os registros já realizados e acompanhar o status de cada participação.
      </CardDescription>
    </CardHeader>
  )
}

export default FormHeader
