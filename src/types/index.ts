// 分数修改器
export interface ScoreModifier {
  dimension: 'certainty' | 'speed';
  level: 'high' | 'medium' | 'low';
  points: number;
}

// 答案选项
export interface AnswerOption {
  id: string;
  text: string;
  scores: ScoreModifier[];
}

// 问题
export interface Question {
  id: number;
  question: string;
  options: AnswerOption[];
}

// 用户答案
export interface UserAnswer {
  questionId: number;
  answerId: string;
}

// 得分维度
export interface Scores {
  certainty: number;
  speed: number;
}

// 人格类型枚举
export enum PersonalityType {
  LAID_BACK = 'I',
  CONSERVATIVE = 'II',
  IMPULSIVE = 'III',
  AGGRESSIVE = 'IV',
  BALANCED = 'V',
  WANDERING = 'VI',
}

// 人格类型详情
export interface PersonalityProfile {
  type: PersonalityType;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  description: {
    uncertaintyPerception: string;
    speedHabit: string;
    triggers: string;
  };
  strengths: string[];
  cautions: string[];
  suitableFor: string;
  idealPartners: string[];
  unsuitablePartners: string[];
  collaboration: string[];
  stressSignals: string;
  recharge: string;
  habit: string;
  shareQuote: string;
}

// 测试结果
export interface TestResult {
  scores: Scores;
  personalityType: PersonalityType;
  profile: PersonalityProfile;
}
