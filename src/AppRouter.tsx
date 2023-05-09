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

const AppRouter: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SignInScreen/>} />
          <Route path="/forgotPass" element={<ForgotPasswordScreen/>} />
          <Route path="/forgotPassVerify" element={<ForgotPasswordVerificationScreen/>} />
          <Route path="/changePass" element={<ChangePasswordScreen/>} />
          <Route path="/dashboard" element={<DashBoardScreen/>} />
          <Route path="/admin-information" element={<AdminInformationScreen/>} />
          <Route path="/edit-admin-information" element={<EditAdminInformationScreen/>} />
          <Route path="/adminInfo" element={<AdminInformationScreen/>} />
          <Route path="/adminScreen" element={<AdminScreen/>} />
          <Route path="/adminAdd" element={<AdminAddScreen/>} />
          <Route path="/applicantList" element={<AdminApplicantList/>} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;