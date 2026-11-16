import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/pizzeriaData';

const NAV_LINKS = [
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contato', label: 'Contato' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946] rounded-sm"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#E63946] hover:underline underline-offset-4 decoration-2 transition-colors duration-150 whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={buildWhatsAppUrl('Olá! Gostaria de fazer um pedido na Pizzaria Bianca.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#E63946] hover:bg-[#C81E2B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
          >
            Pedir Agora
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-stone-200 text-zinc-800 hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Menu mobile"
          className="md:hidden border-t border-stone-200 bg-[#FAFAF8] px-4 py-3 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block px-3 py-2.5 text-base font-medium text-zinc-800 hover:text-[#E63946] hover:bg-stone-100 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
