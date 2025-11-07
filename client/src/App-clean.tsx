import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home-minimal';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { recordVisit } from './utils/api';

function App() {
  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
