import { motion } from 'motion/react';
import {
  HeightEvidenceGraphic,
  BlackShirtEvidenceGraphic,
  NoGlassesEvidenceGraphic,
} from '../EvidenceVisuals';

interface StageNBNaiveAssumptionProps {
  revealStep: number;
}

export function StageNBNaiveAssumption({ revealStep }: StageNBNaiveAssumptionProps) {
  return (
    <section
      aria-label="The Naive Assumption"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-5 lg:px-10"
    >
      <div className="mb-5 border-b border-white/10 pb-4">
        <p className="text-sm font-medium text-[#F5C451]">
          Naive Bayes Stage 4 · Conditional Independence
        </p>
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
          WHY IS IT CALLED &ldquo;NAIVE&rdquo; BAYES?
        </h2>
      </div>

      <p className="mb-6 text-lg sm:text-xl text-[#F4F4F5]">
        &ldquo;The algorithm assumes that the features are conditionally independent given the
        class.&rdquo;
      </p>

      {/* Independence Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-xl border border-white/12 bg-[#171C28] p-6">
        {/* Left 5 columns: Three separate feature evidence cards */}
        <div className="lg:col-span-5 space-y-3">
          {[
            { label: 'Height', value: 'Tall', Graphic: HeightEvidenceGraphic },
            { label: 'Dress', value: 'Black Shirt', Graphic: BlackShirtEvidenceGraphic },
            { label: 'Glasses', value: 'No Glasses', Graphic: NoGlassesEvidenceGraphic },
          ].map((item, idx) => {
            const Icon = item.Graphic;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="flex items-center justify-between rounded-lg border border-white/12 bg-[#101827] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-10 w-10 shrink-0" />
                  <div>
                    <div className="text-xs text-[#9299A6]">Independent Feature</div>
                    <div className="font-display text-2xl tracking-wider text-[#F4F4F5]">
                      {item.label}
                    </div>
                  </div>
                </div>
                <span className="font-math text-sm font-semibold text-[#F5C451]">
                  {item.value}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Center 3 columns: SVG converging pathways */}
        <div className="lg:col-span-3 flex items-center justify-center">
          <svg
            viewBox="0 0 220 180"
            className="h-36 w-full max-w-[220px]"
            aria-label="Diagram showing Height, Dress, and Glasses converging independently into Suspect Classification"
          >
            {/* Top path */}
            <path
              d="M10 30 H100 V90 H205"
              fill="none"
              stroke="#F5C451"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Middle path */}
            <path
              d="M10 90 H205"
              fill="none"
              stroke="#F5C451"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Bottom path */}
            <path
              d="M10 150 H100 V90"
              fill="none"
              stroke="#F5C451"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Arrow head */}
            <polygon points="210,90 194,81 194,99" fill="#F5C451" />
            <circle cx="100" cy="90" r="6" fill="#F5C451" />
          </svg>
        </div>

        {/* Right 4 columns: Classification Target */}
        <div className="lg:col-span-4 flex flex-col justify-center rounded-xl border border-[#F5C451]/45 bg-[#101827] p-6 text-center">
          <span className="font-math text-xs tracking-widest text-[#F5C451]">
            CONDITIONAL PRODUCT
          </span>
          <h3 className="mt-2 font-display text-3xl tracking-wider text-[#F4F4F5]">
            SUSPECT CLASSIFICATION
          </h3>
          <div className="mt-4 rounded-lg border border-white/10 bg-[#171C28] p-3 font-math text-xs sm:text-sm text-[#F5C451]">
            P(X|C) = P(Height|C) × P(Dress|C) × P(Glasses|C)
          </div>
        </div>
      </div>

      {revealStep >= 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 rounded-xl border border-white/12 bg-[#171C28] px-6 py-4"
        >
          <p className="text-base sm:text-lg leading-relaxed text-[#F4F4F5]">
            &ldquo;The model treats the features as conditionally independent when calculating the
            probability for each class. This is a simplifying assumption, not necessarily a
            statement that the features are truly unrelated in real life.&rdquo;
          </p>
        </motion.div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-white/15 bg-[#171C28]/50 px-6 py-4 text-center text-sm text-[#9299A6]">
          Press <span className="font-semibold text-[#F5C451]">REVEAL</span> to show the key
          modeling insight.
        </div>
      )}
    </section>
  );
}
