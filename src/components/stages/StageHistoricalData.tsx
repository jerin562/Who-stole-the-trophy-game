import { useState } from 'react';
import { motion } from 'motion/react';
import { HISTORICAL_CASES, computeClassCounts } from '../../logic/naiveBayes';

export function StageHistoricalData() {
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
  const [filterCulprit, setFilterCulprit] = useState<'ALL' | 'Raju' | 'Somu'>('ALL');
  const counts = computeClassCounts(HISTORICAL_CASES);

  const visibleCases =
    filterCulprit === 'ALL'
      ? HISTORICAL_CASES
      : HISTORICAL_CASES.filter((c) => c.culprit === filterCulprit);

  return (
    <section
      aria-label="Historical Crime Data"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-4 lg:px-10"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-3">
        <div>
          <p className="text-sm font-medium text-[#F5C451]">
            Training Dataset · {counts.total} Historical Cases
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
            HISTORICAL CRIME DATA
          </h2>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-white/12 bg-[#171C28] p-1">
          {(['ALL', 'Raju', 'Somu'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilterCulprit(option)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                filterCulprit === option
                  ? 'bg-[#F5C451] text-[#101827]'
                  : 'text-[#9299A6] hover:text-[#F4F4F5]'
              }`}
            >
              {option === 'ALL' ? `All Cases (${counts.total})` : `${option} (${counts[option]})`}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-base text-[#F4F4F5]">
        &ldquo;Before making a decision, detectives must study previous cases. We have 10 historical
        cases where the actual culprit is already known.&rdquo;
      </p>

      {/* Clean Data Table */}
      <div className="overflow-hidden rounded-xl border border-white/12 bg-[#171C28]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/12 bg-[#101827] text-xs font-semibold tracking-wider text-[#9299A6]">
              <th className="px-5 py-3">CASE</th>
              <th className="px-5 py-3">HEIGHT</th>
              <th className="px-5 py-3">DRESS</th>
              <th className="px-5 py-3">GLASSES</th>
              <th className="px-5 py-3 text-right">CULPRIT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8 text-sm sm:text-base">
            {visibleCases.map((row, index) => {
              const isHighlighted = highlightedRow === row.id;
              const isRaju = row.culprit === 'Raju';
              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.025 }}
                  onClick={() =>
                    setHighlightedRow((prev) => (prev === row.id ? null : row.id))
                  }
                  className={`cursor-pointer transition-colors ${
                    isHighlighted
                      ? 'bg-[#F5C451]/18'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <td className="px-5 py-2.5 font-math font-semibold text-[#F5C451]">
                    #{String(row.id).padStart(2, '0')}
                  </td>
                  <td
                    className={`px-5 py-2.5 font-medium ${
                      row.height === 'Tall' ? 'text-[#F4F4F5]' : 'text-[#9299A6]'
                    }`}
                  >
                    {row.height}
                  </td>
                  <td
                    className={`px-5 py-2.5 font-medium ${
                      row.dress === 'Black' ? 'text-[#F4F4F5]' : 'text-[#9299A6]'
                    }`}
                  >
                    {row.dress}
                  </td>
                  <td
                    className={`px-5 py-2.5 font-medium ${
                      row.glasses === 'No' ? 'text-[#F4F4F5]' : 'text-[#9299A6]'
                    }`}
                  >
                    {row.glasses}
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <span
                      className={`font-display text-xl tracking-wider ${
                        isRaju ? 'text-[#F5C451]' : 'text-[#9299A6]'
                      }`}
                    >
                      {row.culprit.toUpperCase()}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#171C28]/80 px-5 py-3.5 text-sm text-[#9299A6]">
        <p className="max-w-4xl text-[#F4F4F5]">
          &ldquo;These 10 cases are our training data. Naive Bayes will learn patterns from them and
          use those patterns to predict the most likely culprit in the new case.&rdquo;
        </p>
        <span className="font-math text-xs text-[#F5C451] whitespace-nowrap">
          Click any row to highlight
        </span>
      </div>
    </section>
  );
}
