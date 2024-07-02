// import React from 'react';
// // import './assets/styles/style.css';
// import Header from './components/Header';

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       {/* Ваш остальной контент */}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AppPage from './pages/AppPage';
// import './assets/styles/Home.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app-page" element={<AppPage />} />
      </Routes>
    </Router>
  );
}

export default App;