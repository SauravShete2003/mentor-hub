// Home.js

import './Home.css';

function Home(userDetails) {
  const user = userDetails.user || {};

  const logOut = () => {
    window.open(
      `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/auth/logout`,
      "_self"
    );
  };


  return (
    <div className='home-container'>
      <h1 className='auth-heading'>Home</h1>
      <div className="user-info">
        {user.picture && (
          <img src={user.picture} alt='User' style={{ height: "300px", width: "300px" }} />
        )}
        <input
          type="text"
          placeholder="Full Name"
          className="login-input"
          defaultValue={user.name || "Name not available"}
        />
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          defaultValue={user.email || "Email not available"}
        />
        <button className="auth-button" type='button' onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Home;
