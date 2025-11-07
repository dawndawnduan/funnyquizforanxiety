import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  console.log('App-test-router rendering');

  return (
    <Router>
      <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
        <h1 style={{ color: 'blue' }}>路由测试成功</h1>
        <Routes>
          <Route path="/" element={<div>首页</div>} />
          <Route path="/quiz" element={<div>测试页</div>} />
          <Route path="/result" element={<div>结果页</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
