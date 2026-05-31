"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ConfirmRegistrationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  registrationId: string
  onConfirmed?: (registration: unknown) => void
}

function ConfirmRegistration({
  open,
  onOpenChange,
  registrationId,
  onConfirmed,
}: ConfirmRegistrationProps) {
  const [loading, setLoading] = React.useState(false)

  const handleConfirm = React.useCallback(async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/registration/${registrationId}/confirm`, {
        method: "PATCH",
      })

      const data = await response.json()
      if (!response.ok) {
        console.log(data)
        onOpenChange(false)
        return
      }

      console.log(data)
      onConfirmed?.(data)
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }, [onConfirmed, onOpenChange, registrationId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar presença</DialogTitle>
          <DialogDescription>
            Deseja confirmar sua presença neste registro?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-xl border-[#dde2eb] bg-transparent px-5 text-[#111111] hover:bg-[#f1f4f9]"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
          <Button
            type="button"
            className="h-10 rounded-xl bg-[#15803d] px-5 text-white hover:bg-[#166534]"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Confirmar minha presença
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmRegistration
