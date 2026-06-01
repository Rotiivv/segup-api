"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { desiredServices, type ServiceValue } from "./constants";

interface UpdateDesiredServiceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationId: string;
  currentService: string;
  onUpdated?: (registrationId: string, desiredService: string) => void;
  onError?: (registrationId: string, message: string) => void;
}

function UpdateDesiredService({
  open,
  onOpenChange,
  registrationId,
  currentService,
  onUpdated,
  onError,
}: UpdateDesiredServiceProps) {
  const [value, setValue] = React.useState<ServiceValue | "">(
    currentService as ServiceValue,
  );
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = React.useCallback(async () => {
    if (!value) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/registration/${registrationId}/service`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ desiredService: value }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        onError?.(
          registrationId,
          response.status === 409
            ? "Já existe um registro no seu CPF com esse serviço selecionado."
            : (data?.message ?? data?.error ?? "Erro ao atualizar o serviço."),
        );
        onOpenChange(false);
        return;
      }

      console.log(data);
      onUpdated?.(registrationId, value);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }, [onError, onOpenChange, onUpdated, registrationId, value]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mudar tarefa desejada</DialogTitle>
          <DialogDescription>
            Selecione uma nova tarefa para este registro.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <Select
            value={value}
            onValueChange={(next) => setValue(next as ServiceValue)}
          >
            <SelectTrigger className="h-10 rounded-xl border-[#dde2eb] bg-white text-[#111111]">
              <SelectValue placeholder="Selecione uma tarefa" />
            </SelectTrigger>
            <SelectContent>
              {desiredServices.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
              className="h-10 rounded-xl bg-[#b85a00] px-5 text-white hover:bg-[#a44d00]"
              onClick={handleConfirm}
              disabled={loading || !value}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateDesiredService;
