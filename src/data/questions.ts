// 内联类型定义，避免导入问题
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

export const questions: Question[] = [
  {
    id: 1,
    question: '起床后，你的默认动作是：',
    options: [
      {
        id: 'A',
        text: '再睡个回笼觉',
        scores: [
          { dimension: 'speed', level: 'low', points: 2 },
          { dimension: 'certainty', level: 'low', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '看今日日程，排优先级',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '直接开干，边做边定',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'high', points: 1 },
        ],
      },
      {
        id: 'D',
        text: '看心情，今天随缘',
        scores: [
          { dimension: 'certainty', level: 'low', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    question: '项目临时提前到今晚DDL，你会：',
    options: [
      {
        id: 'A',
        text: '核心清单+时间盒，稳住节奏',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '先冲一把，细节路上补',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'high', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '先吐槽两句再动手',
        scores: [
          { dimension: 'speed', level: 'high', points: 1 },
          { dimension: 'certainty', level: 'low', points: 2 },
        ],
      },
      {
        id: 'D',
        text: '能做就做，做不完就顺其自然',
        scores: [
          { dimension: 'speed', level: 'low', points: 2 },
          { dimension: 'certainty', level: 'low', points: 2 },
        ],
      },
    ],
  },
  {
    id: 3,
    question: '刷到同龄人的"喜报"，你更可能：',
    options: [
      {
        id: 'A',
        text: '点赞路过',
        scores: [
          { dimension: 'speed', level: 'low', points: 1 },
          { dimension: 'certainty', level: 'low', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '收藏并定个小目标',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '立刻报名同款挑战',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'high', points: 1 },
        ],
      },
      {
        id: 'D',
        text: '心里一紧：我是不是慢了',
        scores: [
          { dimension: 'certainty', level: 'low', points: 1 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
    ],
  },
  {
    id: 4,
    question: '群消息 99+，你的处理是：',
    options: [
      {
        id: 'A',
        text: '只回关键@，其余晚点',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '全部看完再回',
        scores: [
          { dimension: 'speed', level: 'low', points: 1 },
          { dimension: 'certainty', level: 'high', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '先回着再看',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'D',
        text: '把手机静音放在一边',
        scores: [
          { dimension: 'speed', level: 'low', points: 2 },
          { dimension: 'certainty', level: 'low', points: 1 },
        ],
      },
    ],
  },
  {
    id: 5,
    question: '周末最理想：',
    options: [
      {
        id: 'A',
        text: '无安排，自在回血',
        scores: [
          { dimension: 'speed', level: 'low', points: 2 },
          { dimension: 'certainty', level: 'low', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '有安排，劳逸结合',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '说走就走的小刺激',
        scores: [
          { dimension: 'speed', level: 'medium', points: 1 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'D',
        text: '副业/训练营/学习日',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'high', points: 1 },
        ],
      },
    ],
  },
  {
    id: 6,
    question: '若要换城工作：',
    options: [
      {
        id: 'A',
        text: '算了，安稳优先',
        scores: [
          { dimension: 'speed', level: 'low', points: 1 },
          { dimension: 'certainty', level: 'high', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '可以，先做攻略',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '好啊，边走边看',
        scores: [
          { dimension: 'speed', level: 'high', points: 1 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'D',
        text: '随缘，看机会',
        scores: [
          { dimension: 'certainty', level: 'low', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
    ],
  },
  {
    id: 7,
    question: '开会遇到分歧，你会：',
    options: [
      {
        id: 'A',
        text: '设定决策规则再推进',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '小步试错，先跑一版',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '情绪上头想速决',
        scores: [
          { dimension: 'speed', level: 'high', points: 1 },
          { dimension: 'certainty', level: 'low', points: 2 },
        ],
      },
      {
        id: 'D',
        text: '先缓缓，改天再说',
        scores: [
          { dimension: 'speed', level: 'low', points: 2 },
          { dimension: 'certainty', level: 'low', points: 1 },
        ],
      },
    ],
  },
  {
    id: 8,
    question: '常用工作流更像：',
    options: [
      {
        id: 'A',
        text: '复用模板+固定节拍',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
          { dimension: 'speed', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '实时捕捉灵感，边做边长',
        scores: [
          { dimension: 'speed', level: 'medium', points: 1 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'C',
        text: '先交付再完善',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'D',
        text: '看谁找我我就做谁的',
        scores: [
          { dimension: 'certainty', level: 'low', points: 2 },
          { dimension: 'speed', level: 'low', points: 1 },
        ],
      },
    ],
  },
  {
    id: 9,
    question: '你更在意哪句提醒：',
    options: [
      {
        id: 'A',
        text: '"慢就是稳"',
        scores: [
          { dimension: 'speed', level: 'low', points: 1 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'B',
        text: '"计划让心安"',
        scores: [
          { dimension: 'certainty', level: 'high', points: 2 },
        ],
      },
      {
        id: 'C',
        text: '"先行动再优化"',
        scores: [
          { dimension: 'speed', level: 'high', points: 2 },
          { dimension: 'certainty', level: 'medium', points: 1 },
        ],
      },
      {
        id: 'D',
        text: '"一切随缘就好"',
        scores: [
          { dimension: 'certainty', level: 'low', points: 2 },
        ],
      },
    ],
  },
];
