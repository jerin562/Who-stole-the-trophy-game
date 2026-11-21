import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HISTORICAL_CASES,
  TARGET_EVIDENCE,
  QUIZ_QUESTIONS,
  computeClassCounts,
  computePriors,
  computeFeatureCounts,
  computeUnsmoothedLikelihood,
  computeUnsmoothedScore,
  computeLaplaceLikelihood,
  computeSmoothedScore,
  computeNormalizedPosteriors,
  gradeQuiz,
} from './naiveBayes';
import {
  STAGES,
  createInitialPresentationState,
  advancePresentation,
  retreatPresentation,
  revealCurrentStep,
  canRevealMore,
  jumpToStage,
} from './presentationState';

test('historical cases totals and priors match specification', () => {
  const counts = computeClassCounts(HISTORICAL_CASES);
  assert.equal(counts.total, 10);
  assert.equal(counts.Raju, 5);
  assert.equal(counts.Somu, 5);

  const priors = computePriors(HISTORICAL_CASES);
  assert.equal(priors.Raju, 0.5);
  assert.equal(priors.Somu, 0.5);
});

test('feature frequency counts match historical dataset', () => {
  const height = computeFeatureCounts(HISTORICAL_CASES, 'height');
  assert.deepEqual(height.Raju, { Tall: 5, Short: 0 });
  assert.deepEqual(height.Somu, { Tall: 0, Short: 5 });

  const dress = computeFeatureCounts(HISTORICAL_CASES, 'dress');
  assert.deepEqual(dress.Raju, { Black: 3, White: 2 });
  assert.deepEqual(dress.Somu, { Black: 2, White: 3 });

  const glasses = computeFeatureCounts(HISTORICAL_CASES, 'glasses');
  assert.deepEqual(glasses.Raju, { Yes: 3, No: 2 });
  assert.deepEqual(glasses.Somu, { Yes: 2, No: 3 });
});

test('unsmoothed likelihood produces zero probability failure for Somu', () => {
  const tallGivenSomu = computeUnsmoothedLikelihood(
    HISTORICAL_CASES,
    'Somu',
    'height',
    'Tall'
  );
  assert.equal(tallGivenSomu.fractionLabel, '0/5');
  assert.equal(tallGivenSomu.decimal, 0);

  const somuUnsmoothed = computeUnsmoothedScore(HISTORICAL_CASES, 'Somu', TARGET_EVIDENCE);
  assert.equal(somuUnsmoothed.score, 0);
});

test('Laplace smoothing (K=2) calculates exact fractions and final scores', () => {
  const rajuHeight = computeLaplaceLikelihood(HISTORICAL_CASES, 'Raju', 'height', 'Tall', 2);
  const rajuDress = computeLaplaceLikelihood(HISTORICAL_CASES, 'Raju', 'dress', 'Black', 2);
  const rajuGlasses = computeLaplaceLikelihood(HISTORICAL_CASES, 'Raju', 'glasses', 'No', 2);

  assert.equal(rajuHeight.fractionLabel, '6/7');
  assert.equal(rajuDress.fractionLabel, '4/7');
  assert.equal(rajuGlasses.fractionLabel, '3/7');

  const somuHeight = computeLaplaceLikelihood(HISTORICAL_CASES, 'Somu', 'height', 'Tall', 2);
  const somuDress = computeLaplaceLikelihood(HISTORICAL_CASES, 'Somu', 'dress', 'Black', 2);
  const somuGlasses = computeLaplaceLikelihood(HISTORICAL_CASES, 'Somu', 'glasses', 'No', 2);

  assert.equal(somuHeight.fractionLabel, '1/7');
  assert.equal(somuDress.fractionLabel, '3/7');
  assert.equal(somuGlasses.fractionLabel, '4/7');

  const rajuScore = computeSmoothedScore(HISTORICAL_CASES, 'Raju', TARGET_EVIDENCE, 2);
  const somuScore = computeSmoothedScore(HISTORICAL_CASES, 'Somu', TARGET_EVIDENCE, 2);

  assert.equal(rajuScore.exactFractionLabel, '72/686');
  assert.equal(rajuScore.scoreFormatted, '0.104956');
  assert.equal(somuScore.exactFractionLabel, '12/686');
  assert.equal(somuScore.scoreFormatted, '0.017493');
});

test('normalized posteriors yield 85.71% Raju and 14.29% Somu', () => {
  const posteriors = computeNormalizedPosteriors(HISTORICAL_CASES, TARGET_EVIDENCE, 2);
  assert.equal(posteriors.Raju.percentageText, '85.71%');
  assert.equal(posteriors.Somu.percentageText, '14.29%');
  assert.equal(posteriors.winner, 'Raju');
});

test('quiz grading validates all four answers accurately', () => {
  const perfect = gradeQuiz({ q1: 'A', q2: 'B', q3: 'C', q4: 'A' }, QUIZ_QUESTIONS);
  assert.equal(perfect.score, 4);
  assert.equal(perfect.total, 4);

  const partial = gradeQuiz({ q1: 'A', q2: 'A', q3: 'C', q4: 'B' }, QUIZ_QUESTIONS);
  assert.equal(partial.score, 2);
  assert.equal(partial.resultsByQuestionId.q2.isCorrect, false);
  assert.equal(partial.resultsByQuestionId.q3.isCorrect, true);
});

test('presentation state machine prevents skipping unrevealed steps', () => {
  let state = createInitialPresentationState(false);
  assert.equal(state.stageIndex, 0);
  assert.equal(state.revealStep, 0);

  // Advance to mystery-intro (stage 1)
  state = advancePresentation(state);
  assert.equal(state.stageIndex, 1);

  // Advance to clue-reveal (stage 2, maxRevealStep = 3)
  state = advancePresentation(state);
  assert.equal(state.stageIndex, 2);
  assert.equal(state.revealStep, 0);
  assert.equal(canRevealMore(state), true);

  // Next advances revealStep before changing stage
  state = advancePresentation(state);
  assert.equal(state.stageIndex, 2);
  assert.equal(state.revealStep, 1);

  state = revealCurrentStep(state);
  state = revealCurrentStep(state);
  assert.equal(state.revealStep, 3);
  assert.equal(canRevealMore(state), false);

  // Advancing again moves to stage 3 (historical-data)
  state = advancePresentation(state);
  assert.equal(state.stageIndex, 3);
  assert.equal(state.revealStep, 0);

  // Retreating returns to previous stage's final reveal step
  state = retreatPresentation(state);
  assert.equal(state.stageIndex, 2);
  assert.equal(state.revealStep, 3);

  const jumped = jumpToStage(STAGES.length - 1);
  assert.equal(jumped.stageIndex, STAGES.length - 1);
});
