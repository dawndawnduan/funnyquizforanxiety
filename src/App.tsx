import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { recordVisit } from './utils/api';
import { Analytics } from '@vercel/analytics/react';

function App() {
  console.log('App rendering...');

  useEffect(() => {
    console.log('App mounted, recording visit');
    // 记录访问
    recordVisit();
  }, []);

  return (
    <>
      <Analytics />
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
