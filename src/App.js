import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "https://lereacteur-vinted-api.herokuapp.com/offers"
            );
            console.log(response.data);
            setData(response.data.Offer);
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
  

  return isLoading === true ? (
    <span>En cours de chargement... </span>
  ) : (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/offer">Offer</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home data={data} setData={setData}/>} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
