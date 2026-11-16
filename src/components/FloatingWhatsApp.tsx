import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/pizzeriaData';

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl('Olá, Pizzaria Bianca! Gostaria de fazer um pedido.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Pedir pelo WhatsApp da ${BUSINESS_INFO.name} no número ${BUSINESS_INFO.phoneDisplay}`}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 rounded-full bg-[#2ECC71] hover:bg-[#27B863] text-zinc-950 font-semibold text-sm shadow-lg shadow-black/15 border border-[#24A85D] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
