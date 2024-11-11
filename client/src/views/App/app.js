import { useEffect, useState } from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import axios from "axios";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Logout from "../../components/Logout/Logout";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const url = `${
        process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"
      }/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      if (data && data.user) {
        setUser(data.user._json);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      if (err.response && err.response.status === 403) {
        console.error(
          "CORS issue or unauthorized access. Check CORS settings on the backend."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ margin: "5px" }}>{user ? `Welcome, ${user.name}` : ""}</h1>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Logout user={user} /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
