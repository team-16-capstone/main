import NavBar from "./NavBar";
import { useState, useParams, useNavigate, useEffect } from "react";
import { Link } from "react-router-dom";

  const Butchers = ()=> {
    const [butchersData, setButchersData] = useState([]);

    useEffect(() => {
      const fetchAllButchers = async () => {
        try {
          const url = "http://localhost:3001/api/butchers/";
          const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch (url, options);
          const responseData = await response.json();
          setButchersData(responseData);
        } catch (error) {
          console.error("Error fetching butchers:", error)
        }
      };
      fetchAllButchers();
    }, []);
 

  return (
    <>
    <NavBar/>
    <h2>PARTICIPATING BUTCHERS</h2>
    <div id='butcher-container'>
      {butchersData.map((butcher) => (
        <div id='butcher-body' key={butcher.id}>
          <h2>{butcher.name}</h2>
          <h3>{butcher.street}</h3>
          <h3>{butcher.city}</h3>
          <h3>{butcher.state}</h3>
          <h3>{butcher.zipcode}</h3>
          <h3>{butcher.phonenumber}</h3>
          <br />
          <Link to={`/butchers/${butcher.id}`}>
          <button>BUTCHER PROFILE</button>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
};

export default Butchers;