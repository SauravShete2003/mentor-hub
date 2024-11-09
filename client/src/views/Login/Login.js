import './Login.css';
import { Link } from 'react-router-dom';
import googleLogo from './../../assets/images/google-logo.png';
import axios from 'axios';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Function to handle user login
  const userLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/login`,
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );
  
      if (response.data.success) {
        setUser({ email: '', password: '' });
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  
  // Function to handle Google Authentication
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/auth/google`,
      '_self'
    );
  };

  return (
    <div className='login-container'>
      <h1>{user ? user.name : 'Guest'}</h1>
      <h1 className='auth-heading'>Login Form</h1>
      <div className='login-form'>
        <input
          type='text'
          placeholder='Email'
          className='login-input'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          className='login-input'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className='auth-button' type='button' onClick={userLogin}>
          Login
        </button>
        <p>OR</p>
        <button onClick={googleAuth} className='google-btn'>
          <img src={googleLogo} alt='' className='google-icon' />
          <span className='google-text'>Sign in with Google</span>
        </button>
        <p>
          New Here? <Link to={'/signup'}>Sign Up</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
