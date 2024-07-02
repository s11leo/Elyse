import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AppPage from './pages/AppPage';
import DexPage from './pages/dex/DexPage';
import StakingPage from './pages/staking/StakingPage';
import NFTPage from './pages/nft_hub/nftPage';
import RWAPage from './pages/rwa/rwaPage';
import EarningPage from './pages/earning_hub/EarningPage';
import LearningPage from './pages/learning_hub/LearningPage';
import SocialPage from './pages/social/SocialPage';
import GamingPage from './pages/gaming_hub/GamingPage';
import SafetyPage from './pages/safety/SafetyPage';
// More pages

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app-page" element={<AppPage />} />
      <Route path="/dex" element={<DexPage />} />
      <Route path="/staking" element={<StakingPage />} />
      <Route path="/nft_hub" element={<NFTPage />} />
      <Route path="/rwa" element={<RWAPage />} />
      <Route path="/earning_hub" element={<EarningPage />} />
      <Route path="/learning_hub" element={<LearningPage />} />
      <Route path="/social" element={<SocialPage />} />
      <Route path="/gaming_hub" element={<GamingPage />} />
      <Route path="/safety" element={<SafetyPage />} />
      {/* More ways */}
    </Routes>
  </Router>
);

export default App;
