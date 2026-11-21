import { motion } from 'motion/react';
import { AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import {
  HISTORICAL_CASES,
  TARGET_EVIDENCE,
  computeUnsmoothedScore,
} from '../../logic/naiveBayes';

interface StageZeroProbabilityProps {
  revealStep: number;
  onRevealSolution: () => void;
}

export function StageZeroProbability({
  revealStep,
  onRevealSolution,
}: StageZeroProbabilityProps) {
  const somuUnsmoothed = computeUnsmoothedScore(HISTORICAL_CASES, 'Somu', TARGET_EVIDENCE);

  return (
    <section
      aria-label="The Zero Probability Problem"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-5 lg:px-10"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-sm font-medium text-[#D94848]">
            Naive Bayes Stage 5 · Critical Mathematical Trap
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
            THE ZERO PROBABILITY PROBLEM
          </h2>
        </div>

        <div className="inline-flex items-center gap-2 rounded-lg border border-[#D94848] bg-[#D94848]/18 px-4 py-2 text-sm font-bold tracking-wider text-[#F4F4F5]">
          <AlertTriangle className="h-5 w-5 text-[#D94848] shrink-0" aria-hidden="true" />
          <span>ZERO PROBABILITY WARNING</span>
        </div>
      </div>

      {/* Main Problem Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#D94848]/60 bg-[#171C28] p-6 shadow-[0_0_40px_rgba(217,72,72,0.14)]">
          <div>
            <h3 className="font-display text-2xl tracking-wider text-[#D94848]">
              Evaluating Somu Without Smoothing
            </h3>

            <div className="mt-4 space-y-3 font-math text-lg">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#101827] px-4 py-3">
                <span className="text-[#9299A6]">Tall appearances for Somu</span>
                <span className="font-bold text-[#D94848]">
                  {somuUnsmoothed.likelihoods.height.count} cases
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[#D94848]/45 bg-[#101827] px-4 py-3">
                <span className="text-[#F4F4F5]">P(Tall | Somu)</span>
                <span className="font-bold text-[#D94848]">
                  {somuUnsmoothed.likelihoods.height.fractionLabel} ={' '}
                  {somuUnsmoothed.likelihoods.height.decimal}
                </span>
              </div>
            </div>

            {revealStep >= 1 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 rounded-xl border border-[#D94848] bg-[#D94848]/15 p-4 text-center"
              >
                <div className="text-xs font-medium tracking-wider text-[#F4F4F5]">
                  MULTIPLYING ALL TERMS TOGETHER
                </div>
                <div className="mt-2 font-math text-base sm:text-xl text-[#F4F4F5]">
                  0.5 × <span className="font-bold text-[#D94848]">0</span> ×{' '}
                  {somuUnsmoothed.likelihoods.dress.fractionLabel} ×{' '}
                  {somuUnsmoothed.likelihoods.glasses.fractionLabel} ={' '}
                  <span className="text-2xl font-bold text-[#D94848]">0</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-[#F4F4F5]">
                  Final probability score = {somuUnsmoothed.score}
                </p>
              </motion.div>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-[#D94848]/40 bg-[#101827]/60 p-5 text-center text-sm text-[#9299A6]">
                Press <span className="font-semibold text-[#F5C451]">REVEAL</span> to see what
                happens to Somu&apos;s entire score.
              </div>
            )}
          </div>

          <p className="mt-4 border-t border-white/10 pt-3 text-base text-[#F4F4F5]">
            &ldquo;Even if the other features have useful evidence, one zero likelihood makes the
            entire Naive Bayes product zero.&rdquo;
          </p>
        </div>

        {/* Right 5 columns: Classroom Discussion & Solution Trigger */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/12 bg-[#171C28] p-6">
          <div>
            <span className="font-math text-xs tracking-widest text-[#F5C451]">
              CLASSROOM DISCUSSION
            </span>
            <h3 className="mt-2 font-display text-3xl tracking-wider text-[#F4F4F5]">
              HOW CAN WE SOLVE THIS PROBLEM?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[#9299A6]">
              Somu did wear a black shirt in 2 historical cases and had no glasses in 3 cases — yet
              because <span className="font-math text-[#F4F4F5]">Tall</span> never appeared for
              Somu in our 10-row sample, multiplication wipes out all other evidence.
            </p>
          </div>

          {revealStep >= 2 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-6 rounded-xl border border-[#F5C451] bg-[#F5C451]/12 p-5"
            >
              <div className="flex items-center gap-2.5 text-[#F5C451]">
                <Lightbulb className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="font-display text-2xl tracking-wider">
                  SOLUTION: LAPLACE SMOOTHING
                </span>
              </div>
              <p className="mt-2 text-sm sm:text-base text-[#F4F4F5]">
                Add <span className="font-math font-bold text-[#F5C451]">+1</span> to every feature
                count (and <span className="font-math font-bold text-[#F5C451]">+K</span> to the
                denominator) so no valid feature ever collapses to zero.
              </p>
            </motion.div>
          ) : (
            <button
              type="button"
              onClick={onRevealSolution}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#F5C451] px-6 py-4 font-display text-2xl tracking-wider text-[#101827] hover:bg-[#f7d06b] transition-colors whitespace-nowrap shrink-0"
            >
              <span>REVEAL THE SOLUTION</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
