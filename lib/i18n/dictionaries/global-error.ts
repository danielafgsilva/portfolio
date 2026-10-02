import type { Locale } from "../config"

// Copy for app/global-error.tsx only. That page replaces the root layout when
// the layout itself crashes, so I18nProvider isn't available — and importing
// the full dictionaries would ship both languages in the client bundle.
export const globalErrorCopy: Record<
  Locale,
  { title: string; eyebrow: string; heading: string; body: string; reload: string; home: string; reference: string }
> = {
  en: {
    title: "Something went wrong — Daniela Silva",
    eyebrow: "lights out",
    heading: "The whole set went dark.",
    body: "Something failed while loading the site. Reload to try again — if it keeps happening, drop me a line at danif.gsilva2000@gmail.com.",
    reload: "Reload page",
    home: "Back to home",
    reference: "Reference",
  },
  pt: {
    title: "Algo correu mal — Daniela Silva",
    eyebrow: "luzes apagadas",
    heading: "O cenário inteiro ficou às escuras.",
    body: "Algo falhou ao carregar o site. Recarrega a página para tentar de novo — se continuar a acontecer, escreve-me para danif.gsilva2000@gmail.com.",
    reload: "Recarregar página",
    home: "Voltar ao início",
    reference: "Referência",
  },
}
