import { motion } from 'motion/react';
import {
  HISTORICAL_CASES,
  computeClassCounts,
  computePriors,
} from '../../logic/naiveBayes';

interface StageNBPriorsProps {
  revealStep: number;
}

export function StageNBPriors({ revealStep }: StageNBPriorsProps) {
  const counts = computeClassCounts(HISTORICAL_CASES);
  const priors = computePriors(HISTORICAL_CASES);

  const rajuPct = Math.round(priors.Raju * 100);
  const somuPct = Math.round(priors.Somu * 100);

  return (
    <section
      aria-label="Prior Probability"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-5 lg:px-10"
    >
      <div className="mb-5 border-b border-white/10 pb-4">
        <p className="text-sm font-medium text-[#F5C451]">
          Naive Bayes Stage 2 · Class Counts &amp; Baseline Odds
        </p>
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
          PRIOR PROBABILITY
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 6 columns: Counts & Formulas */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-4">
          <div className="rounded-xl border border-white/12 bg-[#171C28] p-6">
            <h3 className="font-display text-2xl tracking-wider text-[#F4F4F5]">
              Historical Class Counts
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg border border-[#F5C451]/35 bg-[#101827] p-4">
                <div className="text-xs text-[#9299A6]">Raju Cases</div>
                <div className="mt-1 font-math text-4xl font-bold text-[#F5C451]">
                  {counts.Raju}
                </div>
              </div>
              <div className="rounded-lg border border-white/15 bg-[#101827] p-4">
                <div className="text-xs text-[#9299A6]">Somu Cases</div>
                <div className="mt-1 font-math text-4xl font-bold text-[#F4F4F5]">
                  {counts.Somu}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#101827] p-4">
                <div className="text-xs text-[#9299A6]">Total Cases</div>
                <div className="mt-1 font-math text-4xl font-bold text-[#9299A6]">
                  {counts.total}
                </div>
              </div>
            </div>
          </div>

          {revealStep >= 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="rounded-xl border border-[#F5C451]/40 bg-[#171C28] p-6 space-y-4"
            >
              <h3 className="font-display text-2xl tracking-wider text-[#F5C451]">
                Prior Formulas
              </h3>
              <div className="space-y-3 font-math text-xl sm:text-2xl">
                <div className="flex items-center justify-between rounded-lg bg-[#101827] px-4 py-3 border border-[#F5C451]/30">
                  <span className="text-[#F4F4F5]">P(Raju)</span>
                  <span className="text-[#F5C451] font-bold">
                    {counts.Raju}/{counts.total} = {priors.Raju}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#101827] px-4 py-3 border border-white/12">
                  <span className="text-[#F4F4F5]">P(Somu)</span>
                  <span className="text-[#F4F4F5] font-bold">
                    {counts.Somu}/{counts.total} = {priors.Somu}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#171C28]/50 p-6 text-center text-[#9299A6]">
              Press <span className="mx-1.5 font-semibold text-[#F5C451]">REVEAL</span> to compute
              P(Raju) and P(Somu).
            </div>
          )}
        </div>

        {/* Right 6 columns: Animated 50/50 Probability Chart */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-white/12 bg-[#171C28] p-6">
          <div>
            <h3 className="font-display text-2xl tracking-wider text-[#F4F4F5]">
              Prior Probability Distribution
            </h3>
            <p className="mt-1 text-sm text-[#9299A6]">
              Visual comparison of initial suspicion before inspecting clues
            </p>
          </div>

          {revealStep >= 2 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="my-6 flex flex-col items-center gap-6"
            >
              {/* Animated SVG Split Ring */}
              <div className="relative flex h-44 w-44 items-center justify-center">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#101827"
                    strokeWidth="16"
                  />
                  {/* Somu half */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#9299A6"
                    strokeWidth="16"
                    strokeDasharray={2 * Math.PI * 46}
                    initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* Raju half */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="none"
                    stroke="#F5C451"
                    strokeWidth="16"
                    strokeDasharray={`${Math.PI * 46} ${Math.PI * 46}`}
                    initial={{ strokeDashoffset: Math.PI * 46 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center text-center">
                  <span className="font-math text-2xl font-bold text-[#F4F4F5]">50 / 50</span>
                  <span className="text-xs text-[#9299A6]">Equal Odds</span>
                </div>
              </div>

              {/* Horizontal Split Bar */}
              <div className="w-full space-y-2">
                <div className="flex justify-between font-math text-sm">
                  <span className="text-[#F5C451] font-semibold">RAJU · {rajuPct}%</span>
                  <span className="text-[#9299A6] font-semibold">SOMU · {somuPct}%</span>
                </div>
                <div className="flex h-6 w-full overflow-hidden rounded-lg border border-white/10 bg-[#101827]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rajuPct}%` }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#F5C451]"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${somuPct}%` }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-[#9299A6]"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="my-8 flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#101827]/60 p-6 text-center text-sm text-[#9299A6]">
              {revealStep === 1
                ? 'Press REVEAL again to display the 50/50 probability chart.'
                : 'Chart unlocks after computing the prior probabilities.'}
            </div>
          )}

          <p className="border-t border-white/10 pt-3 text-sm text-[#F4F4F5]">
            &ldquo;Both suspects have an equal prior probability because both appear in five
            historical cases.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
