import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
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

      Cookies.set("token",token);
      setToken(token);
      navigate("/");
    }
     
    } catch (error) {
      console.log(error);
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
    </form>
  );
};

export default Login;
