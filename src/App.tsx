import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Chapters from './pages/Chapters';
import ChapterDetail from './pages/ChapterDetail';
import Archetypes from './pages/Archetypes';
import Toolkit from './pages/Toolkit';
import Community from './pages/Community';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/chapter/:id" element={<ChapterDetail />} />
            <Route path="/archetypes" element={<Archetypes />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;