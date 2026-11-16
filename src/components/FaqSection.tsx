import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/pizzeriaData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[#15803D] mb-2">Dúvidas Frequentes</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
            Perguntas comuns antes de pedir
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            Confira as respostas rápidas sobre pedidos, entregas, retirada e formas de pagamento.
          </p>
        </div>

        <div className="divide-y divide-stone-200 border-y border-stone-200 bg-white rounded-xl overflow-hidden border-x">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className="px-5 sm:px-7">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left font-semibold text-base sm:text-lg text-zinc-900 hover:text-[#E63946] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#E63946]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-5 pr-8 text-sm sm:text-base leading-relaxed text-zinc-600"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
