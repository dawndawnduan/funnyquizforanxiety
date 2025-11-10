import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden" style={{
      background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)'
    }}>
      {/* 星星背景 */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              imageRendering: 'pixelated'
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full"
      >
        {/* 像素装饰框 */}
        <div className="relative border-4 border-indigo-400 p-8 md:p-12" style={{
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(99, 102, 241, 0.1)',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(10px)'
        }}>
          {/* 四角像素装饰 */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-indigo-400" style={{ imageRendering: 'pixelated' }} />
          <div className="absolute top-0 right-0 w-4 h-4 bg-indigo-400" style={{ imageRendering: 'pixelated' }} />
          <div className="absolute bottom-0 left-0 w-4 h-4 bg-indigo-400" style={{ imageRendering: 'pixelated' }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-indigo-400" style={{ imageRendering: 'pixelated' }} />

          {/* 主标题 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-12 text-center text-white"
            style={{
              textShadow: '0 0 20px rgba(99, 102, 241, 0.8), 4px 4px 0px rgba(0, 0, 0, 0.5)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em',
              lineHeight: '1.3'
            }}
          >
            你在焦虑社会的
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #818cf8, #c084fc, #e879f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              生存姿势是？
            </span>
          </motion.h1>

          {/* 像素分隔线 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center gap-2 mb-10"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-indigo-400"
                style={{ imageRendering: 'pixelated' }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>

          {/* 副标题 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12 space-y-2 text-center"
          >
            <p className="text-lg md:text-xl text-indigo-300" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              有人卷出火花，有人卷成麻花
            </p>
            <p className="text-lg md:text-xl text-purple-300" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              有人躺平疗伤，有人稳中带浪
            </p>
            <p className="text-lg md:text-xl text-pink-300 font-medium mt-4" style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              你的生存姿势是哪一种？
            </p>
          </motion.div>

          {/* 像素飞船/火箭图标 */}
          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="flex justify-center mb-10"
          >
            <div className="relative">
              <span className="text-5xl" style={{ filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.6))' }}>
                🚀
              </span>
            </div>
          </motion.div>

          {/* 开始按钮 - 像素风格 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.8), 8px 8px 0px rgba(0, 0, 0, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/quiz')}
              className="relative px-12 py-4 bg-indigo-500 text-white font-bold text-lg border-4 border-indigo-300"
              style={{
                boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.5)',
                imageRendering: 'pixelated',
                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.5)'
              }}
            >
              [ 开始测试 ]
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-indigo-200"
              style={{
                fontFamily: 'monospace',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
              }}
            >
              &gt; 9道题 · 约1分钟
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* 浮动的像素云朵装饰 */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-8 bg-indigo-400 opacity-20"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{ imageRendering: 'pixelated', filter: 'blur(2px)' }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-12 h-6 bg-purple-400 opacity-20"
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ imageRendering: 'pixelated', filter: 'blur(2px)' }}
      />
    </div>
  );
};

export default Home;
