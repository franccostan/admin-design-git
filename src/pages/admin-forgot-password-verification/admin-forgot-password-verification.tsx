import { useState } from 'react';
import './admin-forgot-password-verification.css';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

interface SignInFormData {
  email: string;
  password: string;
}

const ForgotPasswordVerificationScreen = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate();
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO - handles sign in logic

    navigate('/changePass'); //redirect to admin-change-password
  };
  

  return (
    <div className="signin-form-container">
      <div className="signin-form-box">
      <div className="signin-form-rectangle"></div> {/* red rectangle */}
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
        <h1 className="signin-form-title">Verification Code</h1>
        <div className='signin-form-subtitle'>We've sent the verification code to your email</div>
        <form className='form-group-box' onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Verification Code:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <Button
              variant="contained"
              color="error"
              type= "submit"
              style={{ width: 300 }}
              >
              Proceed
            </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordVerificationScreen;