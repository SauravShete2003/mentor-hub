import { useEffect, useState } from "react";
import App from "../App/app";
import "./UserDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function UserDetails() {
  const { userId } = useParams();
  const [skills, setSkills] = useState('');
  const [updatePicture, setUpdatePicture] = useState('');
  const [updateBio, setUpdateBio] = useState('');

  const updateProfile = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, {
        skills,
        profilePicture: updatePicture,
        bio: updateBio    
      });
      console.log(response);
      
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("User could not be updated");
      }
    } catch (error) {
      toast.error("Error updating user profile");
      console.error("Update error:", error);
    }
  };

  const loadProfile = async (userId) => {
    try {
        if(!userId){
            return;
        }
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`);
      console.log("User ID:", userId); 
      if (response.data.success) {
        const { skills, bio, profilePicture } = response.data.data;
        setSkills(skills || "");
        setUpdatePicture(profilePicture || "");
        setUpdateBio(bio || "");
      }
    } catch (error) {
      toast.error("Error loading user profile");
      console.error("Load error:", error);
    }
  };

  useEffect(() => {
    loadProfile(userId);
  }, [userId]);

  return (
    <div className="user-details-container">
      <div className="user-logout-button-container">
        <App />
      </div>
      <div className="user-info-container">
        <h1 style={{ textAlign: "center", margin: "5px", padding: "10px" }}>
          User Details Page
        </h1>
        <div className="user-edit-container">
          <label>Skills:</label>
          <input 
            type="text" 
            value={skills} 
            onChange={(e) => setSkills(e.target.value)} 
            placeholder="e.g., Javascript, React.js"
          />

          <label>Profile Picture URL:</label>
          <input 
            type="text" 
            value={updatePicture} 
            onChange={(e) => setUpdatePicture(e.target.value)} 
            placeholder="Profile picture URL"
          />

          <label>Bio:</label>
          <textarea 
            value={updateBio} 
            onChange={(e) => setUpdateBio(e.target.value)} 
            placeholder="Tell us about yourself"
          />

          <button onClick={updateProfile}>Update Profile</button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default UserDetails;