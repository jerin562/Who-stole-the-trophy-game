export type StageId =
  | 'opening'
  | 'mystery-intro'
  | 'clue-reveal'
  | 'historical-data'
  | 'team-participation'
  | 'nb-concept'
  | 'nb-priors'
  | 'nb-likelihood'
  | 'nb-naive-assumption'
  | 'nb-zero-prob'
  | 'nb-laplace'
  | 'final-calculation'
  | 'final-prediction'
  | 'quiz';

export interface StageConfig {
  id: StageId;
  title: string;
  shortLabel: string;
  maxRevealStep: number;
}

export const STAGES: StageConfig[] = [
  { id: 'opening', title: 'The Mystery Begins', shortLabel: 'Opening', maxRevealStep: 0 },
  { id: 'mystery-intro', title: 'Case No: 001 Briefing', shortLabel: 'Case Intro', maxRevealStep: 0 },
  { id: 'clue-reveal', title: 'Clue Reveal', shortLabel: 'Clues', maxRevealStep: 3 },
  { id: 'historical-data', title: 'Historical Crime Data', shortLabel: 'Dataset', maxRevealStep: 0 },
  { id: 'team-participation', title: '12 Teams · 72 Detectives', shortLabel: 'Teams', maxRevealStep: 1 },
  { id: 'nb-concept', title: 'What Is Naive Bayes?', shortLabel: 'Bayes Theorem', maxRevealStep: 2 },
  { id: 'nb-priors', title: 'Prior Probability', shortLabel: 'Priors', maxRevealStep: 2 },
  { id: 'nb-likelihood', title: 'Likelihood Tables', shortLabel: 'Likelihood', maxRevealStep: 3 },
  { id: 'nb-naive-assumption', title: 'The Naive Assumption', shortLabel: 'Independence', maxRevealStep: 1 },
  { id: 'nb-zero-prob', title: 'Zero Probability Problem', shortLabel: 'Zero Problem', maxRevealStep: 2 },
  { id: 'nb-laplace', title: 'Laplace Smoothing', shortLabel: 'Laplace (+1)', maxRevealStep: 3 },
  { id: 'final-calculation', title: 'Final Score Calculation', shortLabel: 'Calculation', maxRevealStep: 3 },
  { id: 'final-prediction', title: 'Final Verdict', shortLabel: 'Verdict', maxRevealStep: 2 },
  { id: 'quiz', title: 'Classroom Quiz', shortLabel: 'Quiz', maxRevealStep: 0 },
];

export interface PresentationState {
  stageIndex: number;
  revealStep: number;
}

export function createInitialPresentationState(autostart = false): PresentationState {
  return {
    stageIndex: autostart ? 1 : 0,
    revealStep: 0,
  };
}

export function getCurrentStage(state: PresentationState): StageConfig {
  return STAGES[state.stageIndex] ?? STAGES[0];
}

export function canRevealMore(state: PresentationState): boolean {
  const stage = getCurrentStage(state);
  return state.revealStep < stage.maxRevealStep;
}

export function revealCurrentStep(state: PresentationState): PresentationState {
  const stage = getCurrentStage(state);
  if (state.revealStep < stage.maxRevealStep) {
    return {
      ...state,
      revealStep: state.revealStep + 1,
    };
  }
  return state;
}

export function advancePresentation(state: PresentationState): PresentationState {
  const stage = getCurrentStage(state);
  if (state.revealStep < stage.maxRevealStep) {
    return {
      ...state,
      revealStep: state.revealStep + 1,
    };
  }
  if (state.stageIndex < STAGES.length - 1) {
    return {
      stageIndex: state.stageIndex + 1,
      revealStep: 0,
    };
  }
  return state;
}

export function retreatPresentation(state: PresentationState): PresentationState {
  if (state.revealStep > 0) {
    return {
      ...state,
      revealStep: state.revealStep - 1,
    };
  }
  if (state.stageIndex > 0) {
    const prevStage = STAGES[state.stageIndex - 1];
    return {
      stageIndex: state.stageIndex - 1,
      revealStep: prevStage.maxRevealStep,
    };
  }
  return state;
}

export function jumpToStage(stageIndex: number, revealAll = false): PresentationState {
  const clamped = Math.max(0, Math.min(STAGES.length - 1, stageIndex));
  return {
    stageIndex: clamped,
    revealStep: revealAll ? STAGES[clamped].maxRevealStep : 0,
  };
}
