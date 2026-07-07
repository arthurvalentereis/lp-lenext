import { useState } from 'react'
import Button from './ui/Button'
import { config, whatsappLink } from '../config'

export default function ContactCTA() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: integrar com CRM/automação (config.formEndpoint).
    // Por enquanto apenas confirma e oferece o atalho de WhatsApp/Calendly.
    setSent(true)
  }

  return (
    <section id="contato" className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: 'radial-gradient(circle, #ff6600 0%, transparent 70%)' }}
      />
      <div className="reveal-group relative mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Pare de vender no escuro.{' '}
            <span className="text-brand-gradient">Comece a decidir com dado.</span>
          </h2>
          <p className="mt-4 text-lg text-mist">
            Fale com um consultor e veja o LETMESEE aplicado ao seu cenário. Resposta em até 1 dia
            útil, sem compromisso.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-mist transition hover:text-fg"
          >
            <svg className="h-5 w-5 text-brand-orange" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.4 2.6 1.6.2.1.4.1.6-.1l.8-1c.2-.2.4-.2.6-.1l1.9.9c.3.2.5.2.5.4.1.1.1.6-.1 1.1z" />
            </svg>
            Prefere conversar agora? Chame no WhatsApp
          </a>
        </div>

        <div className="rounded-2xl border border-line bg-ink-card p-7 elev">
          {sent ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient">
                <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Recebemos seu contato!</h3>
              <p className="mt-2 text-mist">Um consultor falará com você em breve.</p>
              {config.calendlyUrl && (
                <Button href={config.calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-5">
                  Prefere já agendar? Escolha um horário
                </Button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold">Falar com um consultor</h3>
              <Field label="Nome" name="nome" type="text" placeholder="Seu nome" required />
              <Field label="Empresa" name="empresa" type="text" placeholder="Nome da empresa" required />
              <Field label="E-mail corporativo" name="email" type="email" placeholder="voce@empresa.com.br" required />
              <Field label="WhatsApp" name="telefone" type="tel" placeholder="(00) 00000-0000" required />
              <Button as="button" type="submit" className="w-full">
                Quero falar com um consultor
              </Button>
              <p className="text-center text-xs text-mist">
                Ao enviar, você concorda em ser contatado pela Lenext. Seus dados são tratados
                conforme a LGPD.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, placeholder, required }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-mist">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-line bg-ink-soft px-4 py-3 text-fg placeholder:text-mist/60 focus:border-brand-orange/60 focus:bg-ink focus:outline-none focus:ring-1 focus:ring-brand-orange/40"
      />
    </label>
  )
}
