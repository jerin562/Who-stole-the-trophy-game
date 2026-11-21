import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  ListOrdered,
  X,
} from 'lucide-react';
import { STAGES, PresentationState, canRevealMore, getCurrentStage } from '../logic/presentationState';

interface ControlBarProps {
  state: PresentationState;
  isFullscreen: boolean;
  isMuted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReveal: () => void;
  onRestart: () => void;
  onToggleFullscreen: () => void;
  onToggleMute: () => void;
  onJumpToStage: (stageIndex: number) => void;
}

export function ControlBar({
  state,
  isFullscreen,
  isMuted,
  onPrevious,
  onNext,
  onReveal,
  onRestart,
  onToggleFullscreen,
  onToggleMute,
  onJumpToStage,
}: ControlBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentStage = getCurrentStage(state);
  const hasMoreReveals = canRevealMore(state);
  const isFirst = state.stageIndex === 0 && state.revealStep === 0;
  const isLast = state.stageIndex === STAGES.length - 1 && !hasMoreReveals;
  const progressPercent = ((state.stageIndex + 1) / STAGES.length) * 100;

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-x-0 bottom-20 z-40 mx-auto max-w-4xl px-4"
          role="dialog"
          aria-label="Jump to presentation stage"
        >
          <div className="rounded-xl border border-white/15 bg-[#171C28]/95 p-4 shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="font-display text-xl tracking-wider text-[#F5C451]">
                Investigation Stages
              </h2>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close stage menu"
                className="rounded-lg p-1.5 text-[#9299A6] hover:bg-white/10 hover:text-[#F4F4F5] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {STAGES.map((stage, idx) => {
                const active = idx === state.stageIndex;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => {
                      onJumpToStage(idx);
                      setMenuOpen(false);
                    }}
                    className={`flex flex-col items-start rounded-lg border px-2.5 py-2 text-left transition-colors ${
                      active
                        ? 'border-[#F5C451] bg-[#F5C451]/15 text-[#F5C451]'
                        : 'border-white/10 bg-[#101827]/70 text-[#F4F4F5] hover:border-white/30'
                    }`}
                  >
                    <span className="font-math text-[11px] text-[#9299A6]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-medium leading-tight truncate w-full">
                      {stage.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#101827]/95 backdrop-blur-md">
        {/* Progress bar line */}
        <div className="h-1 w-full bg-[#171C28]" aria-hidden="true">
          <div
            className="h-full bg-[#F5C451] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-2.5">
          {/* Left: Stage Progress Indicator */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label="Open stage navigator"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-[#171C28] px-3 py-2 text-xs font-medium text-[#F4F4F5] hover:border-[#F5C451]/50 transition-colors whitespace-nowrap shrink-0"
            >
              <ListOrdered className="h-4 w-4 text-[#F5C451]" aria-hidden="true" />
              <span className="font-math">
                Stage {String(state.stageIndex + 1).padStart(2, '0')} / {STAGES.length}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-sm text-[#9299A6] truncate">
              <span className="font-medium text-[#F4F4F5] truncate">{currentStage.title}</span>
              {currentStage.maxRevealStep > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-math text-xs text-[#F5C451] whitespace-nowrap">
                    Step {state.revealStep}/{currentStage.maxRevealStep}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Center: Core Teacher Presentation Controls */}
          <nav aria-label="Teacher presentation controls" className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={isFirst}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#171C28] px-3.5 py-2 text-xs font-semibold tracking-wider text-[#F4F4F5] hover:border-white/35 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span>PREVIOUS</span>
            </button>

            <button
              type="button"
              onClick={onReveal}
              disabled={!hasMoreReveals}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                hasMoreReveals
                  ? 'border-[#F5C451] bg-[#F5C451] text-[#101827] hover:bg-[#f7d06b]'
                  : 'border-white/10 bg-[#171C28] text-[#9299A6] opacity-45 cursor-not-allowed'
              }`}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>REVEAL</span>
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={isLast}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                !hasMoreReveals && !isLast
                  ? 'border-[#F5C451] bg-[#F5C451] text-[#101827] hover:bg-[#f7d06b]'
                  : 'border-white/15 bg-[#171C28] text-[#F4F4F5] hover:border-[#F5C451]/60 disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
            >
              <span>NEXT</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>

          {/* Right: Utility Controls (Restart, Mute, Fullscreen) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onRestart}
              aria-label="Restart presentation"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-[#171C28] px-3 py-2 text-xs font-medium text-[#9299A6] hover:border-white/30 hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">RESTART</span>
            </button>

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
              className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-[#171C28] p-2 text-[#9299A6] hover:border-white/30 hover:text-[#F4F4F5] transition-colors shrink-0"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#F5C451]" />}
            </button>

            <button
              type="button"
              onClick={onToggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-[#171C28] px-3 py-2 text-xs font-medium text-[#9299A6] hover:border-[#F5C451]/50 hover:text-[#F4F4F5] transition-colors whitespace-nowrap shrink-0"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5 text-[#F5C451]" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span className="hidden lg:inline">FULLSCREEN</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
