// 简化后的类型定义
interface ScoreValue {
  certainty: number;  // 0-10 直接分数
  speed: number;      // 0-10 直接分数
}

interface AnswerOption {
  id: string;
  text: string;
  scores: ScoreValue;
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
  certainty: number;  // 百分比 0-100
  speed: number;      // 百分比 0-100
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

/**
 * 计算用户的得分（简化版 - 动态最大值）
 * 每道题直接累加分数，转换为百分比：(总分 / 理论最大值) × 100
 * 理论最大值 = 每道题选项中的最高分之和
 */
export const calculateScores = (
  answers: UserAnswer[],
  questions: Question[]
): Scores => {
  let certaintyTotal = 0;
  let speedTotal = 0;
  let certaintyMax = 0;
  let speedMax = 0;

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOption = question.options.find((opt) => opt.id === answer.answerId);
    if (!selectedOption) return;

    // 直接累加分数
    certaintyTotal += selectedOption.scores.certainty;
    speedTotal += selectedOption.scores.speed;
  });

  // 计算每道题的理论最大值（取所有选项中的最高分）
  questions.forEach((question) => {
    const maxCertainty = Math.max(...question.options.map(opt => opt.scores.certainty));
    const maxSpeed = Math.max(...question.options.map(opt => opt.scores.speed));
    certaintyMax += maxCertainty;
    speedMax += maxSpeed;
  });

  // 转换为百分比
  const certainty = certaintyMax > 0 ? Math.round((certaintyTotal / certaintyMax) * 100) : 0;
  const speed = speedMax > 0 ? Math.round((speedTotal / speedMax) * 100) : 0;

  return {
    certainty: Math.min(100, Math.max(0, certainty)),
    speed: Math.min(100, Math.max(0, speed)),
  };
};

/**
 * 根据得分判定人格类型（边界：45/55）
 */
export const determinePersonalityType = (scores: Scores): PersonalityType => {
  const { certainty, speed } = scores;

  // 躺平派：低确定性 + 低速度
  if (certainty <= 45 && speed <= 45) {
    return PersonalityType.LAID_BACK;
  }

  // 保守派：高确定性 + 低速度
  if (certainty >= 55 && speed <= 45) {
    return PersonalityType.CONSERVATIVE;
  }

  // 发泄派：低确定性 + 高速度
  if (certainty <= 45 && speed >= 55) {
    return PersonalityType.IMPULSIVE;
  }

  // 激进派：高确定性 + 高速度
  if (certainty >= 55 && speed >= 55) {
    return PersonalityType.AGGRESSIVE;
  }

  // 平衡派：中等确定性 + 中等速度
  if (certainty > 45 && certainty < 55 && speed > 45 && speed < 55) {
    return PersonalityType.BALANCED;
  }

  // 游移派：其他所有情况
  return PersonalityType.WANDERING;
};

export const calculateVariance = (scores: number[]): number => {
  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance =
    scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  return variance;
};

// 导出类型供其他文件使用
export type { UserAnswer, Question, Scores, ScoreValue, AnswerOption };
export { PersonalityType };
