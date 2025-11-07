function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        maxWidth: '500px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '20px' }}>
          你在焦虑社会的生存姿势是？
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          测试即将开始...
        </p>
        <button style={{
          backgroundColor: '#667eea',
          color: 'white',
          padding: '15px 40px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          开始测试
        </button>
      </div>
    </div>
  );
}

export default App;
