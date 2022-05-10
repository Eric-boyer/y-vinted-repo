import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

const navigate = useNavigate();

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage("");
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );

      if (response.data) {
        console.log("Bravo compte créer");
        console.log(response.data);
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.status);
      if (error.response.status === 409) {
        setErrorMessage("Veuillez utilisez une autre adresse mail");
      }
    }
  };

  return (
    <form className="Signup-container" onSubmit={handleSignup}>
      <h2> Signup</h2>

      <input
        value={username}
        type="text"
        placeholder="username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <input
        value={email}
        type="email"
        placeholder="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <input
        value={newsletter}
        type="checkbox"
        placeholder="newsletter"
        onChange={(event) => setNewsletter(event.target.checked)}
      />
      <br />
      <input type="submit" value="S'incrire" />
      <h2 style={{ color: "green" }}>{errorMessage}</h2>
    </form>
  );
};

export default Signup;
