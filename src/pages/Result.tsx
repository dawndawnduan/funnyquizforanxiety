import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

// 内联TestResult类型
interface TestResult {
  scores: { certainty: number; speed: number };
  personalityType: string;
  profile: any;
}

const Result = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedResult = sessionStorage.getItem('quizResult');
    if (!savedResult) {
      navigate('/');
      return;
    }
    setResult(JSON.parse(savedResult));
  }, [navigate]);

  const handleGeneratePoster = async () => {
    if (!posterRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `${result?.profile.title}-测试结果.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('生成海报失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRestart = () => {
    sessionStorage.removeItem('quizResult');
    navigate('/');
  };

  if (!result) return null;

  const { scores, profile } = result;

  return (
    <div className="min-h-screen p-6 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* 结果卡片 */}
        <motion.div
          ref={posterRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-6"
        >
          {/* 头部 - 类型称号 */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-7xl mb-4"
            >
              {profile.emoji}
            </motion.div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: profile.color }}>
              {profile.title}
            </h1>
            <p className="text-xl text-gray-600">{profile.subtitle}</p>
          </div>

          {/* 两轴坐标条 */}
          <div className="space-y-4 mb-8">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">确定性</span>
                <span className="text-sm font-bold text-primary">{scores.certainty}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scores.certainty}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">速度</span>
                <span className="text-sm font-bold text-accent">{scores.speed}</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${scores.speed}%` }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="h-full bg-gradient-to-r from-accent to-secondary rounded-full"
                />
              </div>
            </div>
          </div>

          {/* 描述 */}
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>不确定性感知：</strong>
                {profile.description.uncertaintyPerception}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>速度习惯：</strong>
                {profile.description.speedHabit}
              </p>
            </div>
          </div>

          {/* 优势资本 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>✨</span>
              <span>优势资本</span>
            </h3>
            <ul className="space-y-2">
              {profile.strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-primary">•</span>
                  <span>{strength}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 注意点 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span>⚠️</span>
              <span>注意点</span>
            </h3>
            <ul className="space-y-2">
              {profile.cautions.map((caution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex items-start gap-2 text-gray-700"
                >
                  <span className="text-accent">•</span>
                  <span>{caution}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 搭子指南 */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-xl">
              <h4 className="font-bold mb-2 text-green-700">适合搭档</h4>
              {profile.idealPartners.map((partner, index) => (
                <p key={index} className="text-sm text-green-600">
                  • {partner}
                </p>
              ))}
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              <h4 className="font-bold mb-2 text-red-700">不太合适</h4>
              {profile.unsuitablePartners.map((partner, index) => (
                <p key={index} className="text-sm text-red-600">
                  • {partner}
                </p>
              ))}
            </div>
          </div>

          {/* 协作使用说明 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">🤝 协作使用说明</h3>
            <ul className="space-y-2">
              {profile.collaboration.map((tip, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* 底部信息 */}
          <div className="space-y-3 pt-6 border-t border-gray-200">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <p className="text-sm">
                <strong className="text-yellow-700">压力信号：</strong>
                <span className="text-gray-700">{profile.stressSignals}</span>
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl">
              <p className="text-sm">
                <strong className="text-blue-700">补能方式：</strong>
                <span className="text-gray-700">{profile.recharge}</span>
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl">
              <p className="text-sm">
                <strong className="text-purple-700">小习惯：</strong>
                <span className="text-gray-700">{profile.habit}</span>
              </p>
            </div>
          </div>

          {/* 分享金句 */}
          <div className="mt-6 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl text-center">
            <p className="text-lg font-bold text-primary">"{profile.shareQuote}"</p>
          </div>
        </motion.div>

        {/* 操作按钮 */}
        <div className="fixed bottom-6 left-6 right-6 max-w-2xl mx-auto flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="btn-secondary flex-1"
          >
            重新测试
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGeneratePoster}
            disabled={isGenerating}
            className="btn-primary flex-1"
          >
            {isGenerating ? '生成中...' : '生成海报'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Result;
