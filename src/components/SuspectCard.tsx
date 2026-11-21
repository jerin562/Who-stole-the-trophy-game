import { SuspectProfile } from '../logic/naiveBayes';
import { ResilientImage } from './ResilientImage';

interface SuspectCardProps {
  suspect: SuspectProfile;
  highlighted?: boolean;
  dimmed?: boolean;
  compact?: boolean;
  footerLabel?: string;
}

export function SuspectCard({
  suspect,
  highlighted = false,
  dimmed = false,
  compact = false,
  footerLabel,
}: SuspectCardProps) {
  const isRaju = suspect.id === 'Raju';

  return (
    <article
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
        highlighted
          ? 'border-[#F5C451] bg-[#171C28] shadow-[0_0_40px_rgba(245,196,81,0.22)]'
          : dimmed
            ? 'border-white/10 bg-[#171C28]/70 opacity-65'
            : 'border-white/12 bg-[#171C28] hover:border-[#F5C451]/50'
      }`}
    >
      <div className={`grid ${compact ? 'grid-cols-[110px_1fr]' : 'grid-cols-[140px_1fr]'} items-stretch`}>
        <div className="relative bg-[#101827] overflow-hidden">
          <ResilientImage
            src={suspect.imagePath}
            alt={`${suspect.name} suspect illustration`}
            fallbackTitle={suspect.name}
            objectPosition="center top"
            className={`w-full ${compact ? 'h-36' : 'h-48'} object-cover`}
          />
          {highlighted && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#F5C451]/20 via-transparent to-transparent"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="flex flex-col justify-between p-5">
          <div>
            <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2.5">
              <h3 className="font-display text-3xl tracking-wider text-[#F4F4F5]">
                {suspect.name}
              </h3>
              <span
                className={`text-xs font-medium tracking-wider ${
                  isRaju ? 'text-[#F5C451]' : 'text-[#9299A6]'
                }`}
              >
                {suspect.descriptor}
              </span>
            </div>

            <dl className="mt-3.5 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#9299A6]">Height</dt>
                <dd className="font-medium text-[#F4F4F5]">{suspect.heightLabel}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-[#9299A6]">Attire</dt>
                <dd className="font-medium text-[#F4F4F5]">{suspect.dressLabel}</dd>
              </div>
            </dl>
          </div>

          {footerLabel && (
            <div className="mt-3 pt-2.5 border-t border-white/10 text-xs text-[#F5C451] font-math">
              {footerLabel}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
