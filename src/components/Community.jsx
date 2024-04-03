import NavBar from "./NavBar";
import { useState, useEffect } from "react";

const Community = ({ auth }) => {
  const [experiences, setExperiences] = useState([]);

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

  return (
    <>
      <NavBar />
      <h2>
        COMMUNITY
      </h2>
      <div id="community-body">
        <h3>
          RECENT CUSTOMER EXPERIENCES
        </h3>
        <div id='community-container'>
          {experiences.map((experience) => (
            <div className='experience-card' key={experience.id}>
              <h4>{experience.butcher}</h4>
              <p>Purchased: {experience.meats.join(', ')}</p>
              <p>Price/lb: ${experience.price}</p>
              <p>Notes:</p>
              <p>{experience.review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;
