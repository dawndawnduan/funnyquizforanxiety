import { useState } from 'react';

function App() {
  const [page, setPage] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // 9道完整题目
  const questions = [
    {
      q: '起床后，你的默认动作是：',
      opts: [
        { text: '再睡个回笼觉', scores: { speed: 2, certainty: 1 } },
        { text: '看今日日程，排优先级', scores: { speed: 1, certainty: 2 } },
        { text: '直接开干，边做边定', scores: { speed: 2, certainty: 2 } },
        { text: '看心情，今天随缘', scores: { speed: 1, certainty: 1 } }
      ]
    },
    {
      q: '项目临时提前到今晚DDL，你会：',
      opts: [
        { text: '核心清单+时间表，稳住节奏', scores: { speed: 1, certainty: 2 } },
        { text: '先冲一把，细节路上补', scores: { speed: 2, certainty: 1 } },
        { text: '先吐槽两句再动手', scores: { speed: 1, certainty: 1 } },
        { text: '能做就做，做不完就顺其自然', scores: { speed: 1, certainty: 0 } }
      ]
    },
    {
      q: '刷到同龄人的"喜报"，你更可能：',
      opts: [
        { text: '点赞路过', scores: { speed: 0, certainty: 0 } },
        { text: '收藏并定个小目标', scores: { speed: 1, certainty: 2 } },
        { text: '立刻报名同款挑战', scores: { speed: 2, certainty: 1 } },
        { text: '心里一紧：我是不是慢了', scores: { speed: 1, certainty: 0 } }
      ]
    },
    {
      q: '群消息 99+，你的处理是：',
      opts: [
        { text: '只回关键@，其余晚点', scores: { speed: 1, certainty: 2 } },
        { text: '全部看完再回', scores: { speed: 0, certainty: 1 } },
        { text: '先回着再看', scores: { speed: 2, certainty: 1 } },
        { text: '把手机静音放在一边', scores: { speed: 0, certainty: 0 } }
      ]
    },
    {
      q: '周末最理想：',
      opts: [
        { text: '无安排，自在回血', scores: { speed: 0, certainty: 0 } },
        { text: '有安排，但是需要劳逸结合', scores: { speed: 1, certainty: 2 } },
        { text: '说走就走的小刺激', scores: { speed: 1, certainty: 1 } },
        { text: '副业/训练营/学习日', scores: { speed: 2, certainty: 2 } }
      ]
    },
    {
      q: '如果要你换一个城市工作，你会？',
      opts: [
        { text: '算了吧，当下安稳最重要', scores: { speed: 0, certainty: 1 } },
        { text: '可以，先做攻略', scores: { speed: 1, certainty: 2 } },
        { text: '好啊，边走边看', scores: { speed: 2, certainty: 1 } },
        { text: '随缘，看机会', scores: { speed: 1, certainty: 0 } }
      ]
    },
    {
      q: '开会遇到分歧，你会：',
      opts: [
        { text: '设定决策规则再推进', scores: { speed: 1, certainty: 2 } },
        { text: '小步试错，先跑一版', scores: { speed: 2, certainty: 1 } },
        { text: '情绪上头想速决', scores: { speed: 2, certainty: 0 } },
        { text: '先缓缓，改天再说', scores: { speed: 0, certainty: 0 } }
      ]
    },
    {
      q: '常用工作流更像：',
      opts: [
        { text: '复用模板+固定节拍', scores: { speed: 1, certainty: 2 } },
        { text: '实时捕捉灵感，边做边长', scores: { speed: 1, certainty: 1 } },
        { text: '先交付再完善', scores: { speed: 2, certainty: 1 } },
        { text: '看谁找我我就做谁的', scores: { speed: 0, certainty: 0 } }
      ]
    },
    {
      q: '你更在意哪句提醒：',
      opts: [
        { text: '"慢就是稳"', scores: { speed: 0, certainty: 1 } },
        { text: '"计划让心安"', scores: { speed: 1, certainty: 2 } },
        { text: '"先行动再优化"', scores: { speed: 2, certainty: 1 } },
        { text: '"一切随缘就好"', scores: { speed: 0, certainty: 0 } }
      ]
    }
  ];

  // 完整的6种人格类型
  const personalities = {
    '躺平派': {
      subtitle: '佛系随缘',
      emoji: '🛋️',
      desc: '以"留白"对抗外部噪音，重视心境稳定与生活弹性。',
      perception: '把未来看作"开放式结局"，接受随机性，抗过度规划。',
      speedHabit: '自然节拍，先稳后动；优先恢复，再行动。',
      strengths: ['情绪稳定、压不垮', '能长时间守住底线与边界', '对复杂环境的"降噪"能力强'],
      cautions: ['行动窗口可能错过', '机会筛选成本高', '长项目里需要外部节拍'],
      suitable: '守盘类、照护类、精细复核、稳定社区运营、备份/兜底位',
      partners: { ideal: ['保守派（给节拍）', '平衡派（控能量）'], avoid: ['激进派（推进差异大）'] },
      collaboration: ['给清晰"起—止"边界与最小交付', '少打断，设置固定同步点', '让你决定节奏中的"休止符"'],
      stress: '逃避沟通、信息静音、拖延增多',
      recharge: '高质量睡眠、单人低刺激活动、离线日',
      habit: '每日一件"最小可完成任务（MIT）"；每周一次"重置日"',
      quote: '我不是躺，是在给生活留白'
    },
    '保守派': {
      subtitle: '稳健守成',
      emoji: '🛡️',
      desc: '用秩序感换安心，以稳定复利战胜焦虑。',
      perception: '把可控当安全底盘，偏好可预期路径。',
      speedHabit: '慢即是快；分段推进，按图施工。',
      strengths: ['计划力与风险识别强', '可持续交付，可信度高', '复盘迭代意识扎实'],
      cautions: ['面对突发"有点慢热"', '对模糊与探索型任务兴趣有限', '容易把标准拉得过细'],
      suitable: '流程优化、质量管理、合规/风控、长周期项目管理、文档/知识库',
      partners: { ideal: ['平衡派（协调多方）', '激进派（加一点速度）'], avoid: ['发泄派（情绪与节奏波动大）'] },
      collaboration: ['预先对齐"验收标准+里程碑"', '变更多给前置通知与过渡期', '让你负责"标准与收尾"'],
      stress: '频繁确认、过度做计划、对不确定议题回避',
      recharge: '整理空间、拆小目标、完成清单',
      habit: '每日3格"可交付进度条"；每周固定复盘30分钟',
      quote: '不快，但从不掉链子'
    },
    '发泄派': {
      subtitle: '燃尽爆发',
      emoji: '⚡',
      desc: '把情绪当燃料，在临场中产出爆发式成果。',
      perception: '对不确定既敏感也好奇，喜欢即兴与舞台感。',
      speedHabit: '先上车再补票；短冲刺，强反馈。',
      strengths: ['高压创意与即兴解决力', '带动氛围、点燃团队', '关键节点的"救火"能力'],
      cautions: ['节奏起伏，易疲惫', '成果沉淀感偏弱', '受环境与同伴能量影响大'],
      suitable: '市场/传播节点战、活动现场、0→1概念打样、危机应对、短视频/直播',
      partners: { ideal: ['保守派（落地控质）', '平衡派（调速器）'], avoid: ['激进派（互相加速易过载）'] },
      collaboration: ['定义"短跑赛道+明确终点线"', '允许表达与试错', '配一个"沉淀负责人"'],
      stress: '作息打乱、输出—断电—自责循环',
      recharge: '运动、音乐、人群共振、小胜利',
      habit: '每次冲刺后强制15分钟复盘，留下3个可复用素材',
      quote: '我不是情绪化，是高功率模式'
    },
    '激进派': {
      subtitle: '目标达人',
      emoji: '🚀',
      desc: '以清晰目标驯服不确定，用执行把速度变成果。',
      perception: '倾向把不确定"结构化"；先定方向，再压缩路径。',
      speedHabit: '快试快改，里程碑驱动。',
      strengths: ['方向感强、资源调动力强', '决策果断，愿意承担责任', '持续迭代，结果导向'],
      cautions: ['易忽略团队情绪与恢复', '过度加速可能降低创造性', '目标切换过频会稀释聚焦'],
      suitable: 'OKR落地、增长/销售冲刺、产品试点、跨部门推进、结果型项目负责人',
      partners: { ideal: ['平衡派（控速）', '保守派（补稳）'], avoid: ['躺平派（节奏跨度过大）'] },
      collaboration: ['对齐成功定义与"停表点"', '预留缓冲区与冷却期', '让你负责"切入—推进—闭环"的主链路'],
      stress: '加任务顶上、日程密不透风、对低效强烈不耐',
      recharge: '阶段性目标达成的"仪式"、力量训练、短假',
      habit: '每日"3—1—0.5"法：3个推进、1个协同、0.5个复盘',
      quote: '不是卷，是把目标做清楚'
    },
    '平衡派': {
      subtitle: '从容中庸',
      emoji: '⚖️',
      desc: '在张弛之间找最优解，做团队的"节奏调音师"。',
      perception: '既看趋势也看当下，能在矛盾中做动态取舍。',
      speedHabit: '控速能力强，能"换挡"；避免极端。',
      strengths: ['调和冲突、促进共识', '资源配置感和节奏掌控强', '可在多任务中维持韧性'],
      cautions: ['容易被误读为"骑墙"', '在高不确定新探索里需要更明确授权', '决断速度可能略慢'],
      suitable: '跨部门协同、项目统筹、社区/产品运营、复杂场景控速官',
      partners: { ideal: ['激进派（共赢）', '保守派（稳态）'], avoid: ['游移派（一起摇摆）'] },
      collaboration: ['明确你拥有"节奏控制权"', '给足信息透明度', '让你做优先级仲裁'],
      stress: '信息过载、来回协调过多、决策疲劳',
      recharge: '独处时间、把碎事打包处理、轻户外',
      habit: '每天固定两个"断点时段"（不被打扰的深度时间）',
      quote: '节奏对了，事就顺了'
    },
    '游移派': {
      subtitle: '混沌流浪',
      emoji: '🌊',
      desc: '以灵活拥抱变化，凭敏感捕捉机会。',
      perception: '对趋势特别敏感，愿意在模糊处试水。',
      speedHabit: '阶段冲刺＋阶段休整，易受外部节奏牵引。',
      strengths: ['快速上手、跨域迁移能力', '点子多、机会识别准', '在新场景里迭代速度快'],
      cautions: ['节奏与注意力分散', '容易被热点牵着走', '需要"锚点"与最小标准'],
      suitable: '探索型课题、前期调研、趋势捕捉、增长试验池、跨界协作',
      partners: { ideal: ['平衡派', '保守派（提供锚点与复盘）'], avoid: ['发泄派（能量同频易过载）'] },
      collaboration: ['先约定"最低可交付标准+时间盒"', '给你一个固定对齐人和固定节拍', '允许你在子任务里"自由切换"'],
      stress: '开新快、收尾慢；频繁换目标',
      recharge: '换场景工作、短途移动、阶段性小奖赏',
      habit: '每天两个25分钟的"收尾块"，只做收尾',
      quote: '我不是飘，是对风向更灵'
    }
  };

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPage('result');
    }
  };

  const getResult = () => {
    let speedTotal = 0;
    let certaintyTotal = 0;

    answers.forEach((answerIdx, qIdx) => {
      const scores = questions[qIdx].opts[answerIdx].scores;
      speedTotal += scores.speed;
      certaintyTotal += scores.certainty;
    });

    const speedAvg = Math.round((speedTotal / (questions.length * 2)) * 100);
    const certaintyAvg = Math.round((certaintyTotal / (questions.length * 2)) * 100);

    // 判定类型
    if (certaintyAvg <= 40 && speedAvg <= 40) return '躺平派';
    if (certaintyAvg >= 60 && speedAvg <= 40) return '保守派';
    if (certaintyAvg <= 40 && speedAvg >= 60) return '发泄派';
    if (certaintyAvg >= 60 && speedAvg >= 60) return '激进派';
    if (certaintyAvg > 40 && certaintyAvg < 60 && speedAvg > 40 && speedAvg < 60) return '平衡派';
    return '游移派';
  };

  // 首页
  if (page === 'home') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
      }}>
        <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '600',
            color: '#000000',
            marginBottom: '40px',
            lineHeight: '1.3',
            letterSpacing: '-0.02em'
          }}>
            你在<span style={{ fontWeight: '800', letterSpacing: '-0.03em' }}>焦虑</span>社会的<br />生存姿势是？
          </h1>
          <p style={{
            fontSize: '17px',
            color: '#666666',
            marginBottom: '60px',
            lineHeight: '1.8',
            fontWeight: '400'
          }}>
            有人卷出火花，有人卷成麻花<br />
            有人躺平疗伤，有人稳中带浪<br />
            你的生存姿势是哪一种？
          </p>
          <button
            onClick={() => setPage('quiz')}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '18px 56px',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              letterSpacing: '0.1em',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
          >
            开始测试
          </button>
          <p style={{
            marginTop: '24px',
            fontSize: '14px',
            color: '#999999',
            fontWeight: '300',
            letterSpacing: '0.05em'
          }}>
            9道题 · 约2分钟
          </p>
          {/* 访问统计 */}
          <div style={{
            marginTop: '40px',
            fontSize: '12px',
            color: '#cccccc',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <span>
              访问量: <span id="busuanzi_value_site_pv">-</span>
            </span>
            <span>
              访客数: <span id="busuanzi_value_site_uv">-</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 测试页
  if (page === 'quiz') {
    const q = questions[currentQ];
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: '60px 20px 40px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* 进度 */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '50px',
            fontSize: '14px',
            color: '#999999',
            fontWeight: '400'
          }}>
            <span>题目 {currentQ + 1} / {questions.length}</span>
            <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
          </div>

          {/* 题目 */}
          <h2 style={{
            fontSize: '28px',
            fontWeight: '500',
            color: '#000000',
            marginBottom: '50px',
            lineHeight: '1.5',
            letterSpacing: '-0.01em'
          }}>
            {q.q}
          </h2>

          {/* 选项 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {q.opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                style={{
                  padding: '24px 28px',
                  textAlign: 'left',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e0e0e0',
                  cursor: 'pointer',
                  fontSize: '17px',
                  fontWeight: '400',
                  color: '#333333',
                  transition: 'all 0.25s',
                  lineHeight: '1.6',
                  letterSpacing: '0.01em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.borderColor = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 结果页
  const type = getResult();
  const profile = personalities[type as keyof typeof personalities];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '30px 20px 50px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* 顶部卡片 - 类型 + 描述 */}
        <div style={{
          padding: '28px 24px',
          backgroundColor: '#000000',
          color: '#ffffff',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, #ffffff 0%, #666666 100%)'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <div style={{ fontSize: '48px', lineHeight: 1 }}>{profile.emoji}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '600',
                margin: 0,
                marginBottom: '4px',
                letterSpacing: '-0.02em'
              }}>
                {type}
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#aaaaaa',
                margin: 0,
                fontWeight: '400',
                letterSpacing: '0.05em'
              }}>
                {profile.subtitle}
              </p>
            </div>
          </div>

          <p style={{
            fontSize: '13px',
            lineHeight: '1.6',
            margin: 0,
            color: '#d0d0d0',
            fontWeight: '400'
          }}>
            {profile.desc}
          </p>
        </div>

        {/* 核心特质 - 两栏卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <Card icon="🎯" title="不确定性感知" content={profile.perception} />
          <Card icon="⚡" title="速度习惯" content={profile.speedHabit} />
        </div>

        {/* 优势 & 注意点 - 紧凑布局 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <CompactList title="优势资本" items={profile.strengths} color="#000000" bg="#f9f9f9" />
          <CompactList title="注意点" items={profile.cautions} color="#666666" bg="#f5f5f5" />
        </div>

        {/* 擅长任务 */}
        <div style={{
          padding: '14px 18px',
          backgroundColor: '#fafafa',
          marginBottom: '12px',
          borderLeft: '3px solid #000000'
        }}>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#000', marginBottom: '6px', letterSpacing: '0.02em' }}>
            擅长任务
          </h3>
          <p style={{ fontSize: '12px', color: '#333', lineHeight: '1.6', margin: 0, fontWeight: '400' }}>
            {profile.suitable}
          </p>
        </div>

        {/* 搭子指南 - 横向紧凑 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '14px 16px', backgroundColor: '#f0fdf4', borderLeft: '3px solid #22c55e' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a', marginBottom: '8px' }}>
              ✓ 理想搭子
            </div>
            {profile.partners.ideal.map((p, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#166534', marginBottom: '4px', fontWeight: '400', lineHeight: '1.4' }}>
                {p}
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 16px', backgroundColor: '#fef2f2', borderLeft: '3px solid #ef4444' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#dc2626', marginBottom: '8px' }}>
              × 不太合适
            </div>
            {profile.partners.avoid.map((p, i) => (
              <div key={i} style={{ fontSize: '11px', color: '#991b1b', marginBottom: '4px', fontWeight: '400', lineHeight: '1.4' }}>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* 协作说明 - 紧凑版 */}
        <div style={{
          padding: '14px 18px',
          backgroundColor: '#fafafa',
          marginBottom: '12px'
        }}>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#000', marginBottom: '8px' }}>
            协作使用说明
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {profile.collaboration.map((c, i) => (
              <div key={i} style={{
                fontSize: '11px',
                color: '#333',
                lineHeight: '1.5',
                fontWeight: '400',
                paddingLeft: '14px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0, color: '#999', fontSize: '10px' }}>{i + 1}.</span>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* 底部信息栏 - 紧凑网格 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          <InfoCard icon="⚡" label="压力信号" value={profile.stress} />
          <InfoCard icon="🔋" label="补能方式" value={profile.recharge} />
          <InfoCard icon="📌" label="小习惯" value={profile.habit} />
        </div>

        {/* 金句 */}
        <div style={{
          padding: '22px 20px',
          backgroundColor: '#000000',
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '24px',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '40px',
            position: 'absolute',
            top: '8px',
            left: '16px',
            opacity: 0.12,
            fontFamily: 'Georgia, serif'
          }}>"</div>
          <p style={{
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '1.5',
            margin: 0,
            letterSpacing: '0.02em',
            position: 'relative',
            zIndex: 1
          }}>
            {profile.quote}
          </p>
        </div>

        {/* 重新测试按钮 */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setPage('home');
              setCurrentQ(0);
              setAnswers([]);
            }}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '14px 40px',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              letterSpacing: '0.1em',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
}

// 辅助组件
function Card({ icon, title, content }: { icon: string; title: string; content: string }) {
  return (
    <div style={{
      padding: '14px 16px',
      backgroundColor: '#fafafa',
      borderTop: '2px solid #000000'
    }}>
      <div style={{ fontSize: '20px', marginBottom: '8px' }}>{icon}</div>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#000', marginBottom: '6px', letterSpacing: '0.02em' }}>
        {title}
      </h3>
      <p style={{ fontSize: '11px', color: '#333', lineHeight: '1.6', margin: 0, fontWeight: '400' }}>
        {content}
      </p>
    </div>
  );
}

function CompactList({ title, items, color, bg }: { title: string; items: string[]; color: string; bg: string }) {
  return (
    <div style={{ padding: '14px 16px', backgroundColor: bg }}>
      <h3 style={{ fontSize: '12px', fontWeight: '600', color: color, marginBottom: '8px', letterSpacing: '0.02em' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {items.map((item, i) => (
          <div key={i} style={{
            fontSize: '11px',
            color: color === '#000000' ? '#333' : '#666',
            lineHeight: '1.5',
            fontWeight: '400',
            paddingLeft: '10px',
            position: 'relative'
          }}>
            <span style={{ position: 'absolute', left: 0, fontSize: '9px' }}>•</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div style={{
      padding: '12px',
      backgroundColor: '#fafafa',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '20px', marginBottom: '6px' }}>{icon}</div>
      <div style={{ fontSize: '10px', fontWeight: '600', color: '#999', marginBottom: '4px', letterSpacing: '0.05em' }}>
        {label}
      </div>
      <div style={{ fontSize: '10px', color: '#333', lineHeight: '1.4', fontWeight: '400' }}>
        {value}
      </div>
    </div>
  );
}

export default App;
