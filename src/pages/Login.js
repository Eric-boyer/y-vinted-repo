import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage("");
      const user = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        user
      );

      const token = response.data.token;
    if (token){
     console.log("Bravo")
      Cookies.set("token",token);
      setToken(token);
      navigate("/");
    }
     
    } catch (error) {
      console.log(error.message);
      console.log(error.response.status)
      if (error.response.status === 401){
        setErrorMessage("veuillez sairir le bon mot de passe ou la bonne adresse email")
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Se connecter</h3>
      <input
        value={email}
        placeholder="email"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <input
        value={password}
        placeholder="password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />

      <br />
      <input type="submit" value="Se connecter" />
      <h2 style={{ color: "red" }}>{errorMessage}</h2>

    </form>
  );
};

export default Login;
