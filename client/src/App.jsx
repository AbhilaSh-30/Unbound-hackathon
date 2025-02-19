import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Admin from './pages/Admin';
import RoutingPolicyPage from './pages/RoutingPolicyPage';
import FileRoutingPolicyPage from './pages/FileRoutingPolicyPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/routing-policy" element={<RoutingPolicyPage />} />
        <Route path="/file-routing-policy" element={<FileRoutingPolicyPage />} />
      </Routes>
  );
}

export default App;