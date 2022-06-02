import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import { useState } from "react";
import Header from "./components/Header";
import Pub from "./pages/Pub";
import Pay from "./pages/Pay";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token !== null) {
      console.log("creation d'un cookie");
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <>
      <Router>
        <Header token ={token} setUser={setUser}  />
        <Routes>
          <Route path="/signup" element={<Signup setUser={setUser} />} />

          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/pub" element={<Pub token={token} />} />
          <Route path="/pay" element={<Pay/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
