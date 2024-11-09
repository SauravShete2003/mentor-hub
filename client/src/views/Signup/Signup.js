import './Signup.css'
import { useState } from 'react';
import toast ,{Toaster} from 'react-hot-toast'
import { Link } from "react-router-dom";
import googleLogo from './../../assets/images/google-logo.png';
import axios from 'axios';
function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName : "",
  });

  const userLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,  {
        email: user.email,
        password: user.password,
        fullName : user.fullName
      })
      if (response.data.success) {
        setUser({
          email: "",
          password: "",
        });
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
        } 
    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
    }
  }

  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/auth/google`,
      "_self"
    );
  }

  return (
    <div className='login-container'>
      <h1 className='auth-heading'>Signup Form</h1>
      <div className="login-form">
      <input
          type="text"
          placeholder="Full Name"
          className="login-input"
          value={user.fullName}
              onChange={(e) => {
                setUser({ ...user,fullName: e.target.value });
              }}/>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}/>

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <button className="auth-button" type='button' onClick={userLogin}>Login</button>
        <p>OR</p>
        <button onClick={googleAuth} className='google-btn'>
          <img src={googleLogo} alt="" className="google-icon" />
          <span className='google-text'>Sign up with Google</span>
        </button>
        <p>
          Already How Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
      <Toaster/>
    </div>
  );
}

export default Signup
