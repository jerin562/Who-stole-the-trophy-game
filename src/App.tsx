import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PresentationState,
  advancePresentation,
  canRevealMore,
  createInitialPresentationState,
  getCurrentStage,
  jumpToStage,
  retreatPresentation,
  revealCurrentStep,
} from './logic/presentationState';
import { audioEngine } from './utils/soundEffects';
import { ControlBar } from './components/ControlBar';
import { StageOpening } from './components/stages/StageOpening';
import { StageMysteryIntro } from './components/stages/StageMysteryIntro';
import { StageClueReveal } from './components/stages/StageClueReveal';
import { StageHistoricalData } from './components/stages/StageHistoricalData';
import { StageTeamParticipation } from './components/stages/StageTeamParticipation';
import { StageNBConcept } from './components/stages/StageNBConcept';
import { StageNBPriors } from './components/stages/StageNBPriors';
import { StageNBLikelihood } from './components/stages/StageNBLikelihood';
import { StageNBNaiveAssumption } from './components/stages/StageNBNaiveAssumption';
import { StageZeroProbability } from './components/stages/StageZeroProbability';
import { StageLaplaceSmoothing } from './components/stages/StageLaplaceSmoothing';
import { StageFinalCalculation } from './components/stages/StageFinalCalculation';
import { StageFinalPrediction } from './components/stages/StageFinalPrediction';
import { StageQuiz } from './components/stages/StageQuiz';

function getInitialAutostart(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1';
}

export default function App() {
  const [state, setState] = useState<PresentationState>(() =>
    createInitialPresentationState(getInitialAutostart())
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentStage = getCurrentStage(state);

  const playTransitionCue = useCallback(
    (nextState: PresentationState, prevState: PresentationState) => {
      const nextStage = getCurrentStage(nextState);
      if (nextStage.id === 'clue-reveal' && nextState.revealStep > prevState.revealStep) {
        audioEngine.play('clue');
      } else if (nextStage.id === 'nb-zero-prob' && nextState.stageIndex !== prevState.stageIndex) {
        audioEngine.play('warning');
      } else if (nextStage.id === 'final-prediction' && nextState.revealStep === 2) {
        audioEngine.play('solved');
      } else if (nextState.revealStep > prevState.revealStep) {
        audioEngine.play('reveal');
      } else {
        audioEngine.play('click');
      }
    },
    []
  );

  const handleNext = useCallback(() => {
    setState((prev) => {
      const next = advancePresentation(prev);
      playTransitionCue(next, prev);
      return next;
    });
  }, [playTransitionCue]);

  const handlePrevious = useCallback(() => {
    setState((prev) => {
      const next = retreatPresentation(prev);
      audioEngine.play('click');
      return next;
    });
  }, []);

  const handleReveal = useCallback(() => {
    setState((prev) => {
      if (!canRevealMore(prev)) return prev;
      const next = revealCurrentStep(prev);
      playTransitionCue(next, prev);
      return next;
    });
  }, [playTransitionCue]);

  const handleRestart = useCallback(() => {
    audioEngine.play('click');
    setState(createInitialPresentationState(false));
  }, []);

  const handleJumpToStage = useCallback((stageIndex: number) => {
    audioEngine.play('click');
    setState(jumpToStage(stageIndex, false));
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      audioEngine.setMuted(next);
      return next;
    });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard shortcuts: Right Arrow = Next, Left Arrow = Previous, Space = Reveal or Next
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.code === 'Space') {
        // Do not hijack Space when user is actively pressing a focused button
        if (tagName === 'button') return;
        e.preventDefault();
        if (canRevealMore(state)) {
          handleReveal();
        } else {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state, handleNext, handlePrevious, handleReveal]);

  return (
    <div
      data-stage={currentStage.id}
      data-reveal-step={state.revealStep}
      className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#101827] text-[#F4F4F5] evidence-grid-bg"
    >
      {/* Main 16:9 Presentation Viewport */}
      <main className="relative flex-1 overflow-y-auto overflow-x-hidden pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            {currentStage.id === 'opening' && (
              <StageOpening onStartInvestigation={handleNext} />
            )}
            {currentStage.id === 'mystery-intro' && (
              <StageMysteryIntro onRevealClues={handleNext} />
            )}
            {currentStage.id === 'clue-reveal' && (
              <StageClueReveal
                revealStep={state.revealStep}
                onRevealNextClue={handleReveal}
                onProceedToDataset={handleNext}
              />
            )}
            {currentStage.id === 'historical-data' && <StageHistoricalData />}
            {currentStage.id === 'team-participation' && (
              <StageTeamParticipation
                revealStep={state.revealStep}
                onRevealRoles={handleReveal}
              />
            )}
            {currentStage.id === 'nb-concept' && (
              <StageNBConcept revealStep={state.revealStep} />
            )}
            {currentStage.id === 'nb-priors' && (
              <StageNBPriors revealStep={state.revealStep} />
            )}
            {currentStage.id === 'nb-likelihood' && (
              <StageNBLikelihood revealStep={state.revealStep} />
            )}
            {currentStage.id === 'nb-naive-assumption' && (
              <StageNBNaiveAssumption revealStep={state.revealStep} />
            )}
            {currentStage.id === 'nb-zero-prob' && (
              <StageZeroProbability
                revealStep={state.revealStep}
                onRevealSolution={() => {
                  setState((prev) => {
                    const next = { ...prev, revealStep: 2 };
                    audioEngine.play('reveal');
                    return next;
                  });
                }}
              />
            )}
            {currentStage.id === 'nb-laplace' && (
              <StageLaplaceSmoothing revealStep={state.revealStep} />
            )}
            {currentStage.id === 'final-calculation' && (
              <StageFinalCalculation revealStep={state.revealStep} />
            )}
            {currentStage.id === 'final-prediction' && (
              <StageFinalPrediction revealStep={state.revealStep} />
            )}
            {currentStage.id === 'quiz' && <StageQuiz />}
          </motion.div>
        </AnimatePresence>
      </main>

      <ControlBar
        state={state}
        isFullscreen={isFullscreen}
        isMuted={isMuted}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onReveal={handleReveal}
        onRestart={handleRestart}
        onToggleFullscreen={handleToggleFullscreen}
        onToggleMute={handleToggleMute}
        onJumpToStage={handleJumpToStage}
      />
    </div>
  );
}
