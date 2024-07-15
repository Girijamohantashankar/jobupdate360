import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
