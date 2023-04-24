import { useState } from 'react';
import './admin-change-password.css';
import { useNavigate } from 'react-router-dom';

interface SignInFormData {
  email: string;
  password: string;
}

const ChangePasswordScreen = () => {
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

    //TODO - handles change password logic

  };
  

  return (
    <div className="signin-form-container">
      <div className="signin-form-box">
      <div className="signin-form-rectangle"></div> {/* red rectangle */}
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
        <h1 className="signin-form-title">Change Password</h1>
        <div className='signin-form-subtitle'>Enter your new password</div>
        <form className='form-group-box' onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm New Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          </div>
          <button type="submit">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default  ChangePasswordScreen;