import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Pizzaria Bianca',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-200 to-stone-100 text-stone-600 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded-full bg-[#E63946]/10 flex items-center justify-center mb-3 text-[#E63946]">
          <UtensilsCrossed className="w-6 h-6" aria-hidden="true" />
        </div>
        <span className="font-display font-semibold text-base text-zinc-800">{fallbackLabel}</span>
        <span className="text-xs text-zinc-500 mt-1 max-w-[24ch]">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-stone-200 ${className}`}>
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-stone-200 animate-pulse"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
