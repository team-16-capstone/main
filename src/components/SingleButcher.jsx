import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import fetchExperiences from '../utilities/fetchExperiences';
import fetchSingleButcher from '../utilities/fetchSingleButcher';

const SingleButcher = () => {
  const [singleButcherData, setSingleButcherData] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleButcher(id).then(setSingleButcherData);
  }, [id]);

  console.log(singleButcherData);

  useEffect(() => {
    fetchExperiences().then(setExperiences);
  }, []);

  const calculateAverageRating = () => {
    if (experiences.length === 0) return 0;
    const butcherExperiences = experiences.filter(
      (experience) => experience.butcher === singleButcherData.name
    );
    if (butcherExperiences.length === 0) return 0;
    const totalRating = butcherExperiences.reduce(
      (acc, experience) => acc + experience.rating,
      0
    );
    const averageRating = totalRating / butcherExperiences.length;
    const roundedAverageRating = Math.round(averageRating * 100) / 100;
    return roundedAverageRating;
  };

  if (!singleButcherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className='site-bg'>
        <br/>
      <div id='single-butcher-container'>
        <div id='single-header'>
          <h2>{singleButcherData.name}</h2>
        </div>
        <div id='single-butcher-body' key={singleButcherData.id}>
          <div id='left-butcher-div'>
            <div id='img-div'>
              <img className='butcher-img' src={singleButcherData.image_url} />
              <img className='butcher-img' src={singleButcherData.map_url} />
              <br />
              <br/>
            </div>
            <h3 className='single-address'>{singleButcherData.street}</h3>
            <h3 className='single-address'>
              {singleButcherData.city}, {singleButcherData.state}{' '}
              {singleButcherData.zipcode}
            </h3>
            <h3>Contact: {singleButcherData.phonenumber}</h3>
            <button onClick={() => navigate('/butchers')}>
              RETURN TO BUTCHERS
            </button>
            <button onClick={() => navigate('/new-experience')}>
              CREATE EXPERIENCE
            </button>
          </div>
          <div id='right-butcher-div'>
            <div>
            <div id='rating-container'>
            <h2 id='butcher-rating'>BUTCHER RATING: {calculateAverageRating()}/5</h2><h2 id='star'>★</h2>
            </div>
              {experiences.map(
                (experience) =>
                  experience.butcher === singleButcherData.name && (
                    <div className='experience-card' key={experience.id}>
                      <h4>{experience.butcher}</h4>
                      <p>Purchased: {experience.meats.join(', ')}</p>
                      <p>Date: {experience.date}</p>
                      <p className='price'>Price/lb: ${experience.price}</p>
                      <div id='exp-rating-container'>
                      <p>Rating: {experience.rating}/5 </p><p id='exp-star'>★</p>
                      </div>
                      <p className='review-box'>{experience.review}</p>
                    </div>
                  )
              )}
              <br />
            </div>
          </div>
        </div>
      </div>
      <br />
      </div>
      <Footer />
    </>
  );
};

export default SingleButcher;
