import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import logo from "./img/vinted-logo.jpeg";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      console.log("creation d'un cookie");
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <>
      <div className="countainer">
        <div className="secondcoun">
          <img className="logo" src={logo} alt="" />
          <input
            className="firstput"
            placeholder="Rechercher des articles"
          ></input>
          <button onClick  > Se déconnecter</button>
          <button> Se connecter</button>
        </div>
        <div className="line"></div>
        <div>
          <button className="button-inside">Hommes</button>
          <button>Femmes</button>
          <button>Enfants</button>
          <button>Maison</button>
          <button>Divertissement</button>
          <button>Animaux</button>
          <button>À propos</button>
          <button>Notre plateforme</button>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup setUser={setUser} />} />

          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
