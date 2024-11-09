import "./Home.css";
import axios from "axios";
import sampleImg from "./../../assets/images/sample.jpeg"

function Home(userDetails) {
  const user = userDetails.user || {};  
     
  const logout = async () => {
    const token = localStorage.getItem("sessionToken");

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("sessionToken");
      console.log("Logged out successfully!");

      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="auth-heading">Home</h1>
      <div className="user-info">
      <img
            src={user.picture}
            alt='User'
            style={{ height: "200px", width: "200px", objectFit: "cover", borderRadius: "50%" }}
          />

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
        <button className="auth-button" type="button" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Home;
