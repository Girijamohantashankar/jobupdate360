import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Dashboard from './Components/Dashboard';
import NotFound from './Components/NotFound';
import { AuthContext } from './AuthContext'; // Import AuthContext
import CreateJob from './Components/CreateJob';
import CustomForm from './Components/CustomForm';

function App() {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext); // Get the authentication state from the context

  const showNavbar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route exact  path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/createJob" element={isLoggedIn ? <CreateJob /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/customform" element={<CustomForm />} />
      </Routes>
    </div>
  );
}

export default App;
