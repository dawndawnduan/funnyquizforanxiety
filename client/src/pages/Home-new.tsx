import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        你在焦虑社会的<br />生存姿势是？
      </h1>

      <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px', lineHeight: '1.8' }}>
        有人卷出火花，有人卷成麻花<br />
        有人躺平疗伤，有人稳中带浪<br />
        <span style={{ color: '#6366f1', fontWeight: 'bold' }}>你的生存姿势是哪一种？</span>
      </p>

      <div style={{ fontSize: '60px', marginBottom: '30px' }}>🤔</div>

      <button
        onClick={() => navigate('/quiz')}
        style={{
          backgroundColor: '#6366f1',
          color: 'white',
          padding: '16px 60px',
          fontSize: '18px',
          borderRadius: '30px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        开始测试
      </button>

      <p style={{ marginTop: '24px', fontSize: '14px', color: '#999' }}>
        9道题 · 约2分钟
      </p>
    </div>
  );
};

export default Home;
