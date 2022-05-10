import logo from "../img/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return (
    <div className="countainer">
      <div className="secondcoun">
        <img className="logo" src={logo} alt="vinted" />
        <input
          className="firstput"
          placeholder="Rechercher des articles"
        ></input>
        <div>
          <Link to="/Signup">
            <button> S'inscrire</button>
          </Link>
          <Link to="/login">
            <button> Se connecter</button>
          </Link>
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>

          <Link to="/pub"><button style={{ backgroundColor: "green", color: "white" }}>
            Vend ton article
          </button></Link>
        </div>
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
  );
};

export default Header;
