import { motion } from 'motion/react';
import {
  HISTORICAL_CASES,
  TARGET_EVIDENCE,
  computeClassCounts,
  computeLaplaceLikelihood,
} from '../../logic/naiveBayes';

interface StageLaplaceSmoothingProps {
  revealStep: number;
}

export function StageLaplaceSmoothing({ revealStep }: StageLaplaceSmoothingProps) {
  const counts = computeClassCounts(HISTORICAL_CASES);
  const k = 2;
  const rajuLikelihoods = [
    {
      label: 'Height',
      formula: 'P(Tall|Raju)',
      data: computeLaplaceLikelihood(HISTORICAL_CASES, 'Raju', 'height', TARGET_EVIDENCE.height, k),
    },
    {
      label: 'Dress',
      formula: 'P(Black|Raju)',
      data: computeLaplaceLikelihood(HISTORICAL_CASES, 'Raju', 'dress', TARGET_EVIDENCE.dress, k),
    },
    {
      label: 'Glasses',
      formula: 'P(No|Raju)',
      data: computeLaplaceLikelihood(HISTORICAL_CASES, 'Raju', 'glasses', TARGET_EVIDENCE.glasses, k),
    },
  ];

  const somuLikelihoods = [
    {
      label: 'Height',
      formula: 'P(Tall|Somu)',
      data: computeLaplaceLikelihood(HISTORICAL_CASES, 'Somu', 'height', TARGET_EVIDENCE.height, k),
    },
    {
      label: 'Dress',
      formula: 'P(Black|Somu)',
      data: computeLaplaceLikelihood(HISTORICAL_CASES, 'Somu', 'dress', TARGET_EVIDENCE.dress, k),
    },
    {
      label: 'Glasses',
      formula: 'P(No|Somu)',
      data: computeLaplaceLikelihood(HISTORICAL_CASES, 'Somu', 'glasses', TARGET_EVIDENCE.glasses, k),
    },
  ];

  return (
    <section
      aria-label="Laplace Smoothing"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-4 lg:px-10"
    >
      <div className="mb-4 border-b border-white/10 pb-3">
        <p className="text-sm font-medium text-[#F5C451]">
          Naive Bayes Stage 6 · Add-One Smoothing
        </p>
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
          LAPLACE SMOOTHING — ADD ONE TO AVOID ZERO
        </h2>
      </div>

      {/* Top Formula & Parameters Row */}
      <div className="mb-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center rounded-xl border border-[#F5C451]/45 bg-[#171C28] p-5">
          <span className="text-xs font-medium tracking-widest text-[#9299A6]">
            LAPLACE FORMULA
          </span>
          <div className="mt-1.5 font-math text-lg sm:text-xl xl:text-2xl font-bold text-[#F5C451] whitespace-nowrap">
            P(x|C) = (Count(x,C) + 1) / (N(C) + K)
          </div>
          <div className="mt-3 space-y-1 text-xs sm:text-sm text-[#9299A6]">
            <p>
              <strong className="font-math text-[#F4F4F5]">Count(x,C)</strong>: Occurrences of
              feature in class C
            </p>
            <p>
              <strong className="font-math text-[#F4F4F5]">N(C)</strong>: Total cases in class C
              <span className="mx-2" aria-hidden="true">·</span>
              <strong className="font-math text-[#F4F4F5]">K</strong>: Possible values for that
              feature
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-3 gap-3">
          <div className="flex flex-col justify-center rounded-xl border border-white/12 bg-[#171C28] p-4 text-center">
            <span className="text-xs text-[#9299A6]">K (2 values/feature)</span>
            <span className="mt-1 font-math text-3xl font-bold text-[#F5C451]">{k}</span>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-white/12 bg-[#171C28] p-4 text-center">
            <span className="text-xs text-[#9299A6]">N(Raju) &amp; N(Somu)</span>
            <span className="mt-1 font-math text-3xl font-bold text-[#F4F4F5]">
              {counts.Raju} &amp; {counts.Somu}
            </span>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-[#F5C451]/40 bg-[#171C28] p-4 text-center">
            <span className="text-xs text-[#9299A6]">Denominator (5 + 2)</span>
            <span className="mt-1 font-math text-3xl font-bold text-[#F5C451]">
              {counts.Raju + k}
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Suspect Calculations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Raju Card */}
        <div className="rounded-xl border border-[#F5C451]/45 bg-[#171C28] p-5">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
            <h3 className="font-display text-3xl tracking-wider text-[#F5C451]">
              CALCULATE RAJU
            </h3>
            <span className="font-math text-xs text-[#9299A6]">N(Raju) = 5 · K = 2</span>
          </div>

          <div className="space-y-3">
            {rajuLikelihoods.map((item, idx) => {
              const stepNeeded = idx + 1;
              const visible = revealStep >= stepNeeded;
              return (
                <div
                  key={item.formula}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-[#101827] px-4 py-3"
                >
                  <div>
                    <div className="text-xs text-[#9299A6]">{item.label}</div>
                    <div className="font-math text-base font-semibold text-[#F4F4F5]">
                      {item.formula}
                    </div>
                  </div>
                  {visible ? (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28 }}
                      className="font-math text-base sm:text-lg"
                    >
                      <span className="text-[#9299A6]">
                        ({item.data.count}
                        <span className="text-[#F5C451] font-bold">+1</span>)/({item.data.classTotal}
                        +{item.data.k}) ={' '}
                      </span>
                      <span className="font-bold text-[#F5C451] text-xl">
                        {item.data.fractionLabel}
                      </span>
                    </motion.div>
                  ) : (
                    <span className="font-math text-sm text-[#9299A6]/60">Pending reveal…</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Somu Card */}
        <div className="rounded-xl border border-white/15 bg-[#171C28] p-5">
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
            <h3 className="font-display text-3xl tracking-wider text-[#F4F4F5]">
              CALCULATE SOMU
            </h3>
            <span className="font-math text-xs text-[#9299A6]">N(Somu) = 5 · K = 2</span>
          </div>

          <div className="space-y-3">
            {somuLikelihoods.map((item, idx) => {
              const stepNeeded = idx + 1;
              const visible = revealStep >= stepNeeded;
              const wasZero = item.data.count === 0;
              return (
                <div
                  key={item.formula}
                  className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
                    visible && wasZero
                      ? 'border-[#F5C451]/60 bg-[#F5C451]/8'
                      : 'border-white/10 bg-[#101827]'
                  }`}
                >
                  <div>
                    <div className="text-xs text-[#9299A6]">
                      {item.label}
                      {wasZero && visible && (
                        <span className="ml-2 text-[#F5C451]">· Zero Fixed!</span>
                      )}
                    </div>
                    <div className="font-math text-base font-semibold text-[#F4F4F5]">
                      {item.formula}
                    </div>
                  </div>
                  {visible ? (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28 }}
                      className="font-math text-base sm:text-lg"
                    >
                      <span className="text-[#9299A6]">
                        ({item.data.count}
                        <span className="text-[#F5C451] font-bold">+1</span>)/({item.data.classTotal}
                        +{item.data.k}) ={' '}
                      </span>
                      <span className="font-bold text-[#F4F4F5] text-xl">
                        {item.data.fractionLabel}
                      </span>
                    </motion.div>
                  ) : (
                    <span className="font-math text-sm text-[#9299A6]/60">Pending reveal…</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
