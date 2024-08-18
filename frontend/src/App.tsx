import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Segments from './pages/Segments';
import Navbar from './layout/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/segments" element={<Segments />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
