import axios from "axios";
import { useState } from "react";
import "./Logout.css";
function Logout(userDetails) {

    const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  const user = userDetails.user || {};

  const userLogout = async () => {
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
    <div className="user-info">
      {/* Toggle Button */}
      <button className="toggle-button" onClick={togglePopup}>
        Profile Options
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-profile">
            <img
              src={user.picture}
              alt="User"
              className="popup-profile-picture"
            />
            <div className="popup-details">
              <p className="popup-name">{user.name || "Name not available"}</p>
              <p className="popup-email">{user.email || "Email not available"}</p>
            </div>
            <button className="popup-logout-button" onClick={userLogout}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default Logout;
