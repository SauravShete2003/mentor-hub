import  { useEffect, useState } from 'react';
import {Routes , Navigate , Route} from "react-router-dom"
import axios from 'axios';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
function App (){
    const [user , setUser] = useState(null)
    const getUser = async () => {
        try {
          const url = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/auth/login/success`;
          const { data } = await axios.get(url, { withCredentials: true });
          if (data && data.user) {
            setUser(data.user._json);
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      };
      
    useEffect(()=>{
        getUser()
    },[])
    return(
        <div>
        <h1>{user ? user.name : ''}</h1>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home user={user}/> : <Navigate to="/login" />}
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
      
    )
}

export default App