import React, { useState, useEffect } from 'react';
import RatingSystem from './RatingSystem';
import NavBar from './NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import logowhite from '../assets/logowhite.png';
import ribeyesteak from '../assets/ribeyesteak.png';
import filetmignon from '../assets/filetmignon.png';
import nystripsteak from '../assets/nystripsteak.png';
import porkloinchop from '../assets/porkloinchop.png';
import porkshoulder from '../assets/porkshoulder.png';
import beefbrisket from '../assets/beefbrisket.png';
import flanksteak from '../assets/flanksteak.png';
import chickenbreast from '../assets/chickenbreast.png';
import lambchop from '../assets/lambchop.png';
import groundbeef from '../assets/groundbeef.png';
import fetchAllButchers from '../utilities/fetchAllButchers';
import fetchUniqueExperience from '../utilities/fetchUniqueExperience';
import patchUserExperience from '../utilities/patchUserExperience';

const EditExperience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [experience, setExperience] = useState({
    butcher: '',
    date: '',
    meats: [],
    price: '',
    rating: null,
    review: '',
  });
  const [butcherOptions, setButcherOptions] = useState([]);

  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUniqueExperience(id).then(setExperience);
    fetchAllButchers().then(setButcherOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButcher = (event) => {
    const value = event.target.value;
    setExperience((prevExperience) => ({
      ...prevExperience,
      butcher: value,
    }));
  };

  const handleMeat = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setExperience((prevExperience) => ({
        ...prevExperience,
        meats: [...prevExperience.meats, value],
      }));
    } else {
      setExperience((prevExperience) => ({
        ...prevExperience,
        meats: prevExperience.meats.filter((meat) => meat !== value),
      }));
    }
  };

  const updateRating = (newRating) => {
    setExperience((prevExperience) => ({
      ...prevExperience,
      rating: newRating,
    }));
  };

  const meats = [
    { name: 'ribeye steak', src: ribeyesteak },
    { name: 'filet mignon', src: filetmignon },
    { name: 'new york strip steak', src: nystripsteak },
    { name: 'pork loin chop', src: porkloinchop },
    { name: 'pork shoulder', src: porkshoulder },
    { name: 'beef brisket', src: beefbrisket },
    { name: 'flank steak', src: flanksteak },
    { name: 'chicken breast', src: chickenbreast },
    { name: 'lamb chop', src: lambchop },
    { name: 'ground beef', src: groundbeef },
  ];

  const meatCheckboxes = meats.map((meat) => (
    <React.Fragment key={meat.name}>
      <input
        className='checkbox'
        type='checkbox'
        value={meat.name}
        onChange={handleMeat}
        checked={experience.meats.includes(meat.name)}
      />{' '}
      <img className='icon' alt={meat.name} src={meat.src} />
    </React.Fragment>
  ));

  return (
    <>
      <NavBar />
      <div>
        <div id='experience-header'>
          <br />
          <h2>EDIT EXPERIENCE</h2>
        </div>
        <form id='edit-exp-body'>
          <label>
            <select value={experience.butcher} onChange={handleButcher}>
              <option value=''>Butcher Visited</option>
              {butcherOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <label>
            <p>Date:</p>
            <input
              type='date'
              name='date'
              value={experience.date}
              onChange={(e) =>
                setExperience({ ...experience, date: e.target.value })
              }
            />
          </label>
          <br />
          <br />
          <label>{meatCheckboxes}</label>
          <br />
          <br />
          <label>
            <p>Review:</p>
            <RatingSystem
              rating={experience.rating}
              onRatingChange={updateRating}
            />
            <textarea
              className='notes-input'
              type='text'
              name='review'
              value={experience.review}
              onChange={(e) =>
                setExperience({ ...experience, review: e.target.value })
              }
            />
          </label>
          <br />
          <br />
          <button
            onClick={() => {
              setIsLoading(true);
              patchUserExperience(id, token, experience)
                .then(() => {
                  setIsLoading(false);
                  navigate('/my-experiences');
                })
                .catch((error) => {
                  setIsLoading(false);
                  console.error('Error updating user experience:', error);
                });
            }}
            disabled={isLoading}
          >
            {' '}
            {isLoading ? 'Updating...' : 'UPDATE'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditExperience;
