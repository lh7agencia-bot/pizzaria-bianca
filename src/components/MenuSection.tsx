import { useState, useMemo } from 'react';
import { Plus, Minus, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuItem,
  buildWhatsAppUrl,
} from '../data/pizzeriaData';

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | MenuItem['category']>('Todas');
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'Todas') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const addItem = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const clearCart = () => setCart({});

  const cartEntries = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const item = MENU_ITEMS.find((m) => m.id === id);
        return item ? { item, quantity } : null;
      })
      .filter((entry): entry is { item: MenuItem; quantity: number } => entry !== null);
  }, [cart]);

  const totalItems = cartEntries.reduce((acc, entry) => acc + entry.quantity, 0);
  const totalPrice = cartEntries.reduce(
    (acc, entry) => acc + entry.item.price * entry.quantity,
    0
  );

  const whatsappOrderMessage = useMemo(() => {
    if (cartEntries.length === 0) return '';
    const lines = cartEntries.map(
      ({ item, quantity }) =>
        `- ${quantity}x ${item.name} (${formatPrice(item.price * quantity)})`
    );
    return `Olá, Pizzaria Bianca! Gostaria de fazer o seguinte pedido:\n${lines.join(
      '\n'
    )}\n\nTotal estimado: ${formatPrice(totalPrice)}`;
  }, [cartEntries, totalPrice]);

  return (
    <section id="cardapio" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#E63946] mb-2">Cardápio Digital</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
              Sabores preparados na hora
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Escolha suas pizzas e bebidas abaixo. Se quiser, monte seu pedido aqui mesmo e envie direto para o nosso WhatsApp.
            </p>
          </div>

          <p className="text-sm text-zinc-600">
            Pizzas grandes (8 fatias) podem ser pedidas <strong className="font-semibold text-zinc-900">meio a meio</strong>.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 rounded-xl w-fit max-w-full mb-8"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] ${
                  isActive
                    ? 'bg-[#E63946] text-white shadow-sm'
                    : 'text-zinc-700 hover:text-zinc-900 hover:bg-white/70'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const quantity = cart[item.id] || 0;
            return (
              <article
                key={item.id}
                className="flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-stone-200 bg-[#FAFAF8] hover:border-stone-300 transition-colors duration-150"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-1.5">
                        <span>{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.sizeNote}</span>
                        {item.featured && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-[#15803D]">Mais pedida</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-zinc-900">
                        {item.name}
                      </h3>
                    </div>

                    <span className="text-base sm:text-lg font-bold text-zinc-900 tabular-nums whitespace-nowrap shrink-0">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      `Olá, Pizzaria Bianca! Gostaria de pedir: ${item.name} (${formatPrice(item.price)}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-medium text-zinc-600 hover:text-[#E63946] underline underline-offset-4 transition-colors whitespace-nowrap"
                  >
                    Pedir só este item
                  </a>

                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => addItem(item.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-zinc-900 bg-white border border-stone-300 hover:border-[#2ECC71] hover:bg-[#2ECC71]/10 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ECC71]"
                    >
                      <Plus className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
                      <span>Adicionar</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-1 bg-white border border-[#2ECC71] rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover uma unidade de ${item.name}`}
                        className="w-8 h-8 inline-flex items-center justify-center rounded-md text-zinc-700 hover:bg-stone-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <span className="px-2.5 text-sm font-bold text-zinc-900 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => addItem(item.id)}
                        aria-label={`Adicionar mais uma unidade de ${item.name}`}
                        className="w-8 h-8 inline-flex items-center justify-center rounded-md text-zinc-700 hover:bg-stone-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive Order Summary Box when items are added */}
        {totalItems > 0 && (
          <div
            aria-live="polite"
            className="mt-8 p-5 sm:p-6 rounded-xl bg-zinc-900 text-white border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#2ECC71]" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold">
                  Seu pedido ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                </h3>
              </div>
              <p className="text-sm text-zinc-300">
                {cartEntries.map((e) => `${e.quantity}x ${e.item.name}`).join(' · ')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
              <div className="mr-2">
                <span className="block text-xs text-zinc-400">Total estimado</span>
                <span className="text-xl font-bold text-white tabular-nums">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={clearCart}
                aria-label="Limpar itens do pedido"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-lg transition-colors min-h-[44px]"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span>Limpar</span>
              </button>

              <a
                href={buildWhatsAppUrl(whatsappOrderMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-950 bg-[#2ECC71] hover:bg-[#27B863] rounded-lg transition-colors whitespace-nowrap min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Finalizar no WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
