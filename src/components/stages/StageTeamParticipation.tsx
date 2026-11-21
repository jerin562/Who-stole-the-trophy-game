import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Users, Eye, AlertCircle } from 'lucide-react';
import { TEAM_ROLES } from '../../logic/naiveBayes';

interface StageTeamParticipationProps {
  revealStep: number;
  onRevealRoles: () => void;
}

const INITIAL_SECONDS = 10 * 60; // 10:00

export function StageTeamParticipation({
  revealStep,
  onRevealRoles,
}: StageTeamParticipationProps) {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  const rolesRevealed = revealStep >= 1;
  const isWarning = secondsLeft <= 60;
  const isExpired = secondsLeft === 0;

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const teams = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <section
      aria-label="Classroom Team Participation"
      className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-4 lg:px-10"
    >
      {/* Header + 10-Minute Countdown Timer */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div>
          <p className="text-sm font-medium text-[#F5C451]">
            Classroom Group Investigation · 6 Detectives per Team
          </p>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wider text-[#F4F4F5]">
            12 TEAMS. 72 DETECTIVES. ONE MYSTERY.
          </h2>
        </div>

        {/* Countdown Timer Control Panel */}
        <div
          className={`flex items-center gap-4 rounded-xl border px-4 py-2.5 transition-colors ${
            isWarning
              ? 'border-[#D94848] bg-[#D94848]/15'
              : 'border-[#F5C451]/35 bg-[#171C28]'
          }`}
        >
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wider text-[#9299A6]">
              {isWarning && <AlertCircle className="h-3.5 w-3.5 text-[#D94848]" aria-hidden="true" />}
              <span>{isExpired ? 'TIME UP' : isWarning ? 'FINAL MINUTE' : 'TEAM TIMER'}</span>
            </span>
            <span
              data-testid="countdown-display"
              className={`font-math text-3xl font-bold leading-none ${
                isWarning ? 'text-[#D94848]' : 'text-[#F5C451]'
              }`}
            >
              {mins}:{secs}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {!isRunning ? (
              <button
                type="button"
                onClick={() => setIsRunning(true)}
                disabled={secondsLeft === 0}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5C451] px-3.5 py-2 text-xs font-semibold text-[#101827] hover:bg-[#f7d06b] disabled:opacity-40 transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{secondsLeft < INITIAL_SECONDS ? 'RESUME' : 'START'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsRunning(false)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C451] bg-[#101827] px-3.5 py-2 text-xs font-semibold text-[#F5C451] hover:bg-[#F5C451]/15 transition-colors whitespace-nowrap shrink-0"
              >
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                <span>PAUSE</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(INITIAL_SECONDS);
              }}
              aria-label="Reset 10-minute timer"
              className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-[#101827] px-3 py-2 text-xs font-medium text-[#9299A6] hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: 12 Team Cards + 6 Role Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left 7 columns: TEAM 01 to TEAM 12 */}
        <div className="lg:col-span-7 rounded-xl border border-white/12 bg-[#171C28] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-2xl tracking-wider text-[#F4F4F5]">
              Active Squads (Team 01 – Team 12)
            </h3>
            <span className="font-math text-xs text-[#9299A6]">12 × 6 = 72 Students</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {teams.map((num) => (
              <div
                key={num}
                className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#101827] p-3 hover:border-[#F5C451]/45 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg tracking-wider text-[#F5C451]">
                    TEAM {String(num).padStart(2, '0')}
                  </span>
                  <span className="font-math text-[11px] text-[#9299A6]">6</span>
                </div>
                <div className="mt-2.5 grid grid-cols-6 gap-1" aria-label="6 detective members">
                  {Array.from({ length: 6 }).map((_, mIdx) => (
                    <span
                      key={mIdx}
                      className="flex h-5 w-5 items-center justify-center rounded bg-[#171C28] border border-white/10"
                      title={rolesRevealed ? TEAM_ROLES[mIdx].title : `Detective ${mIdx + 1}`}
                    >
                      <Users
                        className={`h-3 w-3 ${
                          rolesRevealed ? 'text-[#F5C451]' : 'text-[#9299A6]'
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 columns: 6 Detective Roles */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/12 bg-[#171C28] p-4">
          <div>
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-display text-2xl tracking-wider text-[#F4F4F5]">
                Six Detective Roles
              </h3>
              {!rolesRevealed && (
                <button
                  type="button"
                  onClick={onRevealRoles}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5C451] px-3 py-1.5 text-xs font-semibold text-[#101827] hover:bg-[#f7d06b] transition-colors whitespace-nowrap shrink-0"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>REVEAL ROLES</span>
                </button>
              )}
            </div>

            {rolesRevealed ? (
              <div className="space-y-2">
                {TEAM_ROLES.map((role, idx) => (
                  <motion.div
                    key={role.number}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.05 }}
                    className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#101827] px-3.5 py-2"
                  >
                    <span className="font-math text-sm font-bold text-[#F5C451]">
                      0{role.number}
                    </span>
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-[#F4F4F5]">
                        {role.title}
                      </p>
                      <p className="text-xs text-[#9299A6]">{role.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-[#101827]/60 p-6 text-center">
                <p className="text-base font-medium text-[#F4F4F5]">
                  Role allocation ready for 72 detectives
                </p>
                <p className="mt-1.5 text-sm text-[#9299A6]">
                  Click REVEAL ROLES (or press Reveal) to assign the 6 specialist roles to every
                  team before starting the 10-minute timer.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
