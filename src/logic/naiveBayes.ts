export type SuspectId = 'Raju' | 'Somu';
export type HeightValue = 'Tall' | 'Short';
export type DressValue = 'Black' | 'White';
export type GlassesValue = 'Yes' | 'No';

export interface HistoricalCase {
  id: number;
  height: HeightValue;
  dress: DressValue;
  glasses: GlassesValue;
  culprit: SuspectId;
}

export interface EvidenceInput {
  height: HeightValue;
  dress: DressValue;
  glasses: GlassesValue;
}

export interface SuspectProfile {
  id: SuspectId;
  name: string;
  heightLabel: string;
  dressLabel: string;
  descriptor: string;
  imagePath: string;
  accentHex: string;
}

export interface TeamRole {
  number: number;
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

export const ASSET_PATHS = {
  goldenTrophySpotlight: '/src/assets/images/golden_trophy_spotlight_1795200860453.jpg',
  emptyPedestalAuditorium: '/src/assets/images/empty_pedestal_auditorium_1795200860448.jpg',
  cctvCorridor: '/src/assets/images/cctv_corridor_1795200860509.jpg',
  suspectRaju: '/src/assets/images/suspect_raju_1795200860045.jpg',
  suspectSomu: '/src/assets/images/suspect_somu_1795200860718.jpg',
} as const;

export const SUSPECT_PROFILES: Record<SuspectId, SuspectProfile> = {
  Raju: {
    id: 'Raju',
    name: 'RAJU',
    heightLabel: 'Tall',
    dressLabel: 'Black shirt',
    descriptor: 'Fictional suspect',
    imagePath: ASSET_PATHS.suspectRaju,
    accentHex: '#F5C451',
  },
  Somu: {
    id: 'Somu',
    name: 'SOMU',
    heightLabel: 'Short',
    dressLabel: 'White shirt',
    descriptor: 'Fictional suspect',
    imagePath: ASSET_PATHS.suspectSomu,
    accentHex: '#9299A6',
  },
};

export const TARGET_EVIDENCE: EvidenceInput = {
  height: 'Tall',
  dress: 'Black',
  glasses: 'No',
};

export const HISTORICAL_CASES: HistoricalCase[] = [
  { id: 1, height: 'Tall', dress: 'Black', glasses: 'Yes', culprit: 'Raju' },
  { id: 2, height: 'Short', dress: 'White', glasses: 'No', culprit: 'Somu' },
  { id: 3, height: 'Tall', dress: 'Black', glasses: 'No', culprit: 'Raju' },
  { id: 4, height: 'Tall', dress: 'White', glasses: 'Yes', culprit: 'Raju' },
  { id: 5, height: 'Short', dress: 'Black', glasses: 'Yes', culprit: 'Somu' },
  { id: 6, height: 'Short', dress: 'White', glasses: 'Yes', culprit: 'Somu' },
  { id: 7, height: 'Tall', dress: 'White', glasses: 'No', culprit: 'Raju' },
  { id: 8, height: 'Short', dress: 'Black', glasses: 'No', culprit: 'Somu' },
  { id: 9, height: 'Tall', dress: 'Black', glasses: 'Yes', culprit: 'Raju' },
  { id: 10, height: 'Short', dress: 'White', glasses: 'No', culprit: 'Somu' },
];

export const TEAM_ROLES: TeamRole[] = [
  {
    number: 1,
    title: 'HEIGHT EXPERT',
    description: 'Analyses height-related evidence.',
  },
  {
    number: 2,
    title: 'DRESS EXPERT',
    description: 'Analyses clothing-related evidence.',
  },
  {
    number: 3,
    title: 'GLASSES EXPERT',
    description: 'Analyses glasses-related evidence.',
  },
  {
    number: 4,
    title: 'PRIOR PROBABILITY COUNTER',
    description: 'Calculates prior probabilities.',
  },
  {
    number: 5,
    title: 'CALCULATOR',
    description: 'Calculates likelihoods and final scores.',
  },
  {
    number: 6,
    title: 'PRESENTER',
    description: "Explains the team's final verdict.",
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'What does prior probability represent?',
    options: [
      { key: 'A', text: 'Probability before considering the new evidence.' },
      { key: 'B', text: 'Final prediction.' },
      { key: 'C', text: 'Number of features.' },
      { key: 'D', text: 'Total number of suspects.' },
    ],
    correctKey: 'A',
    explanation: 'Prior probability P(C) reflects the baseline frequency of each class in the historical training data before observing new clues.',
  },
  {
    id: 'q2',
    prompt: 'Why do we use Laplace smoothing?',
    options: [
      { key: 'A', text: 'To increase the dataset size.' },
      { key: 'B', text: 'To prevent zero probabilities.' },
      { key: 'C', text: 'To remove features.' },
      { key: 'D', text: 'To change the class labels.' },
    ],
    correctKey: 'B',
    explanation: 'Adding +1 to every count ensures an unseen feature value (like Tall for Somu) never zeroes out the entire product.',
  },
  {
    id: 'q3',
    prompt: 'What is K in this activity?',
    options: [
      { key: 'A', text: 'Number of suspects.' },
      { key: 'B', text: 'Number of historical cases.' },
      { key: 'C', text: 'Number of possible feature values.' },
      { key: 'D', text: 'Number of teams.' },
    ],
    correctKey: 'C',
    explanation: 'Each feature (Height, Dress, Glasses) has 2 possible values, so K = 2 and the smoothed denominator becomes 5 + 2 = 7.',
  },
  {
    id: 'q4',
    prompt: 'Which suspect receives the higher probability score?',
    options: [
      { key: 'A', text: 'Raju.' },
      { key: 'B', text: 'Somu.' },
    ],
    correctKey: 'A',
    explanation: 'Raju scores 72/686 (≈ 0.104956) compared to Somu’s 12/686 (≈ 0.017493), yielding 85.71% normalized posterior probability.',
  },
];

export interface ClassCounts {
  Raju: number;
  Somu: number;
  total: number;
}

export function computeClassCounts(cases: HistoricalCase[]): ClassCounts {
  let raju = 0;
  let somu = 0;
  for (const row of cases) {
    if (row.culprit === 'Raju') raju += 1;
    else somu += 1;
  }
  return { Raju: raju, Somu: somu, total: cases.length };
}

export function computePriors(cases: HistoricalCase[]): Record<SuspectId, number> {
  const counts = computeClassCounts(cases);
  const total = counts.total || 1;
  return {
    Raju: counts.Raju / total,
    Somu: counts.Somu / total,
  };
}

export type FeatureKey = keyof EvidenceInput;

export function computeFeatureCounts<K extends FeatureKey>(
  cases: HistoricalCase[],
  feature: K
): Record<SuspectId, Record<EvidenceInput[K], number>> {
  const values: Record<FeatureKey, string[]> = {
    height: ['Tall', 'Short'],
    dress: ['Black', 'White'],
    glasses: ['Yes', 'No'],
  };

  const result: Record<SuspectId, Record<string, number>> = {
    Raju: {},
    Somu: {},
  };

  for (const val of values[feature]) {
    result.Raju[val] = 0;
    result.Somu[val] = 0;
  }

  for (const row of cases) {
    const featureVal = row[feature] as string;
    result[row.culprit][featureVal] = (result[row.culprit][featureVal] ?? 0) + 1;
  }

  return result as Record<SuspectId, Record<EvidenceInput[K], number>>;
}

export interface LikelihoodResult {
  feature: FeatureKey;
  featureValue: string;
  suspect: SuspectId;
  count: number;
  classTotal: number;
  k: number;
  numerator: number;
  denominator: number;
  fractionLabel: string;
  decimal: number;
}

export function computeUnsmoothedLikelihood<K extends FeatureKey>(
  cases: HistoricalCase[],
  suspect: SuspectId,
  feature: K,
  value: EvidenceInput[K]
): LikelihoodResult {
  const classCounts = computeClassCounts(cases);
  const featureCounts = computeFeatureCounts(cases, feature);
  const count = featureCounts[suspect][value];
  const n = classCounts[suspect];
  return {
    feature,
    featureValue: value,
    suspect,
    count,
    classTotal: n,
    k: 0,
    numerator: count,
    denominator: n,
    fractionLabel: `${count}/${n}`,
    decimal: n > 0 ? count / n : 0,
  };
}

export function computeLaplaceLikelihood<K extends FeatureKey>(
  cases: HistoricalCase[],
  suspect: SuspectId,
  feature: K,
  value: EvidenceInput[K],
  k = 2
): LikelihoodResult {
  const classCounts = computeClassCounts(cases);
  const featureCounts = computeFeatureCounts(cases, feature);
  const count = featureCounts[suspect][value];
  const n = classCounts[suspect];
  const numerator = count + 1;
  const denominator = n + k;
  return {
    feature,
    featureValue: value,
    suspect,
    count,
    classTotal: n,
    k,
    numerator,
    denominator,
    fractionLabel: `${numerator}/${denominator}`,
    decimal: denominator > 0 ? numerator / denominator : 0,
  };
}

export interface SuspectScoreBreakdown {
  suspect: SuspectId;
  priorCount: number;
  totalCases: number;
  prior: number;
  likelihoods: {
    height: LikelihoodResult;
    dress: LikelihoodResult;
    glasses: LikelihoodResult;
  };
  exactNumerator: number;
  exactDenominator: number;
  exactFractionLabel: string;
  score: number;
  scoreFormatted: string;
}

export function computeUnsmoothedScore(
  cases: HistoricalCase[],
  suspect: SuspectId,
  evidence: EvidenceInput
): SuspectScoreBreakdown {
  const classCounts = computeClassCounts(cases);
  const prior = classCounts[suspect] / classCounts.total;
  const height = computeUnsmoothedLikelihood(cases, suspect, 'height', evidence.height);
  const dress = computeUnsmoothedLikelihood(cases, suspect, 'dress', evidence.dress);
  const glasses = computeUnsmoothedLikelihood(cases, suspect, 'glasses', evidence.glasses);

  const exactNumerator =
    classCounts[suspect] * height.numerator * dress.numerator * glasses.numerator;
  const exactDenominator =
    classCounts.total * height.denominator * dress.denominator * glasses.denominator;
  const score = prior * height.decimal * dress.decimal * glasses.decimal;

  return {
    suspect,
    priorCount: classCounts[suspect],
    totalCases: classCounts.total,
    prior,
    likelihoods: { height, dress, glasses },
    exactNumerator,
    exactDenominator,
    exactFractionLabel: `${exactNumerator}/${exactDenominator}`,
    score,
    scoreFormatted: score.toFixed(6),
  };
}

export function computeSmoothedScore(
  cases: HistoricalCase[],
  suspect: SuspectId,
  evidence: EvidenceInput,
  k = 2
): SuspectScoreBreakdown {
  const classCounts = computeClassCounts(cases);
  const prior = classCounts[suspect] / classCounts.total;
  const height = computeLaplaceLikelihood(cases, suspect, 'height', evidence.height, k);
  const dress = computeLaplaceLikelihood(cases, suspect, 'dress', evidence.dress, k);
  const glasses = computeLaplaceLikelihood(cases, suspect, 'glasses', evidence.glasses, k);

  // Express prior 0.5 cleanly as (classCount / totalCases) reduced by GCD so 5/10 = 1/2 -> 72/686
  const priorGcd = gcd(classCounts[suspect], classCounts.total);
  const priorNum = classCounts[suspect] / priorGcd;
  const priorDen = classCounts.total / priorGcd;

  const exactNumerator = priorNum * height.numerator * dress.numerator * glasses.numerator;
  const exactDenominator =
    priorDen * height.denominator * dress.denominator * glasses.denominator;
  const score = prior * height.decimal * dress.decimal * glasses.decimal;

  return {
    suspect,
    priorCount: classCounts[suspect],
    totalCases: classCounts.total,
    prior,
    likelihoods: { height, dress, glasses },
    exactNumerator,
    exactDenominator,
    exactFractionLabel: `${exactNumerator}/${exactDenominator}`,
    score,
    scoreFormatted: score.toFixed(6),
  };
}

export interface NormalizedPosteriors {
  Raju: {
    breakdown: SuspectScoreBreakdown;
    probability: number;
    percentage: number;
    percentageText: string;
  };
  Somu: {
    breakdown: SuspectScoreBreakdown;
    probability: number;
    percentage: number;
    percentageText: string;
  };
  winner: SuspectId;
}

export function computeNormalizedPosteriors(
  cases: HistoricalCase[],
  evidence: EvidenceInput,
  k = 2
): NormalizedPosteriors {
  const rajuBreakdown = computeSmoothedScore(cases, 'Raju', evidence, k);
  const somuBreakdown = computeSmoothedScore(cases, 'Somu', evidence, k);
  const totalScore = rajuBreakdown.score + somuBreakdown.score;

  const rajuProb = totalScore > 0 ? rajuBreakdown.score / totalScore : 0.5;
  const somuProb = totalScore > 0 ? somuBreakdown.score / totalScore : 0.5;

  return {
    Raju: {
      breakdown: rajuBreakdown,
      probability: rajuProb,
      percentage: rajuProb * 100,
      percentageText: `${(rajuProb * 100).toFixed(2)}%`,
    },
    Somu: {
      breakdown: somuBreakdown,
      probability: somuProb,
      percentage: somuProb * 100,
      percentageText: `${(somuProb * 100).toFixed(2)}%`,
    },
    winner: rajuProb >= somuProb ? 'Raju' : 'Somu',
  };
}

export interface QuizGradeResult {
  score: number;
  total: number;
  resultsByQuestionId: Record<string, { selected: string | null; isCorrect: boolean }>;
}

export function gradeQuiz(
  answers: Record<string, string>,
  questions: QuizQuestion[] = QUIZ_QUESTIONS
): QuizGradeResult {
  let score = 0;
  const resultsByQuestionId: Record<string, { selected: string | null; isCorrect: boolean }> = {};

  for (const q of questions) {
    const selected = answers[q.id] ?? null;
    const isCorrect = selected === q.correctKey;
    if (isCorrect) score += 1;
    resultsByQuestionId[q.id] = { selected, isCorrect };
  }

  return {
    score,
    total: questions.length,
    resultsByQuestionId,
  };
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}
