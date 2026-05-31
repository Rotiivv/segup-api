import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function FormHeader() {
  return (
    <CardHeader>
      <span className="inline-flex w-fit rounded-full border border-[#e2e6ef] bg-white px-3 py-1 text-xs font-medium text-[#b85a00]">
        Registro
      </span>
      <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Cadastro em serviços e eventos
      </CardTitle>
      <CardDescription className="max-w-2xl text-sm leading-6 text-[#5e6472]">
        Preencha os seus dados para registrar a participação em um serviço ou evento.
        A interface segue uma linguagem clara, limpa e com foco nos campos.
      </CardDescription>
    </CardHeader>
  )
}

export default FormHeader
