import { motion } from 'motion/react';
import {
  HISTORICAL_CASES,
  TARGET_EVIDENCE,
  computeClassCounts,
  computeFeatureCounts,
} from '../../logic/naiveBayes';

interface StageNBLikelihoodProps {
  revealStep: number;
}

export function StageNBLikelihood({ revealStep }: StageNBLikelihoodProps) {
  const classCounts = computeClassCounts(HISTORICAL_CASES);
  const heightCounts = computeFeatureCounts(HISTORICAL_CASES, 'height');
  const dressCounts = computeFeatureCounts(HISTORICAL_CASES, 'dress');
  const glassesCounts = computeFeatureCounts(HISTORICAL_CASES, 'glasses');

  const tables = [
    {
      step: 1,
      title: 'Height',
      targetLabel: `Observed Clue: ${TARGET_EVIDENCE.height}`,
      cols: ['Tall', 'Short'] as const,
      highlightCol: 'Tall',
      rows: [
        { suspect: 'Raju', values: [heightCounts.Raju.Tall, heightCounts.Raju.Short], total: classCounts.Raju },
        { suspect: 'Somu', values: [heightCounts.Somu.Tall, heightCounts.Somu.Short], total: classCounts.Somu },
      ],
    },
    {
      step: 2,
      title: 'Dress',
      targetLabel: `Observed Clue: ${TARGET_EVIDENCE.dress} Shirt`,
      cols: ['Black', 'White'] as const,
      highlightCol: 'Black',
      rows: [
        { suspect: 'Raju', values: [dressCounts.Raju.Black, dressCounts.Raju.White], total: classCounts.Raju },
        { suspect: 'Somu', values: [dressCounts.Somu.Black, dressCounts.Somu.White], total: classCounts.Somu },
      ],
    },
    {
      step: 3,
      title: 'Glasses',
      targetLabel: `Observed Clue: ${TARGET_EVIDENCE.glasses} Glasses`,
      cols: ['Yes', 'No'] as const,
      highlightCol: 'No',
      rows: [
        { suspect: 'Raju', values: [glassesCounts.Raju.Yes, glassesCounts.Raju.No], total: classCounts.Raju },
        { suspect: 'Somu', values: [glassesCounts.Somu.Yes, glassesCounts.Somu.No], total: classCounts.Somu },
      ],
    },
  ];

  return (
    <section
      aria-label="Likelihood Tables"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-4 lg:px-10"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-3">
        <div>
          <p className="text-sm font-medium text-[#F5C451]">
            Naive Bayes Stage 3 · Feature Frequency Breakdown
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
            LIKELIHOOD COUNTS BY FEATURE
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs sm:text-sm text-[#9299A6]">
          <span>New Case Evidence:</span>
          <span className="font-math font-semibold text-[#F5C451]">Tall</span>
          <span aria-hidden="true">·</span>
          <span className="font-math font-semibold text-[#F5C451]">Black shirt</span>
          <span aria-hidden="true">·</span>
          <span className="font-math font-semibold text-[#F5C451]">No glasses</span>
        </div>
      </div>

      <p className="mb-5 text-base sm:text-lg text-[#F4F4F5]">
        Likelihood tells us how frequently a particular feature appears within a particular suspect&apos;s
        historical cases.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tables.map((table) => {
          const isVisible = revealStep >= table.step;
          return (
            <div
              key={table.title}
              className={`flex flex-col justify-between rounded-xl border p-5 transition-all duration-300 ${
                isVisible
                  ? 'border-[#F5C451]/45 bg-[#171C28]'
                  : 'border-white/10 bg-[#171C28]/45'
              }`}
            >
              <div>
                <div className="mb-3 flex items-baseline justify-between border-b border-white/10 pb-2.5">
                  <h3 className="font-display text-3xl tracking-wider text-[#F4F4F5]">
                    {table.title}
                  </h3>
                  <span className="font-math text-xs text-[#F5C451]">{table.targetLabel}</span>
                </div>

                {isVisible ? (
                  <motion.table
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full border-collapse text-left"
                  >
                    <thead>
                      <tr className="border-b border-white/12 text-xs text-[#9299A6]">
                        <th className="py-2.5 pr-2">Class</th>
                        {table.cols.map((col) => (
                          <th
                            key={col}
                            className={`py-2.5 px-2 text-right ${
                              col === table.highlightCol ? 'text-[#F5C451] font-semibold' : ''
                            }`}
                          >
                            {col}
                          </th>
                        ))}
                        <th className="py-2.5 pl-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/8 font-math text-base">
                      {table.rows.map((row) => (
                        <tr key={row.suspect}>
                          <td
                            className={`py-3.5 pr-2 font-sans font-semibold ${
                              row.suspect === 'Raju' ? 'text-[#F5C451]' : 'text-[#F4F4F5]'
                            }`}
                          >
                            {row.suspect}
                          </td>
                          {row.values.map((val, cIdx) => {
                            const colName = table.cols[cIdx];
                            const isTargetCell = colName === table.highlightCol;
                            const isZeroTrap = isTargetCell && val === 0;
                            return (
                              <td
                                key={colName}
                                className={`py-3.5 px-2 text-right font-bold ${
                                  isZeroTrap
                                    ? 'text-[#D94848] bg-[#D94848]/12 rounded'
                                    : isTargetCell
                                      ? 'text-[#F5C451] bg-[#F5C451]/10 rounded'
                                      : 'text-[#9299A6]'
                                }`}
                              >
                                {val}
                              </td>
                            );
                          })}
                          <td className="py-3.5 pl-2 text-right text-[#9299A6]">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </motion.table>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#101827]/60 p-4 text-center text-sm text-[#9299A6]">
                    Press REVEAL to count {table.title.toLowerCase()} occurrences.
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-white/10 pt-3 text-xs text-[#9299A6]">
                {isVisible ? (
                  <span>
                    Highlighted column matches observed clue:{' '}
                    <strong className="text-[#F5C451]">{table.highlightCol}</strong>
                  </span>
                ) : (
                  <span>Feature table {table.step} of 3</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
