import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import RatingSystem from './RatingSystem';
import logowhite from '../assets/logowhite.png';

function NewExperience() {
  const [butcherOptions, setButcherOptions] = useState([]);
  const [meatOptions, setMeatOptions] = useState([]);
  const [butcher, setButcher] = useState('');
  const [date, setDate] = useState('');
  const [meat, setMeat] = useState([]);
  const [price, setPrice] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchButchers();
    fetchMeats();
  }, []);

  const fetchButchers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/butchers');
      if (response.ok) {
        const data = await response.json();
        setButcherOptions(data);
      } else {
        console.error('Failed to fetch butchers:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching butchers:', error);
    }
  };

  const fetchMeats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/meats');
      if (response.ok) {
        const data = await response.json();
        setMeatOptions(data);
      } else {
        console.error('Failed to fetch meats:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching meats:', error);
    }
  };

  const handleButcher = (event) => {
    setButcher(event.target.value);
  };

  const handleMeat = (event) => {
    setMeat(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  // const handleMeat = (event) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setMeats([...meats, value]);
  //   } else {
  //     setMeats(meats.filter((meat) => meat !== value));
  //   }
  // };

  const handleReview = (event) => {
    setReview(event.target.value);
  };

  const updateRating = (newRating) => {
    setRating(newRating);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Date:', date);
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const formData = {
      butcher: butcher,
      date: date,
      meat: meat,
      price: price,
      rating: rating,
      review: review,
    };

    console.log("Form data:", formData);

    try {
      const token = window.localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/new-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        navigate('/my-experiences');
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEnterButton = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <>
      <NavBar />
      <div id='app-header'>
      <img id='logo-account' src={logowhite}/>
      <br/>
      <h2>CREATE EXPERIENCE</h2>
      </div>
      <div id="new-exp-body">
        <h3>LOG YOUR LATEST PURCHASE</h3>
        <form onSubmit={handleSubmit} onKeyDown={handleEnterButton}>
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
          <br />
          <br />
          <label>
            <p>Date Purchased: </p>
            <input type='date' value={date} onChange={handleDate} />
          </label>
          <br />
          <br />
          <label>
          <select value={meat} onChange={handleMeat}>
              <option value="">Cut Purchased</option>
              {meatOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <br/>
            {/* <input type="checkbox" value="beef" onChange={handleMeat} /> <img className='icon' alt='beef' src='https://cdn-icons-png.flaticon.com/128/933/933310.png' />
            <input type="checkbox" value="chicken" onChange={handleMeat} /> <img className='icon' alt='chicken' src='https://cdn-icons-png.flaticon.com/128/821/821074.png' />
            <input type="checkbox" value="pork" onChange={handleMeat} /> <img className='icon' alt='pork' src='https://cdn-icons-png.flaticon.com/128/1391/1391277.png' /> */}
          </label>
          <label>
            <p>Price/lb:</p>
            $
            <input id='price-input' value={price} onChange={handlePrice} />
          </label>
          <br />
          <br />
          <label>
            <p>Review:</p>
            <RatingSystem rating={rating} onRatingChange={updateRating} />
            <textarea id='notes-input' value={review} onChange={handleReview} />
          </label>
          <br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default NewExperience;
