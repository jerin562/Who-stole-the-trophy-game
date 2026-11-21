import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  objectPosition?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  objectPosition = 'center center',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#171C28] text-[#9299A6] border border-white/10 ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-8 h-8 mb-2 text-[#F5C451]/60" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-[#9299A6] px-3 text-center">
          {fallbackTitle ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={{ objectPosition }}
      className={className}
    />
  );
}
