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

export const questions: Question[] = [
  {
    id: 1,
    question: '起床后，你的默认动作是：',
    options: [
      {
        id: 'A',
        text: '再睡个回笼觉',
        scores: { certainty: 1, speed: 1 },
      },
      {
        id: 'B',
        text: '看今日日程，排优先级',
        scores: { certainty: 5, speed: 2 },
      },
      {
        id: 'C',
        text: '直接开干，边做边定',
        scores: { certainty: 3, speed: 5 },
      },
      {
        id: 'D',
        text: '看心情，今天随缘',
        scores: { certainty: 1, speed: 5 },
      },
    ],
  },
  {
    id: 2,
    question: '项目临时提前到今晚DDL，你会：',
    options: [
      {
        id: 'A',
        text: '核心清单+时间表，稳住节奏',
        scores: { certainty: 5, speed: 3 },
      },
      {
        id: 'B',
        text: '先冲一把，细节路上补',
        scores: { certainty: 3, speed: 5 },
      },
      {
        id: 'C',
        text: '先吐槽两句再动手',
        scores: { certainty: 1, speed: 3 },
      },
      {
        id: 'D',
        text: '能做就做，做不完就顺其自然',
        scores: { certainty: 2, speed: 2 },
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
        scores: { certainty: 1, speed: 1 },
      },
      {
        id: 'B',
        text: '收藏并定个小目标',
        scores: { certainty: 4, speed: 2 },
      },
      {
        id: 'C',
        text: '立刻报名同款挑战',
        scores: { certainty: 3, speed: 5 },
      },
      {
        id: 'D',
        text: '心里一紧：我是不是慢了',
        scores: { certainty: 2, speed: 1 },
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
        scores: { certainty: 4, speed: 2 },
      },
      {
        id: 'B',
        text: '全部看完再回',
        scores: { certainty: 5, speed: 1 },
      },
      {
        id: 'C',
        text: '先回着再看',
        scores: { certainty: 2, speed: 5 },
      },
      {
        id: 'D',
        text: '把手机静音放在一边',
        scores: { certainty: 1, speed: 1 },
      },
    ],
  },
  {
    id: 5,
    question: '周末最理想的度过方式：',
    options: [
      {
        id: 'A',
        text: '无安排，自在回血',
        scores: { certainty: 1, speed: 1 },
      },
      {
        id: 'B',
        text: '有安排，劳逸结合',
        scores: { certainty: 3, speed: 2 },
      },
      {
        id: 'C',
        text: '说走就走的小惊喜',
        scores: { certainty: 1, speed: 4 },
      },
      {
        id: 'D',
        text: '副业/训练营/学习日',
        scores: { certainty: 5, speed: 5 },
      },
    ],
  },
  {
    id: 6,
    question: '如果有更好的工作机会，但是需要你换一个城市工作，你会？：',
    options: [
      {
        id: 'A',
        text: '算了，安稳优先',
        scores: { certainty: 5, speed: 1 },
      },
      {
        id: 'B',
        text: '先犹豫三天做调查，然后再去商谈',
        scores: { certainty: 3, speed: 2 },
      },
      {
        id: 'C',
        text: '好啊，换个环境挺好的',
        scores: { certainty: 1, speed: 5 },
      },
      {
        id: 'D',
        text: '哪里都一样，无所谓',
        scores: { certainty: 1, speed: 2 },
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
        scores: { certainty: 5, speed: 2 },
      },
      {
        id: 'B',
        text: '小步试错，先跑一版',
        scores: { certainty: 3, speed: 4 },
      },
      {
        id: 'C',
        text: '情绪上头想速决',
        scores: { certainty: 1, speed: 4 },
      },
      {
        id: 'D',
        text: '先缓缓，改天再说',
        scores: { certainty: 1, speed: 1 },
      },
    ],
  },
  {
    id: 8,
    question: '平时的工作方式更像：',
    options: [
      {
        id: 'A',
        text: '复用模板+固定节拍',
        scores: { certainty: 5, speed: 3 },
      },
      {
        id: 'B',
        text: '实时捕捉灵感，边做边定',
        scores: { certainty: 3, speed: 3 },
      },
      {
        id: 'C',
        text: '先交付再完善',
        scores: { certainty: 2, speed: 5 },
      },
      {
        id: 'D',
        text: '看谁找我我就做谁的',
        scores: { certainty: 1, speed: 2 },
      },
    ],
  },
  {
    id: 9,
    question: '你更喜欢哪句提醒：',
    options: [
      {
        id: 'A',
        text: '"慢就是稳"',
        scores: { certainty: 3, speed: 1 },
      },
      {
        id: 'B',
        text: '"计划让心安"',
        scores: { certainty: 5, speed: 2 },
      },
      {
        id: 'C',
        text: '"先行动再优化"',
        scores: { certainty: 2, speed: 5 },
      },
      {
        id: 'D',
        text: '"一切随缘就好"',
        scores: { certainty: 1, speed: 1 },
      },
    ],
  },
];
