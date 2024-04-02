import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';

const SingleButcher = () => {
  const [singleButcherData, setSingleButcherData] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSingleButcher = async () => {
      try {
        const url = `http://localhost:3001/api/butchers/${id}`; // Use template literals to insert the id
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(url, options);
        const responseData = await response.json();
        setSingleButcherData(responseData);
      } catch (error) {
        console.error("Error fetching butcher:", error);
      }
    };
    fetchSingleButcher();
  }, [id]);


  if (!singleButcherData) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <NavBar />
      <div id='single-butcher-container'>
        <div id='single-butcher-body' key={singleButcherData.id}>
          <h2>{singleButcherData.name}</h2>
          <img>{singleButcherData.image}</img>
          {/* <img src='https://lh3.googleusercontent.com/p/AF1QipPnj3XYxvcMJ2OvGnpJ4RBQRL_7jK5ezNy71AVX=s680-w680-h510'/> */}
          <h3>{singleButcherData.street}</h3>
          <h3>{singleButcherData.city}, {singleButcherData.state}  {singleButcherData.zipcode}</h3>
          <h3>{singleButcherData.phonenumber}</h3>
          <br />
          <button onClick={() => navigate("/new-experience")}>CREATE EXPERIENCE</button>
          <br />
          <button onClick={() => navigate("/butchers")}>RETURN TO BUTCHERS</button>
        </div>
      </div>
    </>
  );
};

export default SingleButcher;
