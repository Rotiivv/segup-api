"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchJson } from "@/lib/api";

interface CancelRegistrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationId: string;
  onCancelled?: (registration: unknown) => void;
}

function CancelRegistration({
  open,
  onOpenChange,
  registrationId,
  onCancelled,
}: CancelRegistrationProps) {
  const [loading, setLoading] = React.useState(false);

  const handleCancel = React.useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetchJson<unknown>(
        `/api/registration/${registrationId}/cancel`,
        {
          method: "PATCH",
        },
      );

      onCancelled?.(data);
      onOpenChange(false);
    } catch {
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }, [onCancelled, onOpenChange, registrationId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar presença</DialogTitle>
          <DialogDescription>
            Você pode cancelar sua presença neste registro. Essa ação pode ser
            revisada depois, se o backend permitir.
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
            className="h-10 rounded-xl bg-[#b91c1c] px-5 text-white hover:bg-[#991b1b]"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Cancelar minha presença
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CancelRegistration;
