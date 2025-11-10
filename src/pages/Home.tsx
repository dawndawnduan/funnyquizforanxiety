import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* 主标题 */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
        >
          你在焦虑社会的<br />生存姿势是？
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-12 leading-relaxed"
        >
          有人卷出火花，有人卷成麻花<br />
          有人躺平疗伤，有人稳中带浪<br />
          <span className="text-primary font-medium">你的生存姿势是哪一种？</span>
        </motion.p>

        {/* 装饰图标 */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-8"
        >
          🤔
        </motion.div>

        {/* 开始按钮 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/quiz')}
          className="btn-primary w-full text-lg py-4"
        >
          开始测试
        </motion.button>

        {/* 提示文字 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-sm text-gray-400"
        >
          9道题 · 约1分钟
        </motion.p>
      </motion.div>

      {/* 底部装饰 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
