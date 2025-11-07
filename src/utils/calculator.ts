// 内联类型定义
interface ScoreModifier {
  dimension: 'certainty' | 'speed';
  level: 'high' | 'medium' | 'low';
  points: number;
}

interface AnswerOption {
  id: string;
  text: string;
  scores: ScoreModifier[];
}

interface Question {
  id: number;
  question: string;
  options: AnswerOption[];
}

interface UserAnswer {
  questionId: number;
  answerId: string;
}

interface Scores {
  certainty: number;
  speed: number;
}

const PersonalityType = {
  LAID_BACK: 'I',
  CONSERVATIVE: 'II',
  IMPULSIVE: 'III',
  AGGRESSIVE: 'IV',
  BALANCED: 'V',
  WANDERING: 'VI',
} as const;

type PersonalityType = typeof PersonalityType[keyof typeof PersonalityType];

// 权重映射
const LEVEL_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1,
};

/**
 * 计算用户的得分
 */
export const calculateScores = (
  answers: UserAnswer[],
  questions: Question[]
): Scores => {
  let certaintyRaw = 0;
  let speedRaw = 0;
  let certaintyMax = 0;
  let speedMax = 0;

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOption = question.options.find((opt) => opt.id === answer.answerId);
    if (!selectedOption) return;

    selectedOption.scores.forEach((score: ScoreModifier) => {
      const points = score.points;

      if (score.dimension === 'certainty') {
        certaintyRaw += LEVEL_WEIGHTS[score.level] * points;
        certaintyMax += LEVEL_WEIGHTS.high * 2;
      } else if (score.dimension === 'speed') {
        speedRaw += LEVEL_WEIGHTS[score.level] * points;
        speedMax += LEVEL_WEIGHTS.high * 2;
      }
    });
  });

  const certainty = certaintyMax > 0 ? Math.round((certaintyRaw / certaintyMax) * 100) : 0;
  const speed = speedMax > 0 ? Math.round((speedRaw / speedMax) * 100) : 0;

  return {
    certainty: Math.min(100, Math.max(0, certainty)),
    speed: Math.min(100, Math.max(0, speed)),
  };
};

/**
 * 根据得分判定人格类型
 */
export const determinePersonalityType = (scores: Scores): PersonalityType => {
  const { certainty, speed } = scores;

  if (certainty <= 40 && speed <= 40) {
    return PersonalityType.LAID_BACK;
  }

  if (certainty >= 60 && speed <= 40) {
    return PersonalityType.CONSERVATIVE;
  }

  if (certainty <= 40 && speed >= 60) {
    return PersonalityType.IMPULSIVE;
  }

  if (certainty >= 60 && speed >= 60) {
    return PersonalityType.AGGRESSIVE;
  }

  if (certainty > 40 && certainty < 60 && speed > 40 && speed < 60) {
    return PersonalityType.BALANCED;
  }

  return PersonalityType.WANDERING;
};

export const calculateVariance = (scores: number[]): number => {
  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  return variance;
};

// 导出类型供其他文件使用
export type { UserAnswer, Question, Scores, ScoreModifier, AnswerOption };
export { PersonalityType };
