import { motion } from 'motion/react';
import { ShieldAlert, Trophy } from 'lucide-react';
import {
  ASSET_PATHS,
  HISTORICAL_CASES,
  SUSPECT_PROFILES,
  TARGET_EVIDENCE,
  computeNormalizedPosteriors,
} from '../../logic/naiveBayes';
import { CaseSolvedStamp, GoldParticles } from '../EvidenceVisuals';
import { ResilientImage } from '../ResilientImage';

interface StageFinalPredictionProps {
  revealStep: number;
}

export function StageFinalPrediction({ revealStep }: StageFinalPredictionProps) {
  const posteriors = computeNormalizedPosteriors(HISTORICAL_CASES, TARGET_EVIDENCE, 2);
  const showPercentages = revealStep >= 1;
  const showSolvedVerdict = revealStep >= 2;

  return (
    <section
      aria-label="Final Prediction"
      className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center overflow-hidden px-6 py-4 lg:px-10"
    >
      {showSolvedVerdict && <GoldParticles count={24} />}

      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div>
          <p className="text-sm font-medium text-[#F5C451]">
            Normalized Posterior Probability Reveal
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
            THE MODEL HAS ANALYSED ALL THE EVIDENCE.
          </h2>
        </div>

        {showSolvedVerdict && <CaseSolvedStamp />}
      </div>

      {/* Main Split: Suspect Comparison + Trophy Reveal */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 8 columns: Normalized Formulas, Horizontal Probability Bars, Suspect Cards */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-4">
          {/* Normalization Formula Box */}
          <div className="rounded-xl border border-white/12 bg-[#171C28] px-5 py-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3 font-math text-xs sm:text-sm text-[#9299A6]">
              <span>P(Raju|X) = Score(Raju) / [Score(Raju) + Score(Somu)]</span>
              <span>P(Somu|X) = Score(Somu) / [Score(Raju) + Score(Somu)]</span>
            </div>
          </div>

          {/* Two Suspect Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Raju Card */}
            <div
              className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-500 ${
                showSolvedVerdict
                  ? 'border-[#F5C451] bg-[#171C28] shadow-[0_0_45px_rgba(245,196,81,0.28)]'
                  : 'border-white/15 bg-[#171C28]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-20 overflow-hidden rounded-lg border border-[#F5C451]/40 bg-[#101827] shrink-0">
                  <ResilientImage
                    src={SUSPECT_PROFILES.Raju.imagePath}
                    alt="Raju portrait"
                    objectPosition="center top"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-[#9299A6]">Suspect 01</span>
                  <h3 className="font-display text-3xl tracking-wider text-[#F4F4F5]">
                    RAJU
                  </h3>
                  <div className="mt-1 font-math text-3xl font-bold text-[#F5C451]">
                    {showPercentages ? posteriors.Raju.percentageText : '—.—%'}
                  </div>
                </div>
              </div>
            </div>

            {/* Somu Card */}
            <div
              className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-500 ${
                showSolvedVerdict
                  ? 'border-white/10 bg-[#171C28]/70 opacity-70'
                  : 'border-white/15 bg-[#171C28]'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-20 overflow-hidden rounded-lg border border-white/15 bg-[#101827] shrink-0">
                  <ResilientImage
                    src={SUSPECT_PROFILES.Somu.imagePath}
                    alt="Somu portrait"
                    objectPosition="center top"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs text-[#9299A6]">Suspect 02</span>
                  <h3 className="font-display text-3xl tracking-wider text-[#F4F4F5]">
                    SOMU
                  </h3>
                  <div className="mt-1 font-math text-3xl font-bold text-[#9299A6]">
                    {showPercentages ? posteriors.Somu.percentageText : '—.—%'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Horizontal Probability Comparison Chart */}
          <div className="rounded-xl border border-white/12 bg-[#171C28] p-5">
            <h4 className="mb-3 font-display text-xl tracking-wider text-[#F4F4F5]">
              Normalized Posterior Comparison
            </h4>
            {showPercentages ? (
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between font-math text-sm">
                    <span className="font-semibold text-[#F5C451]">RAJU</span>
                    <span className="font-bold text-[#F5C451]">
                      {posteriors.Raju.percentageText}
                    </span>
                  </div>
                  <div className="h-6 w-full overflow-hidden rounded-lg bg-[#101827] border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${posteriors.Raju.percentage}%` }}
                      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-[#F5C451]"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between font-math text-sm">
                    <span className="font-semibold text-[#9299A6]">SOMU</span>
                    <span className="font-bold text-[#9299A6]">
                      {posteriors.Somu.percentageText}
                    </span>
                  </div>
                  <div className="h-6 w-full overflow-hidden rounded-lg bg-[#101827] border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${posteriors.Somu.percentage}%` }}
                      transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-[#9299A6]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-sm text-[#9299A6]">
                Press <span className="font-semibold text-[#F5C451]">REVEAL</span> to normalize
                both scores into final percentages.
              </div>
            )}
          </div>
        </div>

        {/* Right 4 columns: Final Verdict & Trophy Spotlight */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-[#F5C451]/40 bg-[#171C28] overflow-hidden">
          {showSolvedVerdict ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45 }}
              className="flex h-full flex-col justify-between"
            >
              <div className="relative flex-1 min-h-[240px] w-full overflow-hidden bg-[#101827]">
                <ResilientImage
                  src={ASSET_PATHS.goldenTrophySpotlight}
                  alt="Trophy recovered under spotlight"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171C28] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-5 flex items-center gap-2 text-[#F5C451]">
                  <Trophy className="h-5 w-5" aria-hidden="true" />
                  <span className="font-display text-xl tracking-wider">TROPHY RECOVERED</span>
                </div>
              </div>

              <div className="p-5 text-center border-t border-white/10 bg-[#171C28]">
                <span className="font-math text-xs tracking-widest text-[#9299A6]">
                  FINAL MODEL OUTPUT
                </span>
                <h3 className="mt-1 font-display text-3xl sm:text-4xl tracking-wider text-[#F5C451] [text-wrap:balance]">
                  MOST LIKELY PREDICTION: {posteriors.winner.toUpperCase()}.
                </h3>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-[#F5C451]/45 text-[#F5C451]">
                <Trophy className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl tracking-wider text-[#F4F4F5]">
                VERDICT SEALED
              </h3>
              <p className="mt-2 text-sm text-[#9299A6]">
                {showPercentages
                  ? 'Press REVEAL once more to announce the final verdict and unseal the trophy!'
                  : 'Reveal the normalized percentages first, then unveil the final prediction.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Educational Disclaimer */}
      <div className="relative z-10 mt-4 flex items-center gap-3 rounded-xl border border-white/12 bg-[#171C28] px-5 py-3 text-sm text-[#F4F4F5]">
        <ShieldAlert className="h-5 w-5 text-[#F5C451] shrink-0" aria-hidden="true" />
        <p>
          Naive Bayes predicts the most likely class based on historical data. This is a mathematical
          prediction, not proof of actual guilt.
        </p>
      </div>
    </section>
  );
}
