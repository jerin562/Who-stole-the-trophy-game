import { motion } from 'motion/react';

export function MagnifyingGlassGraphic({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="52"
        cy="52"
        r="34"
        fill="#101827"
        fillOpacity="0.85"
        stroke="#F5C451"
        strokeWidth="4"
      />
      <circle
        cx="52"
        cy="52"
        r="26"
        stroke="#F5C451"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M36 42C41 35 48 32 56 32"
        stroke="#F4F4F5"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="77"
        y1="77"
        x2="106"
        y2="106"
        stroke="#F5C451"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="79"
        y1="79"
        x2="104"
        y2="104"
        stroke="#171C28"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeightEvidenceGraphic({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {/* Measurement scale on left */}
      <line x1="22" y1="18" x2="22" y2="104" stroke="#F5C451" strokeWidth="2.5" />
      <line x1="16" y1="22" x2="32" y2="22" stroke="#F5C451" strokeWidth="2.5" />
      <line x1="18" y1="42" x2="26" y2="42" stroke="#9299A6" strokeWidth="1.5" />
      <line x1="18" y1="62" x2="26" y2="62" stroke="#9299A6" strokeWidth="1.5" />
      <line x1="18" y1="82" x2="26" y2="82" stroke="#9299A6" strokeWidth="1.5" />
      <line x1="16" y1="104" x2="98" y2="104" stroke="#9299A6" strokeOpacity="0.5" strokeWidth="2" />
      {/* Tall silhouette */}
      <circle cx="64" cy="27" r="9" fill="#F5C451" />
      <path
        d="M49 44C49 39.5 52.5 38 64 38C75.5 38 79 39.5 79 44L76 74H71V103H65V75H63V103H57V74H52L49 44Z"
        fill="#F4F4F5"
      />
      {/* Up arrow indicator */}
      <path d="M95 24V58M95 24L88 31M95 24L102 31" stroke="#F5C451" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlackShirtEvidenceGraphic({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <path
        d="M42 24L20 38L28 60L40 54V100H80V54L92 60L100 38L78 24L68 31C64 34 56 34 52 31L42 24Z"
        fill="#101827"
        stroke="#F5C451"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Collar detail */}
      <path d="M44 25L53 38L60 32L67 38L76 25" stroke="#F4F4F5" strokeWidth="2" strokeLinejoin="round" />
      {/* Buttons */}
      <circle cx="60" cy="48" r="2" fill="#F5C451" />
      <circle cx="60" cy="64" r="2" fill="#F5C451" />
      <circle cx="60" cy="80" r="2" fill="#F5C451" />
    </svg>
  );
}

export function NoGlassesEvidenceGraphic({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {/* Glasses */}
      <rect
        x="16"
        y="46"
        width="36"
        height="26"
        rx="6"
        fill="#101827"
        fillOpacity="0.6"
        stroke="#F4F4F5"
        strokeWidth="3"
      />
      <rect
        x="68"
        y="46"
        width="36"
        height="26"
        rx="6"
        fill="#101827"
        fillOpacity="0.6"
        stroke="#F4F4F5"
        strokeWidth="3"
      />
      <path d="M52 57C56 53 64 53 68 57" stroke="#F4F4F5" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="54" x2="10" y2="50" stroke="#F4F4F5" strokeWidth="3" strokeLinecap="round" />
      <line x1="104" y1="54" x2="110" y2="50" stroke="#F4F4F5" strokeWidth="3" strokeLinecap="round" />
      {/* Crimson X mark */}
      <line x1="26" y1="24" x2="94" y2="94" stroke="#D94848" strokeWidth="6" strokeLinecap="round" />
      <line x1="94" y1="24" x2="26" y2="94" stroke="#D94848" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function CaseSolvedStamp({ animate = true }: { animate?: boolean }) {
  return (
    <motion.div
      initial={animate ? { scale: 2.2, opacity: 0, rotate: -18 } : false}
      animate={{ scale: 1, opacity: 1, rotate: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center justify-center select-none"
    >
      <svg viewBox="0 0 260 96" className="w-56 h-20 drop-shadow-[0_10px_24px_rgba(245,196,81,0.35)]">
        <rect
          x="6"
          y="6"
          width="248"
          height="84"
          rx="8"
          fill="#101827"
          fillOpacity="0.92"
          stroke="#F5C451"
          strokeWidth="4"
        />
        <rect
          x="13"
          y="13"
          width="234"
          height="70"
          rx="4"
          fill="none"
          stroke="#F5C451"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text
          x="130"
          y="62"
          textAnchor="middle"
          fill="#F5C451"
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="44"
          letterSpacing="5"
        >
          CASE SOLVED
        </text>
      </svg>
    </motion.div>
  );
}

export function GoldParticles({ count = 18 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, idx) => {
    const left = ((idx * 37 + 13) % 94) + 3;
    const top = ((idx * 53 + 7) % 86) + 5;
    const size = idx % 3 === 0 ? 4 : 2.5;
    const delay = (idx % 6) * 0.8;
    return { id: idx, left, top, size, delay };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="dust-particle absolute rounded-full bg-[#F5C451]"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
