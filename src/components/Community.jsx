import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Community = ({ auth }) => {
  const [experiences, setExperiences] = useState([]);

  const navigate = useNavigate();

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

  const deleteExperience = async (id, token) => {
    try {
      const response = await fetch(`http://localhost:3001/api/experiences/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchExperiences();
      } else {
        console.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error deleting experience:');
    }
  };

  return (
    <>
      <NavBar />
      <div id='app-header'>
      <img id='logo-account' src='https://mail.google.com/mail/u/0?ui=2&ik=ccaf984398&attid=0.1&permmsgid=msg-a:r3048535673371188519&th=18ecdcf578acb712&view=att&disp=safe&realattid=f_luvelq7r0'/>
      <br/>
      <h2>
        COMMUNITY
      </h2>
      </div>
      <div id="community-body">
        <h3>
          RECENT CUSTOMER EXPERIENCES
        </h3>
        <div id='community-container'>
          {experiences.map((experience) => (
            <div className='experience-card' key={experience.id}>
              <h4>{experience.butcher}</h4>
              <p>Purchased: {experience.meats.join(', ')}</p>
              <p>Date: {experience.date}</p>
              <p>Price/lb: ${experience.price}</p>
              <p>Rating: {experience.rating} out of 5 stars </p>
              <p>Review:</p>
              <p>{experience.review}</p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => navigate('/new-experience')}>CREATE EXPERIENCE</button>
        </div>
      </div>
    </>
  );
};

export default Community;
