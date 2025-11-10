import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        {/* 主标题 - 更简约 */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-6 text-dark tracking-tight"
        >
          你在焦虑社会的
          <br />
          生存姿势是？
        </motion.h1>

        {/* 副标题 - 精简 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base text-gray-500 mb-16 font-light"
        >
          9道题 · 约1分钟
        </motion.p>

        {/* 开始按钮 - 更简约 */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/quiz')}
          className="w-full max-w-xs mx-auto px-12 py-4 bg-dark text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
        >
          开始测试
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
