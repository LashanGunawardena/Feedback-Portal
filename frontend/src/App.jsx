import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitFeedback from './pages/SubmitFeedback';
import MyFeedback from './pages/MyFeedback';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './shared/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={
          <ProtectedRoute>
            <SubmitFeedback />
          </ProtectedRoute>
        } />
        <Route path="/my-feedback" element={
          <ProtectedRoute>
            <MyFeedback />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        {/* TODO: Add route protection and navigation */}
      </Routes>
    </Router>
  );
}

export default App;
