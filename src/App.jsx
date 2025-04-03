// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProfilePage from './pages/ProfilePage';
import './index.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;