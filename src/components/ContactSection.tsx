import { useState, FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/pizzeriaData';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedPayload, setSubmittedPayload] = useState<{
    name: string;
    email: string;
    message: string;
    channel: 'whatsapp' | 'email';
  } | null>(null);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome para continuarmos.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Informe um endereço de e-mail válido.';
    }
    if (!message.trim() || message.trim().length < 5) {
      nextErrors.message = 'Escreva sua mensagem ou dúvida (mínimo 5 caracteres).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const getWhatsAppLink = (n: string, e: string, m: string) =>
    buildWhatsAppUrl(
      `Olá, Pizzaria Bianca!\nNome: ${n}\nE-mail: ${e}\nMensagem: ${m}`
    );

  const getMailtoLink = (n: string, e: string, m: string) => {
    const subject = `Contato pelo site - ${n}`;
    const body = `Nome: ${n}\nE-mail para resposta: ${e}\n\nMensagem:\n${m}\n\nEnviado para: ${BUSINESS_INFO.name} (${BUSINESS_INFO.phoneDisplay})`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const triggerExternalLink = (href: string) => {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    setSubmittedPayload({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      channel,
    });

    const targetHref =
      channel === 'whatsapp'
        ? getWhatsAppLink(cleanName, cleanEmail, cleanMessage)
        : getMailtoLink(cleanName, cleanEmail, cleanMessage);

    triggerExternalLink(targetHref);
  };

  return (
    <section id="contato" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Location & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#E63946] mb-2">Contato e Localização</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
                Visite ou fale com a gente
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                Estamos no Centro de Contagem prontos para atender seu pedido no salão, balcão ou delivery.
              </p>
            </div>

            <div className="space-y-5 pt-2 border-t border-stone-200">
              <div className="flex items-start gap-3.5 pt-3">
                <MapPin className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">Endereço</h3>
                  <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E63946] hover:text-[#C81E2B] mt-2 transition-colors"
                  >
                    <span>Ver no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">Telefone e WhatsApp</h3>
                  <a
                    href={buildWhatsAppUrl('Olá, Pizzaria Bianca!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-zinc-900 hover:text-[#15803D] transition-colors mt-1 inline-block tabular-nums"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Atendimento direto para pedidos e dúvidas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">Horário de atendimento</h3>
                  <p className="text-sm text-zinc-600 mt-1">{BUSINESS_INFO.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl border border-stone-200 bg-[#FAFAF8]">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-zinc-900">
                Envie uma mensagem
              </h3>
              <p className="text-sm text-zinc-600 mt-1.5 mb-6">
                Preencha seus dados e escolha enviar diretamente pelo WhatsApp ou preparar um e-mail.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-zinc-800 mb-1.5"
                    >
                      Nome
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Seu nome completo"
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border ${
                        errors.name ? 'border-[#E63946]' : 'border-stone-300'
                      } text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-[#E63946] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-zinc-800 mb-1.5"
                    >
                      E-mail
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="voce@exemplo.com"
                      aria-invalid={Boolean(errors.email)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border ${
                        errors.email ? 'border-[#E63946]' : 'border-stone-300'
                      } text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946]`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs font-medium text-[#E63946] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold text-zinc-800 mb-1.5"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="Escreva seu pedido, dúvida sobre sabores, reservas ou informações..."
                    aria-invalid={Boolean(errors.message)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border ${
                      errors.message ? 'border-[#E63946]' : 'border-stone-300'
                    } text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-[#E63946] resize-y`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs font-medium text-[#E63946] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Channel Selector */}
                <div>
                  <span className="block text-sm font-semibold text-zinc-800 mb-2">
                    Como prefere enviar?
                  </span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-stone-200/70 rounded-lg max-w-sm">
                    <button
                      type="button"
                      onClick={() => setChannel('whatsapp')}
                      className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap min-h-[40px] ${
                        channel === 'whatsapp'
                          ? 'bg-white text-zinc-900 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setChannel('email')}
                      className={`inline-flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap min-h-[40px] ${
                        channel === 'email'
                          ? 'bg-white text-zinc-900 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-[#E63946]" aria-hidden="true" />
                      <span>E-mail</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-[#E63946] hover:bg-[#C81E2B] rounded-lg transition-colors duration-150 whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                  >
                    {channel === 'whatsapp' ? (
                      <>
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Enviar pelo WhatsApp</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        <span>Preparar E-mail</span>
                      </>
                    )}
                  </button>
                </div>

                {submittedPayload && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="mt-4 p-4 rounded-lg bg-[#2ECC71]/15 border border-[#2ECC71]/40 text-zinc-900"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="text-sm space-y-2">
                        <p className="font-semibold">
                          Mensagem pronta para {submittedPayload.name}!
                        </p>
                        <p className="text-zinc-700">
                          Caso a nova aba não tenha aberto automaticamente, use o link direto abaixo:
                        </p>
                        <div className="flex flex-wrap gap-3 pt-1">
                          <a
                            href={getWhatsAppLink(
                              submittedPayload.name,
                              submittedPayload.email,
                              submittedPayload.message
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#15803D] underline underline-offset-4"
                          >
                            <span>Abrir conversa no WhatsApp</span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                          <a
                            href={getMailtoLink(
                              submittedPayload.name,
                              submittedPayload.email,
                              submittedPayload.message
                            )}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#E63946] underline underline-offset-4"
                          >
                            <span>Abrir aplicativo de e-mail</span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
