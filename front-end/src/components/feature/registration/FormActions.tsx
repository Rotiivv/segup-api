import Link from "next/link"
import { Search, Send } from "lucide-react"

import { Button } from "@/components/ui/button"

interface FormActionsProps {
  isSubmitting?: boolean
  submitLabel?: string
  consultLabel?: string
  consultHref?: string
}

function FormActions({
  isSubmitting,
  submitLabel = "Submeter registro",
  consultLabel = "Consultar registros",
  consultHref = "/registration/consult",
}: FormActionsProps) {
  return (
    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 rounded-xl bg-[#b85a00] px-5 font-medium text-white hover:bg-[#a44d00]"
      >
        <Send className="size-4" />
        {submitLabel}
      </Button>
      <Button asChild variant="outline" className="h-10 rounded-xl border-[#dde2eb] bg-transparent px-5 font-medium text-[#111111] hover:bg-[#f1f4f9]">
        <Link href={consultHref}>
        <Search className="size-4" />
        {consultLabel}
        </Link>
      </Button>
    </div>
  )
}

export default FormActions
