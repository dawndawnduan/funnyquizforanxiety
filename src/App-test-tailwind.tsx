import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  console.log('App-test-tailwind rendering');

  return (
    <Router>
      <div
        className="min-h-screen"
        style={{
          background: 'linear-gradient(to bottom right, #f8fafc, #faf5ff, #fce7f3)'
        }}
      >
        <div className="p-8">
          <h1 className="text-4xl font-bold text-primary mb-4">渐变测试</h1>
          <p className="text-gray-600">上面用内联样式，下面用Tailwind</p>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-secondary">这是粉色文字测试</p>
            <p className="text-accent">这是橙色文字测试</p>
          </div>
          <div className="mt-4 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg">
            <p className="text-white p-4">这是Tailwind默认渐变测试（蓝到紫）</p>
          </div>
          <Routes>
            <Route path="/" element={<div className="text-2xl mt-4">首页内容</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
