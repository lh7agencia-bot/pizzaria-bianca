import { useState, useEffect, useCallback } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/pizzeriaData';
import { ResilientImage } from './ResilientImage';

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  const activePhoto = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section id="galeria" className="py-16 sm:py-24 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-[#15803D] mb-2">Galeria de Fotos</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
            Conheça a Pizzaria Bianca de perto
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            Registros reais do nosso espaço, do preparo das massas e das pizzas que saem do forno todos os dias. Clique em qualquer foto para ampliar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_PHOTOS.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Ampliar foto: ${photo.alt}`}
              className="group relative aspect-[4/3] sm:aspect-[3/4] rounded-xl overflow-hidden border border-stone-200 bg-stone-100 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
            >
              <ResilientImage
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-200"
                aria-hidden="true"
              />
              <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
                <Expand className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xs sm:text-sm font-medium text-white leading-snug">
                  {photo.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada da foto"
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full flex flex-col items-center"
          >
            <div className="w-full flex items-center justify-between text-white mb-3">
              <span className="text-sm font-medium tabular-nums text-zinc-300">
                Foto {activeIndex + 1} de {GALLERY_PHOTOS.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Fechar visualização ampliada"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-white/10">
              <ResilientImage
                src={activePhoto.url}
                alt={activePhoto.alt}
                className="w-full h-full"
              />

              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-white"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-4 text-sm sm:text-base text-zinc-200 text-center max-w-xl">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
