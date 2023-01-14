import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import {  GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    if(!user) navigate('/login')

  },[navigate])

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <AuthProvider>
        <Routes>
          <Route path={"Login"} element={<Login />} />
          <Route path={"/*"} element={<Home />} />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
