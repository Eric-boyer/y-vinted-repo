

// src/CheckoutForm.js
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        stripeToken,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  const Price = Number(price);
  const fraisProtection = 0.4;
  const fraisPort = 0.8;
  let FinalPrice = fraisProtection + fraisPort + Price;

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <div className="background">
            <div className="payment">
              <h3>Résumé de la commande : </h3>
              <div className="sous-total">
                <div className="descritpif">
                  <p>Commande</p>
                  <p>Frais de protection acheteurs</p>
                  <p>Frais de port</p>
                </div>
                <div className="detail">
                  <p>{price} €</p>
                  <p> {fraisProtection} €</p>
                  <p>{fraisPort} €</p>
                </div>
              </div>
              <div className="total">
                <div className="bloc-total">
                  <div className="titletotal"> Total</div>
                  <div className="titleprix"> {FinalPrice.toFixed(2)}€ </div>
                </div>
                <p>
                  Il ne vous reste plus qu'une seule étape pour vous offrir{" "}
                  {title}. Vous allez payé {FinalPrice.toFixed(2)}€ (frais de
                  protection et de port inclus).
                </p>
              </div>
              <CardElement />
              <button className="boutonvalider" type="submit">
                Valider le paiement
              </button>
            </div>
          </div>
        </form>
      ) : (
        <span>Paiement effectué !</span>
      )}
    </>
  );
};

export default Checkout;