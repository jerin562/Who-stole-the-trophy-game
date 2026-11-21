import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import {
  HISTORICAL_CASES,
  TARGET_EVIDENCE,
  computeSmoothedScore,
} from '../../logic/naiveBayes';

interface StageFinalCalculationProps {
  revealStep: number;
}

export function StageFinalCalculation({ revealStep }: StageFinalCalculationProps) {
  const raju = computeSmoothedScore(HISTORICAL_CASES, 'Raju', TARGET_EVIDENCE, 2);
  const somu = computeSmoothedScore(HISTORICAL_CASES, 'Somu', TARGET_EVIDENCE, 2);
  const highlightWinner = revealStep >= 3;

  return (
    <section
      aria-label="Final Naive Bayes Calculation"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-4 lg:px-10"
    >
      <div className="mb-4 border-b border-white/10 pb-3">
        <p className="text-sm font-medium text-[#F5C451]">
          Step-by-Step Multiplication · Posterior Numerators
        </p>
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
          FINAL NAIVE BAYES CALCULATION
        </h2>
      </div>

      <p className="mb-4 text-base sm:text-lg text-[#F4F4F5]">
        Now let us calculate the probability score for both suspects.
      </p>

      {/* Master Score Formula */}
      <div className="mb-5 rounded-xl border border-[#F5C451]/40 bg-[#171C28] px-6 py-4 text-center">
        <div className="font-math text-base sm:text-xl font-bold text-[#F5C451]">
          Score(C) = P(C) × P(Tall|C) × P(Black|C) × P(No glasses|C)
        </div>
      </div>

      {/* Two Calculation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Raju Panel */}
        <div
          className={`rounded-xl border p-6 transition-all duration-300 ${
            highlightWinner
              ? 'border-[#F5C451] bg-[#171C28] shadow-[0_0_40px_rgba(245,196,81,0.2)]'
              : 'border-[#F5C451]/35 bg-[#171C28]'
          }`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2.5">
            <h3 className="font-display text-3xl tracking-wider text-[#F5C451]">
              RAJU CALCULATION
            </h3>
            {highlightWinner && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F5C451]">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>HIGHER SCORE</span>
              </span>
            )}
          </div>

          <div className="space-y-2.5 font-math text-sm sm:text-base">
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(Raju)</span>
              <span className="font-semibold text-[#F4F4F5]">{raju.prior}</span>
            </div>
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(Tall | Raju)</span>
              <span className="font-semibold text-[#F4F4F5]">
                {raju.likelihoods.height.fractionLabel}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(Black | Raju)</span>
              <span className="font-semibold text-[#F4F4F5]">
                {raju.likelihoods.dress.fractionLabel}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(No glasses | Raju)</span>
              <span className="font-semibold text-[#F4F4F5]">
                {raju.likelihoods.glasses.fractionLabel}
              </span>
            </div>
          </div>

          {revealStep >= 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 rounded-xl border border-[#F5C451]/45 bg-[#101827] p-4 font-math"
            >
              <div className="text-xs text-[#9299A6]">
                Score(Raju) = {raju.prior} × {raju.likelihoods.height.fractionLabel} ×{' '}
                {raju.likelihoods.dress.fractionLabel} × {raju.likelihoods.glasses.fractionLabel}
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold text-[#F5C451]">
                  {raju.exactFractionLabel}
                </span>
                <span className="text-2xl font-bold text-[#F5C451]">
                  ≈ {raju.scoreFormatted}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-[#101827]/60 p-4 text-center text-sm text-[#9299A6]">
              Press <span className="font-semibold text-[#F5C451]">REVEAL</span> to compute Score(Raju).
            </div>
          )}
        </div>

        {/* Somu Panel */}
        <div
          className={`rounded-xl border p-6 transition-all duration-300 ${
            highlightWinner
              ? 'border-white/10 bg-[#171C28]/75 opacity-80'
              : 'border-white/15 bg-[#171C28]'
          }`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2.5">
            <h3 className="font-display text-3xl tracking-wider text-[#F4F4F5]">
              SOMU CALCULATION
            </h3>
            <span className="text-xs font-math text-[#9299A6]">Smoothed product</span>
          </div>

          <div className="space-y-2.5 font-math text-sm sm:text-base">
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(Somu)</span>
              <span className="font-semibold text-[#F4F4F5]">{somu.prior}</span>
            </div>
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(Tall | Somu)</span>
              <span className="font-semibold text-[#F4F4F5]">
                {somu.likelihoods.height.fractionLabel}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(Black | Somu)</span>
              <span className="font-semibold text-[#F4F4F5]">
                {somu.likelihoods.dress.fractionLabel}
              </span>
            </div>
            <div className="flex justify-between rounded-lg bg-[#101827] px-4 py-2.5">
              <span className="text-[#9299A6]">P(No glasses | Somu)</span>
              <span className="font-semibold text-[#F4F4F5]">
                {somu.likelihoods.glasses.fractionLabel}
              </span>
            </div>
          </div>

          {revealStep >= 2 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 rounded-xl border border-white/15 bg-[#101827] p-4 font-math"
            >
              <div className="text-xs text-[#9299A6]">
                Score(Somu) = {somu.prior} × {somu.likelihoods.height.fractionLabel} ×{' '}
                {somu.likelihoods.dress.fractionLabel} × {somu.likelihoods.glasses.fractionLabel}
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold text-[#F4F4F5]">
                  {somu.exactFractionLabel}
                </span>
                <span className="text-2xl font-bold text-[#9299A6]">
                  ≈ {somu.scoreFormatted}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-[#101827]/60 p-4 text-center text-sm text-[#9299A6]">
              {revealStep >= 1
                ? 'Press REVEAL again to compute Score(Somu).'
                : 'Waiting for Score(Raju) calculation first.'}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
