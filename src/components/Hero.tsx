import { ArrowRight, MapPin, Phone, Clock, Flame } from 'lucide-react';
import { BUSINESS_INFO, GALLERY_PHOTOS, buildWhatsAppUrl } from '../data/pizzeriaData';
import { ResilientImage } from './ResilientImage';

export function Hero() {
  const heroPhoto = GALLERY_PHOTOS[1]; // Artisanal pizza shot

  return (
    <section id="inicio" className="pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Hero Split with balanced height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center py-2 lg:py-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-600 mb-4">
              <span>Centro, Contagem · MG</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#15803D] font-semibold">Forno artesanal</span>
            </div>

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-zinc-900 text-balance">
              {BUSINESS_INFO.slogan}
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-600 max-w-xl">
              Na <strong className="font-semibold text-zinc-900">{BUSINESS_INFO.name}</strong>, cada pizza nasce de uma massa de descanso cuidadoso, molho preparado na casa e ingredientes frescos que valorizam o sabor da primeira à última fatia.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#E63946] hover:bg-[#C81E2B] rounded-lg transition-colors duration-150 whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
              >
                <span>Ver Cardápio Digital</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={buildWhatsAppUrl('Olá! Quero fazer um pedido na Pizzaria Bianca.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-zinc-900 bg-white border border-stone-300 hover:border-[#2ECC71] hover:bg-[#2ECC71]/10 rounded-lg transition-colors duration-150 whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
              >
                <span>Pedir pelo WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full lg:min-h-[430px] rounded-xl overflow-hidden border border-stone-200 shadow-sm">
              <ResilientImage
                src={heroPhoto.url}
                alt={heroPhoto.alt}
                className="w-full h-full"
                fallbackLabel={BUSINESS_INFO.name}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <p className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm text-white/95 font-medium">
                {heroPhoto.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Full-width 4-column practical info strip below Hero split */}
        <div className="mt-10 lg:mt-14 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-zinc-500">Endereço</p>
              <p className="text-sm font-medium text-zinc-900 mt-0.5 leading-snug">
                {BUSINESS_INFO.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-zinc-500">Telefone e WhatsApp</p>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-zinc-900 hover:text-[#E63946] transition-colors mt-0.5 inline-block tabular-nums"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#E63946] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-zinc-500">Funcionamento</p>
              <p className="text-sm font-medium text-zinc-900 mt-0.5">
                {BUSINESS_INFO.hours}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-zinc-500">Atendimento</p>
              <p className="text-sm font-medium text-zinc-900 mt-0.5">
                Salão, retirada e delivery em Contagem
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
