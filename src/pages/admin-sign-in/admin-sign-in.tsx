import { useState } from 'react';
import './admin-sign-in.css';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import axios from 'axios';
import {useSignIn} from 'react-auth-kit';
import { toast } from 'react-toastify';

interface SignInFormData {
  username: string;
  password: string;
}

const SignInScreen = () => {
  const [isCredentialsValid, setIsCredentialsValid] = useState(true);
  const signIn = useSignIn();
  const [isActive, setIsActive] = useState(false);

  const [formData, setFormData] = useState<SignInFormData>({
    username: '',
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
  

  async function validateUser(username : string) {
    await axios
      .get(`http://localhost:55731/api/UserAPI/getUser?id=${username}`)
      .then((response) => {
        //setUser(response.data);
        console.log("Validate User:", response.data);
        console.log("Is Active:", response.data.user_isActive);
        if (response.data.user_isActive === true) setIsActive(true);
      });
  }

  async function notify() {
    toast.error("User does not exist", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO - handles sign in logic

    try {
      validateUser(formData.username);
      //isActive === true ? 
      await axios.post("http://localhost:55731/api/token", {
              username: formData.username,
              password: formData.password,
            })
            .then((response) => {
              console.log(response.status);
              console.log(response.data);
              if (response.status === 200) {
                signIn({
                  token: response.data.access_token,
                  expiresIn: response.data.expires_in,
                  tokenType: "Bearer",
                  authState: { user: formData.username },
                });
                navigate('/dashboard');
              }
            });
    } catch (err) {
      console.log("Error: ", err);
      setIsCredentialsValid(false);
    }

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
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
          {/* <Button variant="contained" type="submit">Sign In</Button> */}
            <Button
              variant="contained"
              color="error"
              type= "submit"
              style={{ width: 300 }}
              >
              Sign in
            </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInScreen;