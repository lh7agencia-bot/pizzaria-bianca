import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/pizzeriaData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-300 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-800">
          <div className="md:col-span-5">
            <a
              href="#inicio"
              className="font-display text-2xl font-bold text-white tracking-tight inline-block"
            >
              {BUSINESS_INFO.name}
            </a>
            <p className="mt-2 text-sm text-zinc-400">{BUSINESS_INFO.slogan}</p>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-sm">
              {BUSINESS_INFO.address}
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-3">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">
                  Cardápio Digital
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-white transition-colors">
                  Galeria de Fotos
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-3">Atendimento</h3>
            <p className="text-sm text-zinc-400">{BUSINESS_INFO.hours}</p>
            <a
              href={buildWhatsAppUrl('Olá, Pizzaria Bianca!')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-[#2ECC71] hover:underline tabular-nums"
            >
              WhatsApp: {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {currentYear} {BUSINESS_INFO.name}. Todos os direitos reservados.
          </p>
          <p>Contagem, Minas Gerais</p>
        </div>
      </div>
    </footer>
  );
}
