import { motion } from 'motion/react';
import { AlertTriangle, Search } from 'lucide-react';
import { ASSET_PATHS, SUSPECT_PROFILES } from '../../logic/naiveBayes';
import { ResilientImage } from '../ResilientImage';
import { SuspectCard } from '../SuspectCard';

interface StageMysteryIntroProps {
  onRevealClues: () => void;
}

export function StageMysteryIntro({ onRevealClues }: StageMysteryIntroProps) {
  return (
    <section
      aria-label="Mystery Introduction"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-5 lg:px-10"
    >
      {/* Top Case Alert Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4"
      >
        <div>
          <p className="font-math text-sm tracking-widest text-[#F5C451]">
            CASE NO: 001 <span aria-hidden="true">·</span> STATUS:{' '}
            <span className="text-[#D94848] font-semibold">UNSOLVED</span>
          </p>
          <h2 className="mt-1 font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
            THE AUDITORIUM BREAK-IN
          </h2>
        </div>

        <div className="flex items-center gap-2.5 rounded-lg border border-[#D94848]/50 bg-[#D94848]/12 px-4 py-2 text-sm font-medium text-[#F4F4F5]">
          <AlertTriangle className="h-4 w-4 text-[#D94848] shrink-0" aria-hidden="true" />
          <span>Active Investigation Alert</span>
        </div>
      </motion.div>

      {/* Main Split: Crime Scene Visuals + Narrative & Suspects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 columns: Crime scene & CCTV */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-col overflow-hidden rounded-xl border border-white/12 bg-[#171C28]"
          >
            <ResilientImage
              src={ASSET_PATHS.emptyPedestalAuditorium}
              alt="Empty trophy pedestal inside dark school auditorium"
              fallbackTitle="Empty Trophy Pedestal"
              className="h-52 lg:h-60 w-full object-cover"
            />
            <div className="flex flex-col justify-between p-4 flex-1">
              <h3 className="font-display text-xl tracking-wider text-[#F5C451]">
                Empty Trophy Pedestal
              </h3>
              <p className="mt-1 text-sm text-[#9299A6]">
                Main auditorium display found vacant early this morning behind caution tape.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-col overflow-hidden rounded-xl border border-white/12 bg-[#171C28]"
          >
            <div className="relative h-52 lg:h-60 w-full overflow-hidden">
              <ResilientImage
                src={ASSET_PATHS.cctvCorridor}
                alt="Grainy CCTV footage of dark school corridor outside auditorium"
                fallbackTitle="CCTV Corridor Feed"
                className="h-full w-full object-cover"
              />
              <div className="cctv-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-between p-4 flex-1">
              <h3 className="font-display text-xl tracking-wider text-[#F5C451]">
                CCTV Corridor Capture
              </h3>
              <p className="mt-1 text-sm text-[#9299A6]">
                Motion sensor triggered outside the auditorium doors during the night shift.
              </p>
            </div>
          </motion.div>

          {/* Briefing Story Box */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="sm:col-span-2 rounded-xl border border-[#F5C451]/30 bg-[#171C28] p-5"
          >
            <p className="text-base sm:text-lg leading-relaxed text-[#F4F4F5]">
              &ldquo;Yesterday night, the school trophy disappeared from the auditorium. Nobody knows
              who stole it. Two suspects were identified near the building.&rdquo;
            </p>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#F5C451]">
              &ldquo;Your mission is to investigate the available evidence and determine which
              suspect is more likely to be responsible.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Right 5 columns: Suspects & Reveal Clues CTA */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <h3 className="font-display text-2xl tracking-wider text-[#F4F4F5]">
              Identified Suspects Near Building
            </h3>
            <SuspectCard suspect={SUSPECT_PROFILES.Raju} compact />
            <SuspectCard suspect={SUSPECT_PROFILES.Somu} compact />
          </div>

          <button
            type="button"
            onClick={onRevealClues}
            className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#F5C451] px-6 py-4 font-display text-2xl tracking-wider text-[#101827] hover:bg-[#f7d06b] transition-colors whitespace-nowrap shrink-0"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span>REVEAL THE CLUES</span>
          </button>
        </div>
      </div>
    </section>
  );
}
