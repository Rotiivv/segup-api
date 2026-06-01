import { tv } from "tailwind-variants";

import * as React from "react";

import ConfirmRegistration from "./ConfirmRegistration";
import CancelRegistration from "./CancelRegistration";
import UpdateDesiredService from "./UpdateDesiredService";

type RegistrationStatus = "CONFIRMED" | "CANCELED";

const registrationCard = tv({
  slots: {
    root: "overflow-hidden rounded-2xl border border-[#dde2eb] bg-white text-[#111111] shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
    content: "grid gap-6 p-6",
    header: "flex items-start justify-between gap-4",
    title: "text-[18px] font-medium tracking-[-0.02em] text-[#111111]",
    meta: "text-sm text-[#5e6472]",
    footer:
      "flex items-end justify-between border-t border-[#edf1f7] px-6 py-4",
    statusPill:
      "inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium tracking-[-0.02em]",
    name: "text-sm text-[#5e6472]",
    protocol: "text-sm text-[#5e6472]",
  },
  variants: {
    status: {
      CONFIRMED: {
        statusPill: "bg-[#e8f7ed] text-[#15803d]",
      },
      CANCELED: {
        statusPill: "bg-[#fce8e8] text-[#b91c1c]",
      },
    },
  },
  defaultVariants: {
    status: "CANCELED",
  },
});

interface RegistrationCardProps {
  status?: RegistrationStatus;
  title: string;
  meta?: string;
  name: string;
  protocol?: string;
  registrationId: string;
  updateError?: string;
  onCancelled?: (registrationId: string) => void;
  onUpdated?: (registrationId: string, desiredService: string) => void;
  onUpdateError?: (registrationId: string, message: string) => void;
  onConfirmed?: (registrationId: string) => void;
}

function RegistrationCard({
  status = "CANCELED",
  title,
  meta,
  name,
  protocol = "protocol",
  registrationId,
  updateError,
  onCancelled,
  onUpdated,
  onUpdateError,
  onConfirmed,
}: RegistrationCardProps) {
  const styles = registrationCard({ status });
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const statusLabel = status === "CONFIRMED" ? "Confirmado" : "Cancelado";
  const actionLabel =
    status === "CANCELED" ? "Confirmar presença" : "Cancelar presença";

  return (
    <>
      <div
        className={`${styles.root()} group relative cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] hover:brightness-[0.97]`}
      >
        <div className={styles.content()}>
          <div className={styles.header()}>
            <div className="grid gap-1">
              <h3 className={styles.title()}>{title}</h3>
              {meta ? <p className={styles.meta()}>{meta}</p> : null}
            </div>
            <span className={styles.protocol()}>{protocol}</span>
          </div>
        </div>
        <div className={styles.footer()}>
          <span className={styles.statusPill()}>{statusLabel}</span>
          <span className={styles.name()}>{name}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 opacity-0 transition-all duration-150 group-hover:bg-black/5 group-hover:opacity-100">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-full bg-[#111111] px-4 py-2 text-sm font-medium text-white shadow-sm transition-transform duration-150 hover:scale-[1.02]"
              onClick={() =>
                status === "CANCELED"
                  ? setConfirmOpen(true)
                  : setCancelOpen(true)
              }
            >
              {actionLabel}
            </button>
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#111111] shadow-sm ring-1 ring-[#dde2eb] transition-transform duration-150 hover:scale-[1.02]"
              onClick={() => {
                onUpdateError?.(registrationId, "");
                setUpdateOpen(true);
              }}
            >
              Mudar tarefa desejada
            </button>
          </div>
        </div>
      </div>
      <CancelRegistration
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        registrationId={registrationId}
        onCancelled={() => onCancelled?.(registrationId)}
      />
      <ConfirmRegistration
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        registrationId={registrationId}
        onConfirmed={() => onConfirmed?.(registrationId)}
      />
      <UpdateDesiredService
        key={`${registrationId}-${updateOpen ? "open" : "closed"}`}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        registrationId={registrationId}
        currentService={title}
        onUpdated={(updatedId, desiredService) =>
          onUpdated?.(updatedId, desiredService)
        }
        onError={(updatedId, message) => onUpdateError?.(updatedId, message)}
      />
      {updateError ? (
        <p className="mt-2 pl-4 text-sm text-[#b91c1c]">{updateError}</p>
      ) : null}
    </>
  );
}

export default RegistrationCard;
