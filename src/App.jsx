import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ClientPortfolioPage from './pages/ClientPortfolioPage';
import OpportunityListPage from './pages/OpportunityListPage';
import ClientDetailPage from './pages/ClientDetailPage';
import './app.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/portfolio" element={<ClientPortfolioPage />} />
      <Route path="/pipeline" element={<OpportunityListPage/>} />
      <Route path="/client/:clientName" element={<ClientDetailPage />} />
    </Routes>
  </BrowserRouter>
);
export default App   

