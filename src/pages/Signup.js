import { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
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
        console.log("compte créer");
        console.log(response.data);
        setUser(response.data.token);
      }
    } catch (error) {
      console.log(error);
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
    </form>
    
  );
};

export default Signup;
