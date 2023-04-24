import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages here
import DashBoardScreen from './pages/admin-dashboard/admin-dashboard';
import SignInScreen from './pages/admin-sign-in/admin-sign-in';
import ForgotPasswordScreen from './pages/admin-forgot-password/admin-forgot-password';
import ForgotPasswordVerificationScreen from './pages/admin-forgot-password-verification/admin-forgot-password-verification';
import ChangePasswordScreen from './pages/admin-change-password/admin-change-password';

const AppRouter: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<SignInScreen/>} />
          <Route path="/forgotPass" element={<ForgotPasswordScreen/>} />
          <Route path="/forgotPassVerify" element={<ForgotPasswordVerificationScreen/>} />
          <Route path="/changePass" element={<ChangePasswordScreen/>} />
          <Route path="/dashboard" element={<DashBoardScreen/>} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;