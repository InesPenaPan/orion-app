import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ClientPortfolioPage from './pages/ClientPortfolioPage';
import ClientListPage from './pages/ClientListPage';
import './app.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/portfolio" element={<ClientPortfolioPage />} />
      <Route path="/allclients" element={<ClientListPage />} />
    </Routes>
  </BrowserRouter>
);
export default App   

