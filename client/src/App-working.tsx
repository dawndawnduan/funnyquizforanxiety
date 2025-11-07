import { useState } from 'react';

function App() {
  const [page, setPage] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // 9道题目（简化版）
  const questions = [
    { q: '起床后，你的默认动作是：', opts: ['A. 再睡个回笼觉', 'B. 看今日日程', 'C. 直接开干', 'D. 看心情随缘'] },
    { q: '项目临时提前DDL，你会：', opts: ['A. 核心清单+时间盒', 'B. 先冲一把', 'C. 先吐槽两句', 'D. 能做就做'] },
    { q: '刷到同龄人喜报，你会：', opts: ['A. 点赞路过', 'B. 收藏定目标', 'C. 立刻报名挑战', 'D. 心里一紧'] },
    { q: '群消息99+，你会：', opts: ['A. 只回关键@', 'B. 全部看完', 'C. 先回着再看', 'D. 手机静音'] },
    { q: '周末最理想：', opts: ['A. 无安排回血', 'B. 有安排劳逸', 'C. 说走就走', 'D. 副业学习'] },
    { q: '若要换城工作：', opts: ['A. 算了安稳优先', 'B. 可以先做攻略', 'C. 好啊边走边看', 'D. 随缘看机会'] },
    { q: '开会遇到分歧：', opts: ['A. 设定决策规则', 'B. 小步试错', 'C. 情绪上头速决', 'D. 先缓缓改天说'] },
    { q: '常用工作流：', opts: ['A. 复用模板', 'B. 实时捕捉灵感', 'C. 先交付再完善', 'D. 看谁找我做谁的'] },
    { q: '你更在意：', opts: ['A. 慢就是稳', 'B. 计划让心安', 'C. 先行动再优化', 'D. 一切随缘'] },
  ];

  const types = ['躺平派', '保守派', '发泄派', '激进派', '平衡派', '游移派'];

  const handleAnswer = (opt: string) => {
    const newAnswers = [...answers, opt];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPage('result');
    }
  };

  const getResult = () => {
    const aCount = answers.filter(a => a.startsWith('A')).length;
    if (aCount >= 5) return types[0];
    if (aCount >= 3) return types[1];
    return types[Math.floor(Math.random() * types.length)];
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
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'
      }}>
        <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '300',
            color: '#000000',
            marginBottom: '40px',
            lineHeight: '1.3'
          }}>
            你在焦虑社会的<br />生存姿势是？
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666666',
            marginBottom: '60px',
            lineHeight: '1.8'
          }}>
            有人卷出火花，有人卷成麻花<br />
            有人躺平疗伤，有人稳中带浪
          </p>
          <button
            onClick={() => setPage('quiz')}
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '16px 48px',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '400',
              letterSpacing: '0.1em'
            }}
          >
            开始测试
          </button>
          <p style={{
            marginTop: '24px',
            fontSize: '13px',
            color: '#999999'
          }}>
            9道题 · 约2分钟
          </p>
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
        padding: '40px 20px',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            marginBottom: '40px',
            fontSize: '14px',
            color: '#999999'
          }}>
            {currentQ + 1} / {questions.length}
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '400',
            color: '#000000',
            marginBottom: '40px'
          }}>
            {q.q}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {q.opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.charAt(0))}
                style={{
                  padding: '20px',
                  textAlign: 'left',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#333333',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 结果页
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '40px 20px',
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          color: '#000000',
          marginBottom: '20px'
        }}>
          {getResult()}
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666666',
          marginBottom: '60px'
        }}>
          这就是你的生存姿势
        </p>
        <button
          onClick={() => {
            setPage('home');
            setCurrentQ(0);
            setAnswers([]);
          }}
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '16px 48px',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          重新测试
        </button>
      </div>
    </div>
  );
}

export default App;
