import NavBar from './NavBar';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import fetchExperiences from '../utilities/fetchExperiences';
import deleteExperience from '../utilities/deleteExperience';
import meatsbw from '../assets/meatsbw.jpg';

const MyExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [experienceId, setExperienceId] = useState();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchExperiences().then(setExperiences);
  }, []);

  return (
    <>
      <NavBar />
      <div id='experience-header'>
        <br />
        <h2>MY EXPERIENCES</h2>
      </div>
      <div id='community-body'>
        <div id='community-container'>
          {experiences.map((experience) => (
            <div className='experience-card' key={experience.id}>
              <h4>{experience.butcher}</h4>
              <p>Purchased: {experience.meats}</p>
              <p>Date: {experience.date}</p>
              <p className='price'>Price/lb: ${experience.price}</p>
              <p>Rating: {experience.rating}/5 ★ </p>
              <p className='review-box'>{experience.review}</p>
              <Link to={`/edit-experience/${experience.id}`}>
                <button onClick={() => setExperienceId(experience.id)}>
                  EDIT
                </button>
              </Link>
              <button
                onClick={() => {
                  deleteExperience(experience.id, token).then(() =>
                    fetchExperiences().then(setExperiences)
                  );
                }}
              >
                DELETE
              </button>
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

export default MyExperiences;
