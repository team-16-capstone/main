import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';

const SingleButcher = () => {
  const [singleButcherData, setSingleButcherData] = useState(null);
  const [experiences, setExperiences] = useState([]);

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

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/experiences');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      } else {
        console.error('Failed to fetch experiences:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  if (!singleButcherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div id='single-butcher-container'>  
      <div id='app-header'>
      <h2>{singleButcherData.name}</h2>
      </div>
        <div id='single-butcher-body' key={singleButcherData.id}>
          <div id='left-butcher-div'>
            <div id='img-div'>
              <img className='butcher-img' src={singleButcherData.image_url} />
              <img className='butcher-img' src={singleButcherData.map_url} />
              <br />
              <br />
            </div>
            <h3>{singleButcherData.street}</h3>
            <h3>{singleButcherData.city}, {singleButcherData.state}  {singleButcherData.zipcode}</h3>
            <h3>Contact: {singleButcherData.phonenumber}</h3>
            <br />
            <button onClick={() => navigate("/butchers")}>RETURN TO BUTCHERS</button>
            <button onClick={() => navigate("/new-experience")}>CREATE EXPERIENCE</button>
          </div>
          <div id='right-butcher-div'>
            <div>
              {experiences.map((experience) => (
                experience.butcher === singleButcherData.name && (
                  <div className='experience-card' key={experience.id}>
                    <h4>{experience.butcher}</h4>
                    <p>Purchased: {experience.meats.join(', ')}</p>
                    <p>Date: {experience.date}</p>
                    <p className='price'>Price/lb: ${experience.price}</p>
                    <p>Rating: {experience.rating} out of 5 stars </p>
                    <p className='review-box'>{experience.review}</p>
                  </div>
                )
              ))}
              <br />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default SingleButcher;
