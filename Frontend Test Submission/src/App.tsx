import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UrlShortenerPage from './pages/URLShortener';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shorten" element={<UrlShortenerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
