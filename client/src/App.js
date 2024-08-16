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
import Applicants from './Components/Applicants';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Contactus from './Components/Contactus';
import Footer from './Components/footer';
import About from './Components/About';
import ViewContact from './AdminPage/ViewContact';


function App() {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  const showNavbarAndFooter = !['/login', '/signup', "/admin-98git-76hgt-nhb-th125-6849git-fg00-67wvb-p07", "/reportJob-j78-ht88-gir-9hrh-72th8-de0we", '/viewAllUsers-756bhd-76bh-th687-gdb78-gii-99re', '/feedbackView-74ht-2024-to-2025bdg-tu45-ebt09', "/forgot_password", "/reset-password/:token", "/viewContact-2024-hyb-45hd-new78-243-ngs45-jbf12-8jnh-ndh09"].includes(location.pathname) &&
    !/^\/job\/[^/]+$/.test(location.pathname) &&
    !/^\/reset-password\/[^/]+$/.test(location.pathname);


  return (
    <div>
      {showNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/createJob" element={isLoggedIn ? <CreateJob /> : <Navigate to="/login" />} />
        <Route path="/viewJobs" element={isLoggedIn ? <ViewJobs /> : <Navigate to="/login" />} />
        <Route path="/viewJobs/EditJob/:id" element={isLoggedIn ? <JobsEdit /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/customform" element={<CustomForm />} />
        <Route path="/admin-98git-76hgt-nhb-th125-6849git-fg00-67wvb-p07" element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/reportJob-j78-ht88-gir-9hrh-72th8-de0we" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
        <Route path="/job/:id" element={isLoggedIn ? <ReportView /> : <Navigate to="/login" />} />
        <Route path='/viewAllUsers-756bhd-76bh-th687-gdb78-gii-99re' element={isLoggedIn ? <ViewAllUser /> : <Navigate to="/login" />} />
        <Route path="/feedback" element={<FeedbackModal />} />
        <Route path='/feedbackView-74ht-2024-to-2025bdg-tu45-ebt09' element={isLoggedIn ? <FeedbackView /> : <Navigate to="/login" />} />
        <Route path="/feedbackShow" element={<PeoplesReview />} />
        <Route path="/appliedPeople" element={isLoggedIn ? <ApplyPeople /> : <Navigate to="/login" />} />
        <Route path="/view-applied-candidates/:jobId" element={isLoggedIn ? <Applicants /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/viewContact-2024-hyb-45hd-new78-243-ngs45-jbf12-8jnh-ndh09" element={isLoggedIn ? <ViewContact /> : <Navigate to="/login" />} />
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;