import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* 主标题 */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          color: '#000000',
          marginBottom: '40px',
          lineHeight: '1.3',
          letterSpacing: '-0.02em'
        }}>
          你在焦虑社会的<br />生存姿势是？
        </h1>

        {/* 副标题 */}
        <p style={{
          fontSize: '16px',
          color: '#4a4a4a',
          marginBottom: '60px',
          lineHeight: '1.8',
          fontWeight: '300'
        }}>
          有人卷出火花，有人卷成麻花<br />
          有人躺平疗伤，有人稳中带浪<br />
          你的生存姿势是哪一种？
        </p>

        {/* 开始按钮 */}
        <button
          onClick={() => navigate('/quiz')}
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '16px 48px',
            fontSize: '16px',
            fontWeight: '400',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.05em'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000000';
          }}
        >
          开始测试
        </button>

        {/* 提示文字 */}
        <p style={{
          marginTop: '24px',
          fontSize: '13px',
          color: '#999999',
          fontWeight: '300',
          letterSpacing: '0.05em'
        }}>
          9道题 · 约2分钟
        </p>
      </div>
    </div>
  );
};

export default Home;
