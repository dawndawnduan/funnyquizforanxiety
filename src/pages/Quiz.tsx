import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import type { UserAnswer } from '../utils/calculator';
import { calculateScores, determinePersonalityType } from '../utils/calculator';
import { getPersonalityProfile } from '../data/personalities';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        answerId: selectedOption,
      },
    ];

    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      // 计算结果
      const scores = calculateScores(newAnswers, questions);
      const personalityType = determinePersonalityType(scores);
      const profile = getPersonalityProfile(personalityType);

      // 保存结果到 sessionStorage
      sessionStorage.setItem(
        'quizResult',
        JSON.stringify({ scores, personalityType, profile })
      );

      // 跳转到结果页
      navigate('/result');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
      const lastAnswer = answers[currentQuestionIndex - 1];
      setSelectedOption(lastAnswer?.answerId || '');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      {/* 进度条 */}
      <div className="max-w-md w-full mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 问题卡片 */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-md w-full"
          >
            {/* 问题 */}
            <h2 className="text-2xl font-bold text-dark mb-8 text-center">
              {currentQuestion.question}
            </h2>

            {/* 选项 */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedOption === option.id
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                        selectedOption === option.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {option.id}
                    </div>
                    <span
                      className={`flex-1 ${
                        selectedOption === option.id ? 'text-primary font-medium' : 'text-dark'
                      }`}
                    >
                      {option.text}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 操作按钮 */}
      <div className="max-w-md w-full mx-auto mt-8 flex gap-4">
        {currentQuestionIndex > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="btn-secondary flex-1"
          >
            上一题
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: selectedOption ? 1.05 : 1 }}
          whileTap={{ scale: selectedOption ? 0.95 : 1 }}
          onClick={handleNext}
          disabled={!selectedOption}
          className={`btn-primary flex-1 ${
            !selectedOption ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? '查看结果' : '下一题'}
        </motion.button>
      </div>
    </div>
  );
};

export default Quiz;
