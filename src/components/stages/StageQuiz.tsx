import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS, gradeQuiz } from '../../logic/naiveBayes';

export function StageQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUIZ_QUESTIONS.every((q) => Boolean(answers[q.id]));
  const gradeResult = submitted ? gradeQuiz(answers, QUIZ_QUESTIONS) : null;

  function handleSelect(questionId: string, optionKey: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <section
      aria-label="Interactive Classroom Quiz"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-4 lg:px-10"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div>
          <p className="text-sm font-medium text-[#F5C451]">
            Knowledge Check · Naive Bayes &amp; Laplace Smoothing
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
            CLASSROOM INVESTIGATION QUIZ
          </h2>
        </div>

        {gradeResult ? (
          <div className="flex items-center gap-4">
            <div className="rounded-xl border border-[#F5C451] bg-[#171C28] px-5 py-2 text-right">
              <div className="text-xs text-[#9299A6]">Final Quiz Score</div>
              <div data-testid="quiz-score" className="font-math text-2xl font-bold text-[#F5C451]">
                {gradeResult.score} / {gradeResult.total}
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-[#F5C451] bg-[#171C28] px-5 py-3 font-display text-xl tracking-wider text-[#F5C451] hover:bg-[#F5C451]/15 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>TRY AGAIN</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="inline-flex items-center gap-2 rounded-lg bg-[#F5C451] px-7 py-3 font-display text-2xl tracking-wider text-[#101827] hover:bg-[#f7d06b] disabled:opacity-45 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
          >
            <span>SUBMIT</span>
          </button>
        )}
      </div>

      {/* 2x2 Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = answers[q.id];
          const result = gradeResult?.resultsByQuestionId[q.id];
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="flex flex-col justify-between rounded-xl border border-white/12 bg-[#171C28] p-4"
            >
              <div>
                <div className="mb-2.5 flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-[#F4F4F5]">
                    <span className="mr-2 font-math text-[#F5C451]">Q{idx + 1}.</span>
                    {q.prompt}
                  </h3>
                  {result && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 ${
                        result.isCorrect ? 'text-[#F5C451]' : 'text-[#D94848]'
                      }`}
                    >
                      {result.isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" aria-hidden="true" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  {q.options.map((opt) => {
                    const isSelected = selected === opt.key;
                    const isCorrectOption = opt.key === q.correctKey;

                    let optionStyle =
                      'border-white/10 bg-[#101827] text-[#F4F4F5] hover:border-[#F5C451]/45';
                    if (!submitted && isSelected) {
                      optionStyle = 'border-[#F5C451] bg-[#F5C451]/15 text-[#F5C451]';
                    } else if (submitted) {
                      if (isCorrectOption) {
                        optionStyle = 'border-[#F5C451] bg-[#F5C451]/18 text-[#F5C451]';
                      } else if (isSelected && !isCorrectOption) {
                        optionStyle = 'border-[#D94848] bg-[#D94848]/18 text-[#D94848]';
                      } else {
                        optionStyle = 'border-white/8 bg-[#101827]/60 text-[#9299A6]';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.key)}
                        disabled={submitted}
                        aria-pressed={isSelected}
                        className={`flex w-full items-center gap-3 rounded-lg border px-3.5 py-2 text-left text-sm transition-colors ${optionStyle}`}
                      >
                        <span className="font-math font-bold">{opt.key}.</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {submitted && (
                <p className="mt-3 border-t border-white/10 pt-2 text-xs leading-relaxed text-[#9299A6]">
                  {q.explanation}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
