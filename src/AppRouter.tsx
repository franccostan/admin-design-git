import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages here
import DashBoardScreen from './pages/admin-dashboard/admin-dashboard';
import SignInScreen from './pages/admin-sign-in/admin-sign-in';
import ForgotPasswordScreen from './pages/admin-forgot-password/admin-forgot-password';
import ForgotPasswordVerificationScreen from './pages/admin-forgot-password-verification/admin-forgot-password-verification';
import ChangePasswordScreen from './pages/admin-change-password/admin-change-password';
import AdminInformationScreen from './pages/admin-information/admin-information';
import EditAdminInformationScreen from './pages/edit-admin-information/edit-admin-information';
import AdminScreen from './pages/admin-screen/admin-screen';
import AdminAddScreen from './pages/admin-add-screen/admin-add-screen';
import AdminApplicantList from './pages/admin-applicant-list/admin-applicant-list';
import ApplicantDetails from './pages/admin-applicant-details/admin-applicant-details';
import { RequireAuth } from "react-auth-kit";
const AppRouter: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SignInScreen/>} />
          <Route path="/forgotPass" element={<ForgotPasswordScreen/>} />
          <Route path="/forgotPassVerify" element={<ForgotPasswordVerificationScreen/>} />
          <Route path="/changePass" element={<ChangePasswordScreen/>} />
          <Route path="/dashboard" element={<RequireAuth loginPath='/'><DashBoardScreen/></RequireAuth>} />
          <Route path="/admin-information" element={<RequireAuth loginPath='/'><AdminInformationScreen/></RequireAuth>} />
          <Route path="/adminInfo/:id" element={<RequireAuth loginPath='/'><AdminInformationScreen/></RequireAuth>} />
          <Route path="/adminScreen" element={<RequireAuth loginPath='/'><AdminScreen/></RequireAuth>} />
          <Route path="/adminAdd" element={<RequireAuth loginPath='/'><AdminAddScreen/></RequireAuth>} />
          <Route path="/applicantList" element={<RequireAuth loginPath='/'><AdminApplicantList/></RequireAuth>} />
          <Route path="/applicantDetails/:id" element={<RequireAuth loginPath='/'><ApplicantDetails/></RequireAuth>} />
          <Route path="/edit-admin-information/:id" element={<RequireAuth loginPath='/'><EditAdminInformationScreen/></RequireAuth>} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;