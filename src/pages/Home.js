// import qui me permet de ne pas repeter mon code
import React, { useState, useEffect } from "react";
// import axios pour effectuer une requete
import axios from "axios";
// import permettant le lien entre mes pages
import { Link } from "react-router-dom";

import banniere from "../img/banniere.jpeg";

const Home = () => {
  // usestate (etat) me permet de stocker mes données
  const [data, setData] = useState();

  // usestate me permet de faire mon booléen pour passer a la page suivante une fois que mes données sont okk
  const [isLoading, setIsLoading] = useState(true);
  // absolent nécessaire pour faire un async await(ps: j'aurais pu appeler la variable fetchdata comme je veux)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
 

  return isLoading === true ? (
    <div>En cours de chargement....</div>
  ) : (
    <>
      <img src={banniere} alt=""></img>
      <h3>Articles Populaires</h3>
       
      
      <div className="offers-parent">

      
        {data.offers.map((offer) => {
          return (
            <Link to={`/offer/${offer._id}`} key={offer._id}>
              <div className="container">
                <div className="toto">
                  <h4> {offer.product_name}</h4>
                </div>
                <div className="pictures-containers">
                  <img className="pictures" src={offer.product_image.secure_url} alt="" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
