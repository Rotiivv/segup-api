"use client"

import { Toaster as Sonner } from "sonner"

function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-[#d8eadf] bg-white text-[#111111] shadow-[0_18px_40px_rgba(15,23,42,0.10)]",
          title: "text-[18px] font-medium text-[#111111]",
          description: "text-sm text-[#5e6472]",
          actionButton:
            "rounded-full bg-[#e8f7ed] text-[#15803d] hover:bg-[#d8eadf]",
          cancelButton:
            "rounded-full bg-transparent text-[#5e6472] hover:bg-[#f1f4f9]",
        },
      }}
    />
  )
}

export { Toaster }
