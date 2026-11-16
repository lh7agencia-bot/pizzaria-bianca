import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/pizzeriaData';

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[#E63946] mb-2">Depoimentos</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
            Quem prova, recomenda
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            A opinião de clientes que escolhem a Pizzaria Bianca para reunir a família e os amigos em Contagem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="p-6 sm:p-7 rounded-xl border border-stone-200 bg-[#FAFAF8] flex flex-col justify-between"
            >
              <div>
                <div
                  className="flex items-center gap-1 mb-4"
                  aria-label={`${review.rating} de 5 estrelas`}
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < review.rating
                          ? 'fill-[#E63946] text-[#E63946]'
                          : 'text-stone-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-base leading-relaxed text-zinc-800">
                  “{review.text}”
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{review.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{review.context}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
