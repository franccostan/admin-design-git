import { useState } from 'react';
import './admin-sign-in.css';
import { useNavigate } from 'react-router-dom';

interface SignInFormData {
  email: string;
  password: string;
}

const SignInScreen = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate();

  /*const handleButtonClick = () => { // for emergency if ever a hook error appears
    navigate('/dashboard');
  };*/
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO - handles sign in logic

    navigate('/dashboard');
  };

  const handleForgotPassClick = () => { // redirect to forgot password page
    navigate('/forgotPass');
  };

  return (
    <div className="signin-form-container">
      <div className="signin-form-box">
      <div className="signin-form-rectangle"></div> {/* red rectangle */}
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
        <h1 className="signin-form-title">Alliance Recruit</h1>
        <div className='signin-form-subtitle'>Sign in to your account</div>
        <form className='form-group-box' onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
          <div onClick={handleForgotPassClick} className='form-forgot-password'>Forgot Password?</div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;