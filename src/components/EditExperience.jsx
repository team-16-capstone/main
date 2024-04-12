import React, { useState, useEffect } from 'react';
import RatingSystem from './RatingSystem';
import NavBar from './NavBar';
import { useParams, useNavigate } from 'react-router-dom';
import logowhite from '../assets/logowhite.png';

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
    fetchUniqueExperience(id);
    fetchButcherOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchButcherOptions = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/butchers');
      if (response.ok) {
        const data = await response.json();
        setButcherOptions(data);
      } else {
        console.error('Failed to fetch butcher options:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching butcher options:', error);
    }
  };

  const fetchUniqueExperience = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/experiences/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setExperience(data);
      } else {
        console.error('Failed to fetch experiences:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

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

  const handleUpdateData = async (experienceId, token) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/experiences/${experienceId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            butcher: experience.butcher,
            date: experience.date,
            meats: experience.meats,
            price: experience.price,
            rating: experience.rating,
            review: experience.review,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      setIsLoading(false);
      navigate('/my-experiences');
    } catch (error) {
      console.error('Error updating data:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <form id='edit-exp-body'>
          <div id='account-header'>
            <br />
            <h2>EDIT EXPERIENCE</h2>
          </div>
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
          <label>
            <p>Cut Purchased: </p>
            <input
              type='checkbox'
              value='ribeye steak'
              onChange={handleMeat}
              checked={experience.meats.includes('ribeye steak')}
            />{' '}
            <img
              className='icon'
              alt='ribeye steak'
              src='https://cdn-icons-png.flaticon.com/128/933/933310.png'
            />
            <input
              type='checkbox'
              value='filet mignon'
              onChange={handleMeat}
              checked={experience.meats.includes('filet mignon')}
            />{' '}
            <img
              className='icon'
              alt='filet mignon'
              src='https://cdn-icons-png.flaticon.com/128/3703/3703413.png'
            />
            <input
              type='checkbox'
              value='new york strip steak'
              onChange={handleMeat}
              checked={experience.meats.includes('new york strip steak')}
            />{' '}
            <img
              className='icon'
              alt='new york strip steak'
              src='https://cdn-icons-png.flaticon.com/128/7391/7391874.png'
            />
          </label>
          <br />
          <br />
          <label>
            <p>Price/lb:</p>
            <input
              type='text'
              name='price'
              value={experience.price}
              onChange={(e) =>
                setExperience({ ...experience, price: e.target.value })
              }
            />
          </label>
          <br />
          <br />
          <label>
            <p>Review:</p>
            <RatingSystem
              rating={experience.rating}
              onRatingChange={updateRating}
            />

            <input
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
            onClick={() => handleUpdateData(id, token)}
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
