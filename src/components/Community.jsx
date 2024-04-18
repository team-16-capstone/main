import NavBar from './NavBar';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchExperiences from '../utilities/fetchExperiences';

const Community = () => {
  const [experiences, setExperiences] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences().then(setExperiences);
  }, []);

  return (
    <>
      <NavBar />
      <div id='community-header'>
        <h2>COMMUNITY</h2>
      </div>
      <div id='community-body'>
        {/* <h3>
          RECENT USER EXPERIENCES
        </h3> */}
        <div id='community-container'>
          {experiences.map((experience) => (
            <div className='experience-card' key={experience.id}>
              <h4>{experience.butcher}</h4>
              <p>Purchased: {experience.meats.join(', ')}</p>
              <p>Date: {experience.date}</p>
              <p className='price'>Price/lb: ${experience.price}</p>
              <p>Rating: {experience.rating}/5 ★ </p>
              <p className='review-box'>{experience.review}</p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => navigate('/new-experience')}>
            CREATE EXPERIENCE
          </button>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default Community;
