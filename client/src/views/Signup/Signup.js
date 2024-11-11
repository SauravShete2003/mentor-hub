import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const userLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        email: user.email,
        password: user.password,
        name: user.name,
      });
      if (response.data.success) {
        setUser({ email: "", password: "", name: "" });
        toast.success(response.data.message);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      } else {
        toast.error("Signup failed.");
      }
    } catch (error) {
      toast.error("Error during signup.");
      console.error("Error during signup:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='login-container'>
      <h1 className='auth-heading'>Signup Form</h1>
      <div className="login-form">
        <input
          type="text"
          placeholder="Enter your Name"
          className="login-input"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="login-input"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Set Password"
          className="login-input"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        
        <button className="auth-button" type='button' onClick={userLogin}>Register</button>
        <p>
          Already Have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
      <Toaster/>
    </div>
  );
}

export default Signup;
