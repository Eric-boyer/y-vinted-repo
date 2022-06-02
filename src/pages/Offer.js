import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        //   console.log(response.data);
        setData(response.data);
        setIsLoading(false);
       
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading === true ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
       
      <div className="profil">
        <div className="photoprofil">
          <img className="avatar" src={data.owner.account.avatar.secure_url} alt="avatar" />
        </div>
        <p>{data.owner.account.username}</p>
      </div>
      {data.product_pictures[0] && (
        <img className= "av" src={data.product_pictures[0].secure_url} alt="" />
      )}
      <h2>{data.product_name}</h2>
      <span>{data.product_price}</span>
      
      <div>
     
        {data.product_details.map((item, index) => {
          console.log(item);
          const keys = Object.keys(item);
          return (
            <div key={index}>
              {keys[0]} : {item[keys[0]]}
            </div>
           
          );
        })}
      </div>
      <button>Acheter</button>
    </div>
  );
};

export default Offer;
