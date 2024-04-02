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
      <div id="community-body">
        <h2>
          COMMUNITY
        </h2>
        <h3>
          FLEXBOX CONTAINER OF MOST RECENT EXPERIENCES CREATED BY REAL CUSTOMERS!
        </h3>
        <div>
          {experiences.map((experience) => (
            <div key={experience.id}>
              <h4>Butcher: {experience.butcher}</h4>
              <p>Meats: {experience.meats.join(', ')}</p>
              <p>Review: {experience.review}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;
