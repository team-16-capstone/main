import React, { useState, useEffect } from 'react';
import RatingSystem from './RatingSystem';

const EditExperience = () => {
    const [updatedData, setUpdatedData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [experiences, setExperiences] = useState([]);
    const [experienceId, setExperienceId] = useState();

    const [butcherOptions, setButcherOptions] = useState([]);
    const [butcher, setButcher] = useState('');
    const [date, setDate] = useState('');
    const [meats, setMeats] = useState([]);
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    useEffect(() => {
        fetchExperiences();
        fetchButcherOptions();
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

    //   const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setUpdatedData({ ...updatedData, [name]: value });
    //   };

    const handleButcher = (event) => {
        setButcher(event.target.value);
    };

    //   const handleDate = (event) => {
    //     setDate(event.target.value);
    //     // setDate({[event.target.name]: event.target.value});
    //   };

    const handleMeat = (event) => {
        const { value, checked } = event.target;
        if (checked) {
        setMeats([...meats, value]);
        } else {
        setMeats(meats.filter((meat) => meat !== value));
        }
    };

    //   const handleReview = (event) => {
    //     setReview(event.target.value);
    //   };

    const updateRating = (newRating) => {
        setRating(newRating);
    };

    //   const handlePrice = (event) => {
    //     setPrice(event.target.value);
    //   };

    const handleUpdateData = async (experienceId) => {
        setIsLoading(true);
        try {
        const response = await fetch(`http://localhost:3001/api/experiences/${experienceId}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Failed to update data');
        }
        setIsLoading(false);
        fetchExperiences();
        } catch (error) {
        console.error('Error updating data:', error);
        setIsLoading(false);
        }
    };

  return (
    <div>
      <form id='edit-exp-body'>
      <h3>EDIT EXPERIENCE</h3>
      <label>
            <select value={butcher} onChange={handleButcher}>
              <option value="">Butcher Visited</option>
              {butcherOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
      <br/>
      <br/>
      <label>
        <p>Date:</p>
        <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br/>
      <br/>
      <label>
            <p>Cut Purchased: </p>
            <input type="checkbox" value="beef" onChange={handleMeat} /> <img className='icon' alt='beef' src='https://cdn-icons-png.flaticon.com/128/933/933310.png' />
            <input type="checkbox" value="chicken" onChange={handleMeat} /> <img className='icon' alt='chicken' src='https://cdn-icons-png.flaticon.com/128/821/821074.png'/>
            <input type="checkbox" value="pork" onChange={handleMeat} /> <img className='icon' alt='pork' src='https://cdn-icons-png.flaticon.com/128/1391/1391277.png'/>
        </label>
      <br/>
      <br/>
      <label>
        <p>Price/lb:</p> 
        <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br/>
      <br/>
      <label>
        <p>Review:</p>
        <RatingSystem rating={rating} onRatingChange={updateRating} />
        <input type="text" name="review" value={review} onChange={(e) => setReview(e.target.value)} />
      </label>
      <br/>
      <br/>
      <button onClick={handleUpdateData} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'UPDATE'}
      </button>
      </form>
    </div>
  );
};

export default EditExperience;