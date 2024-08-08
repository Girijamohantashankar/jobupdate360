import React, { useContext } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Dashboard from './Components/Dashboard';
import NotFound from './Components/NotFound';
import { AuthContext } from './AuthContext';
import CreateJob from './Components/CreateJob';
import CustomForm from './Components/CustomForm';
import ViewJobs from './Components/ViewJobs';
import JobsEdit from './Components/JobsEdit';
import Admin from './AdminPage/Admin';
import Report from "./AdminPage/Report";
import ReportView from './AdminPage/ReportView';
import ViewAllUser from './AdminPage/ViewAllUser';
import FeedbackModal from './Components/FeedbackModal';
import FeedbackView from './AdminPage/FeedbackView';
import PeoplesReview from './Components/PeoplesReview';
import ApplyPeople from './Components/ApplyPeople';

function App() {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const showNavbar = !['/login', '/signup', '/admin', "/reportJob", "/viewAllUsers", "/feedbackView"].includes(location.pathname) && !/^\/job\/[^/]+$/.test(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/createJob" element={isLoggedIn ? <CreateJob /> : <Navigate to="/login" />} />
        <Route path="/viewJobs" element={isLoggedIn ? <ViewJobs /> : <Navigate to="/login" />} />
        <Route path="/viewJobs/EditJob/:id" element={isLoggedIn ? <JobsEdit /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/customform" element={<CustomForm />} />
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/reportJob" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
        <Route path="/job/:id" element={isLoggedIn ? <ReportView /> : <Navigate to="/login" />} />
        <Route path="/viewAllUsers" element={isLoggedIn ? <ViewAllUser /> : <Navigate to="/login" />} />
        <Route path="/feedback" element={<FeedbackModal />} />
        <Route path="/feedbackView" element={isLoggedIn ? <FeedbackView /> : <Navigate to="/login" />} />
        <Route path="/feedbackShow" element={<PeoplesReview />} />
        <Route path="/appliedPeople" element={isLoggedIn ? <ApplyPeople /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;