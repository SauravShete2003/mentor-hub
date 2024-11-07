import './Login.css'
import { Link } from "react-router-dom";
import googleLogo from './google-logo.jpg';

function Login() {
    const googleAuth = () => {
        window.open(
            `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/auth/google`,
            "_self"
        );
    }
    
  return (
    <div>
      <h1>Login From</h1>
      <div className="auth-login">
        <div>
          <img
            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7963.jpg"
            alt=""
            className="auth-image"
          />
        </div>
        <div className="login-form">
          <h2>Member Login</h2>
          <input type="text" placeholder="Email" className="login-input" />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <button className="login-button">Login</button>
          <p>OR</p>
          <button onClick={googleAuth}>
            <img
            src={googleLogo}
            alt=""
            className="google-icon"
            />
            <span>Sign in with Google</span>
          </button>
          <p>
            New Here? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
