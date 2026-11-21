import { motion, AnimatePresence } from 'motion/react';
import { Eye, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  HeightEvidenceGraphic,
  BlackShirtEvidenceGraphic,
  NoGlassesEvidenceGraphic,
  MagnifyingGlassGraphic,
} from '../EvidenceVisuals';

interface StageClueRevealProps {
  revealStep: number;
  onRevealNextClue: () => void;
  onProceedToDataset: () => void;
}

const CLUES = [
  {
    step: 1,
    number: 'Clue 01',
    title: 'HEIGHT',
    statement: 'The person seen near the auditorium was TALL.',
    highlight: 'TALL',
    Graphic: HeightEvidenceGraphic,
  },
  {
    step: 2,
    number: 'Clue 02',
    title: 'DRESS',
    statement: 'The person was wearing a BLACK SHIRT.',
    highlight: 'BLACK SHIRT',
    Graphic: BlackShirtEvidenceGraphic,
  },
  {
    step: 3,
    number: 'Clue 03',
    title: 'GLASSES',
    statement: 'The person was NOT WEARING GLASSES.',
    highlight: 'NOT WEARING GLASSES',
    Graphic: NoGlassesEvidenceGraphic,
  },
];

export function StageClueReveal({
  revealStep,
  onRevealNextClue,
  onProceedToDataset,
}: StageClueRevealProps) {
  const allRevealed = revealStep >= 3;

  return (
    <section
      aria-label="Clue Reveal Screen"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-5 lg:px-10"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-4">
          <MagnifyingGlassGraphic className="h-12 w-12 shrink-0" />
          <div>
            <p className="text-sm font-medium tracking-wider text-[#F5C451]">
              Evidence Board · Progressive Clue Analysis
            </p>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
              COLLECTED WITNESS &amp; CCTV CLUES
            </h2>
          </div>
        </div>

        <div className="font-math text-sm text-[#9299A6]">
          Clues Revealed: <span className="text-[#F5C451] font-semibold">{revealStep} / 3</span>
        </div>
      </div>

      {/* Three Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CLUES.map((clue) => {
          const isVisible = revealStep >= clue.step;
          const IconGraphic = clue.Graphic;
          return (
            <div
              key={clue.step}
              className={`relative flex min-h-[270px] flex-col justify-between rounded-xl border p-6 transition-all duration-300 ${
                isVisible
                  ? 'border-[#F5C451]/60 bg-[#171C28] shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:border-[#F5C451]'
                  : 'border-white/10 bg-[#171C28]/45'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-math text-sm font-semibold text-[#F5C451]">
                  {clue.number}
                </span>
                <span className="font-display text-2xl tracking-wider text-[#F4F4F5]">
                  {clue.title}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {isVisible ? (
                  <motion.div
                    key={`revealed-${clue.step}`}
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="my-4 flex flex-col items-center text-center"
                  >
                    <div className="mb-4 rounded-xl border border-white/10 bg-[#101827] p-4">
                      <IconGraphic className="h-24 w-24" />
                    </div>
                    <p className="text-lg font-medium leading-snug text-[#F4F4F5]">
                      {clue.statement}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`locked-${clue.step}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="my-6 flex flex-1 flex-col items-center justify-center text-center"
                  >
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/20 text-2xl font-display text-[#9299A6]">
                      ?
                    </div>
                    <p className="text-sm text-[#9299A6]">
                      Sealed evidence · Waiting for teacher reveal
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-white/10 pt-3 text-xs text-[#9299A6] flex items-center justify-between">
                <span>Feature X{clue.step}</span>
                <span className="font-math text-[#F5C451]">
                  {isVisible ? clue.highlight : 'SEALED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Prompt / Action */}
      <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/12 bg-[#171C28] px-6 py-4">
        {allRevealed ? (
          <>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 text-[#F5C451] shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-display text-2xl tracking-wider text-[#F5C451]">
                  THE EVIDENCE IS READY.
                </h3>
                <p className="text-base text-[#F4F4F5]">Can you identify the culprit?</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onProceedToDataset}
              className="inline-flex items-center gap-2 rounded-lg bg-[#F5C451] px-6 py-3 font-display text-xl tracking-wider text-[#101827] hover:bg-[#f7d06b] transition-colors whitespace-nowrap shrink-0"
            >
              <span>STUDY HISTORICAL CASES</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            <p className="text-base text-[#9299A6]">
              Reveal each piece of evidence one at a time so students can record the observations.
            </p>
            <button
              type="button"
              onClick={onRevealNextClue}
              className="inline-flex items-center gap-2 rounded-lg bg-[#F5C451] px-6 py-3 font-display text-xl tracking-wider text-[#101827] hover:bg-[#f7d06b] transition-colors whitespace-nowrap shrink-0"
            >
              <Eye className="h-5 w-5" aria-hidden="true" />
              <span>NEXT CLUE</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
