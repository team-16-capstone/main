import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchAllButchers from '../utilities/fetchAllButchers';

const Butchers = () => {
  const [butchersData, setButchersData] = useState([]);

  useEffect(() => {
    fetchAllButchers().then(setButchersData);
  }, []);

  return (
    <>
      <NavBar />
      <div id='app-header'>
        <h2>PARTICIPATING BUTCHERS</h2>
      </div>
      <div id='butcher-container'>
        {butchersData.map((butcher) => (
          <div id='butcher-body' key={butcher.id}>
            <h2 id='butcher-name'>{butcher.name}</h2>
            <h3>{butcher.street}</h3>
            <h3>
              {butcher.city}, {butcher.state} {butcher.zipcode}
            </h3>
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
