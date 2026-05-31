"use client"

import * as React from "react"
import { Search, Send } from "lucide-react"
import { tv } from "tailwind-variants"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const desiredServices = [
  { value: "workshop-seguranca", label: "Workshop de Segurança" },
  { value: "feira-tecnologia", label: "Feira de Tecnologia" },
  { value: "treinamento-corporativo", label: "Treinamento Corporativo" },
  { value: "palestra-inovacao", label: "Palestra de Inovação" },
  { value: "mentoria-individual", label: "Mentoria Individual" },
  { value: "networking-profissional", label: "Networking Profissional" },
] as const

const styles = tv({
  slots: {
    shell:
      "min-h-screen bg-[#f6f7fb] text-[#111111] px-4 py-8 sm:px-6 lg:px-10",
    page: "mx-auto flex w-full max-w-3xl flex-col gap-6",
    hero: "flex flex-col gap-2",
    eyebrow:
      "inline-flex w-fit rounded-full border border-[#e2e6ef] bg-white px-3 py-1 text-xs font-medium text-[#b85a00]",
    title: "text-3xl font-semibold tracking-tight sm:text-4xl",
    description: "max-w-2xl text-sm leading-6 text-[#5e6472]",
    layout: "flex justify-center",
    formCard:
      "w-full border-[#dde2eb] bg-white text-[#111111] shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
    fields: "grid gap-4 md:grid-cols-2",
    field: "grid gap-2",
    full: "md:col-span-2",
    label: "text-sm font-medium text-[#111111]",
    input:
      "h-10 rounded-xl border-[#dde2eb] bg-white text-[#111111] placeholder:text-[#8a93a3] focus-visible:ring-[#b85a00]/15",
    textarea:
      "min-h-[120px] rounded-xl border-[#dde2eb] bg-white text-[#111111] placeholder:text-[#8a93a3] focus-visible:ring-[#b85a00]/15",
    actions: "flex flex-col gap-3 pt-2 sm:flex-row",
    submitButton:
      "h-10 rounded-xl bg-[#b85a00] px-5 font-medium text-white hover:bg-[#a44d00]",
    consultButton:
      "h-10 rounded-xl border-[#dde2eb] bg-transparent px-5 font-medium text-[#111111] hover:bg-[#f1f4f9]",
  },
})

export function RegistrationPage() {
  const [selectedService, setSelectedService] = React.useState("")

  const handleSubmit = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }, [])

  const s = styles()

  return (
    <main className={s.shell()}>
      <div className={s.page()}>
        <header className={s.hero()}>
          <span className={s.eyebrow()}>Registro</span>
          <h1 className={s.title()}>Cadastro em serviços e eventos</h1>
          <p className={s.description()}>
            Preencha os seus dados para registrar a participação em um serviço ou evento.
            A interface segue uma linguagem clara, limpa e com foco nos campos.
          </p>
        </header>

        <div className={s.layout()}>
          <Card className={s.formCard()}>
            <CardHeader>
              <CardTitle>Dados do registro</CardTitle>
              <CardDescription className="text-[#5e6472]">
                Use os campos abaixo para concluir seu cadastro.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6" onSubmit={handleSubmit}>
                <div className={s.fields()}>
                  <div className={s.field()}>
                    <Label className={s.label()} htmlFor="cpf">
                      CPF
                    </Label>
                    <Input id="cpf" name="cpf" placeholder="000.000.000-00" className={s.input()} />
                  </div>

                  <div className={s.field()}>
                    <Label className={s.label()} htmlFor="fullName">
                      Nome completo
                    </Label>
                    <Input id="fullName" name="fullName" placeholder="Seu nome completo" className={s.input()} />
                  </div>

                  <div className={s.field()}>
                    <Label className={s.label()} htmlFor="email">
                      E-mail
                    </Label>
                    <Input id="email" name="email" type="email" placeholder="voce@exemplo.com" className={s.input()} />
                  </div>

                  <div className={s.field()}>
                    <Label className={s.label()} htmlFor="phone">
                      Telefone
                    </Label>
                    <Input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999" className={s.input()} />
                  </div>

                  <div className={`${s.field()} ${s.full()}`}>
                    <Label className={s.label()} htmlFor="desiredService">
                      Serviço ou evento desejado
                    </Label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger id="desiredService" className={s.input()}>
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
                  </div>

                  <div className={`${s.field()} ${s.full()}`}>
                    <Label className={s.label()} htmlFor="observation">
                      Observação
                    </Label>
                    <Textarea
                      id="observation"
                      name="observation"
                      placeholder="Informe detalhes adicionais, preferências ou necessidades específicas."
                      className={s.textarea()}
                    />
                  </div>
                </div>

                <div className={s.actions()}>
                  <Button type="submit" className={s.submitButton()}>
                    <Send className="size-4" />
                    Submeter registro
                  </Button>
                  <Button type="button" variant="outline" className={s.consultButton()}>
                    <Search className="size-4" />
                    Consultar registros
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
