export const desiredServices = [
  { value: "PYTHONNORTE", label: "PYTHONNORTE" },
  { value: "AWSNORTE", label: "AWSNORTE" },
  { value: "NODENORTE", label: "NODENORTE" },
  { value: "JAVANORTE", label: "JAVANORTE" },
  { value: "RUBINORTE", label: "RUBINORTE" },
] as const

export type ServiceValue = (typeof desiredServices)[number]["value"]
