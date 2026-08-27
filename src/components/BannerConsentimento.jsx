import { useEffect, useState } from 'react'
import {
  ACEITO,
  RECUSADO,
  aoMudarConsentimento,
  definirConsentimento,
  lerConsentimento,
} from '../lib/consentimento'

/**
 * Banner de consentimento de medição (LGPD).
 *
 * Três coisas que o desenho respeita de propósito:
 *
 *  - **"Recusar" tem o mesmo peso visual que "Aceitar".** Um botão de recusa
 *    escondido ou apagado é o padrão escuro que a ANPD trata como consentimento
 *    inválido — se a recusa é difícil, o aceite não é livre.
 *  - **Nada dispara antes da escolha.** O banner não é um aviso sobre algo que
 *    já está rodando; a medição só liga depois do clique em aceitar.
 *  - **Não bloqueia a página.** É uma faixa no rodapé, não um modal que
 *    sequestra o conteúdo — quem quiser ignorar, navega sem ser medido.
 */
export default function BannerConsentimento() {
  const [escolha, setEscolha] = useState(() => lerConsentimento())

  useEffect(() => aoMudarConsentimento(setEscolha), [])

  if (escolha !== null) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de medição"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line/60 bg-ink/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        {/*
          Texto curto de propósito: banner é barra de rodapé, não página de
          política — o detalhe vive em /privacidade.html (seção 9.1). Evita
          citar IP e outros termos técnicos: no banner eles soam como aviso de
          risco e geram desconfiança, sem informar melhor quem só quer navegar.
        */}
        <p className="text-sm leading-relaxed text-mist">
          Utilizamos ferramentas de análise, como o Google Analytics, para entender como nosso
          site é utilizado e quais conteúdos são mais relevantes. Os dados são tratados de forma
          agregada e estatística. Mais informações na{' '}
          <a href="/privacidade.html" className="underline underline-offset-2 hover:text-fg">
            Política de Privacidade
          </a>
          .
        </p>

        <div className="flex flex-none items-center gap-3">
          <button
            type="button"
            onClick={() => definirConsentimento(RECUSADO)}
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-brand-orange/60"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => definirConsentimento(ACEITO)}
            className="rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
