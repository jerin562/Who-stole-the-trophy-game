import { motion } from 'motion/react';

interface StageNBConceptProps {
  revealStep: number;
}

const BAYES_TERMS = [
  {
    symbol: 'P(C|X)',
    name: 'Posterior probability',
    meaning: 'Probability that suspect C committed the theft given the observed evidence X.',
  },
  {
    symbol: 'P(C)',
    name: 'Prior probability',
    meaning: 'Baseline probability of suspect C before observing any new clues.',
  },
  {
    symbol: 'P(X|C)',
    name: 'Likelihood',
    meaning: 'How frequently the observed clues X appear in suspect C’s historical cases.',
  },
  {
    symbol: 'P(X)',
    name: 'Evidence',
    meaning: 'Overall probability of the clues; constant across suspects when comparing scores.',
  },
];

export function StageNBConcept({ revealStep }: StageNBConceptProps) {
  return (
    <section
      aria-label="What is Naive Bayes?"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-5 lg:px-10"
    >
      <div className="mb-5 border-b border-white/10 pb-4">
        <p className="text-sm font-medium text-[#F5C451]">
          Naive Bayes Stage 1 · Core Foundation
        </p>
        <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
          WHAT IS NAIVE BAYES?
        </h2>
      </div>

      <p className="mb-6 max-w-4xl text-lg sm:text-xl leading-relaxed text-[#F4F4F5]">
        &ldquo;Naive Bayes is a classification algorithm based on Bayes&apos; Theorem. It predicts
        the most likely class using the available features.&rdquo;
      </p>

      {/* Bayes Formula Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-6 flex flex-col items-center justify-center rounded-xl border border-[#F5C451]/45 bg-[#171C28] px-6 py-7 text-center shadow-lg"
      >
        <span className="mb-2 text-xs font-medium tracking-widest text-[#9299A6]">
          BAYES&apos; THEOREM
        </span>
        <div className="font-math text-2xl sm:text-4xl font-bold tracking-tight text-[#F5C451]">
          P(C|X) = P(C) × P(X|C) / P(X)
        </div>
      </motion.div>

      {/* Step 1: Term Breakdown */}
      {revealStep >= 1 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BAYES_TERMS.map((term, idx) => (
            <motion.div
              key={term.symbol}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.08 }}
              className="rounded-xl border border-white/12 bg-[#171C28] p-4"
            >
              <div className="font-math text-2xl font-bold text-[#F5C451]">{term.symbol}</div>
              <h3 className="mt-1.5 text-base font-semibold text-[#F4F4F5]">{term.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#9299A6]">{term.meaning}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/15 bg-[#171C28]/50 p-6 text-center text-base text-[#9299A6]">
          Click <span className="font-semibold text-[#F5C451]">REVEAL</span> (or press Space) to
          break down each term of Bayes&apos; Theorem.
        </div>
      )}

      {/* Step 2: Goal Statement */}
      {revealStep >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 rounded-xl border border-[#F5C451]/35 bg-[#171C28] px-6 py-4 text-center"
        >
          <p className="text-lg font-medium text-[#F4F4F5]">
            &ldquo;We want to find whether the new evidence is more likely to belong to{' '}
            <span className="font-semibold text-[#F5C451]">Raju</span> or{' '}
            <span className="font-semibold text-[#F5C451]">Somu</span>.&rdquo;
          </p>
        </motion.div>
      )}
    </section>
  );
}
