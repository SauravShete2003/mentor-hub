import { Link } from "react-router-dom";
import googleLogo from "./../../assets/images/google-logo.png";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import avatarImg from "./../../assets/images/avatar.png";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const userLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/login`,
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser({ email: "", password: "" });
        console.log(response);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        // settimeout
        // setTimeout(() => {
        //   window.location.href = "/";
        // }, 2000);
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const googleAuth = () => {
    window.open(
      `${
        process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"
      }/auth/google`,
      "_self"
    );
  };

  return (
    <div className="login-container">
      <h1 className="auth-heading">
        👋 Welcome Back! Sign in to unlock a world of personalized experiences
        crafted just for you. ✨
      </h1>
      <div className="auth-container">
        <div>
          <img src={avatarImg} className="auth-avatar" alt="" />
        </div>
        <div className="auth-form">
          <input
            type="text"
            placeholder="Email"
            className="login-input"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button className="auth-button" type="button" onClick={userLogin}>
            Login
          </button>
          <p>OR</p>

          <button onClick={googleAuth} className="google-btn">
            <img src={googleLogo} alt="Google Logo" className="google-icon" />
            <span className="google-text">Sign in with Google</span>
          </button>
          <p>
            New here? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default Login;
