import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ASSET_PATHS, SUSPECT_PROFILES } from '../../logic/naiveBayes';
import { GoldParticles, MagnifyingGlassGraphic } from '../EvidenceVisuals';
import { ResilientImage } from '../ResilientImage';
import { SuspectCard } from '../SuspectCard';

interface StageOpeningProps {
  onStartInvestigation: () => void;
}

export function StageOpening({ onStartInvestigation }: StageOpeningProps) {
  return (
    <section
      aria-label="Opening Screen"
      className="relative flex h-full w-full flex-col justify-between overflow-hidden px-6 py-5 lg:px-12 lg:py-7"
    >
      {/* Dramatic Spotlight Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <ResilientImage
          src={ASSET_PATHS.goldenTrophySpotlight}
          alt="Golden trophy under spotlight in dark investigation room"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#101827]/85 via-[#101827]/55 to-[#101827]" />
        {/* Diagonal subtle crime scene tape stripe */}
        <div
          className="absolute -left-20 top-10 w-[130%] -rotate-3 border-y border-[#F5C451]/25 bg-[#F5C451]/10 py-1 text-center font-display text-xs tracking-[0.45em] text-[#F5C451]/45"
        >
          CRIME SCENE · DO NOT CROSS · CASE 001 · CRIME SCENE · DO NOT CROSS · CASE 001
        </div>
      </div>

      <GoldParticles count={20} />

      {/* Center Hero Composition */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-6">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-8">
          {/* Left Title & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <div className="mb-3 flex items-center gap-3 text-sm font-medium tracking-wider text-[#F5C451]">
              <MagnifyingGlassGraphic className="h-8 w-8" />
              <span>A Naive Bayes Investigation</span>
            </div>

            <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl leading-[0.94] tracking-wider text-[#F4F4F5] [text-wrap:balance]">
              WHO STOLE THE <span className="text-[#F5C451]">TROPHY?</span>
            </h1>

            <p className="mt-4 max-w-xl text-lg sm:text-xl text-[#9299A6] leading-relaxed">
              &ldquo;Every clue has a probability. Every suspect has a story.&rdquo;
            </p>

            <div className="mt-6 flex items-center gap-6 text-sm text-[#9299A6]">
              <span>72 MCA Detectives</span>
              <span aria-hidden="true">·</span>
              <span>12 Investigation Teams</span>
              <span aria-hidden="true">·</span>
              <span>10 Historical Cases</span>
            </div>

            <div className="mt-7">
              <motion.button
                type="button"
                onClick={onStartInvestigation}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-lg bg-[#F5C451] px-8 py-4 font-display text-2xl tracking-wider text-[#101827] shadow-[0_12px_32px_rgba(245,196,81,0.28)] hover:bg-[#f7d06b] transition-colors whitespace-nowrap shrink-0"
              >
                <span>START INVESTIGATION</span>
                <ArrowRight className="h-6 w-6" aria-hidden="true" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Spotlight Trophy Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-xl border border-[#F5C451]/35 bg-[#171C28] shadow-2xl"
          >
            <ResilientImage
              src={ASSET_PATHS.goldenTrophySpotlight}
              alt="The missing golden trophy under a dramatic spotlight"
              fallbackTitle="Golden Trophy Evidence"
              className="h-64 lg:h-80 w-full object-cover"
            />
            <div className="flex items-center justify-between border-t border-white/10 bg-[#171C28]/95 px-5 py-3 text-xs text-[#9299A6]">
              <span>Exhibit A · Auditorium Grand Trophy</span>
              <span className="font-math text-[#F5C451]">Missing Since Last Night</span>
            </div>
          </motion.div>
        </div>

        {/* Two Suspect Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="grid w-full grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SuspectCard suspect={SUSPECT_PROFILES.Raju} compact />
          <SuspectCard suspect={SUSPECT_PROFILES.Somu} compact />
        </motion.div>
      </div>
    </section>
  );
}
