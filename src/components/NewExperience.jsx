import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import RatingSystem from './RatingSystem';
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

function NewExperience() {
  const [butcherOptions, setButcherOptions] = useState([]);
  // const [meatOptions, setMeatOptions] = useState([]);
  const [butcher, setButcher] = useState('');
  const [date, setDate] = useState('');
  const [meats, setMeats] = useState([]);
  const [price, setPrice] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchButchers();
    // fetchMeats();
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

  // const fetchMeats = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3001/api/meats');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setMeatOptions(data);
  //     } else {
  //       console.error('Failed to fetch meats:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching meats:', error);
  //   }
  // };

  const handleButcher = (event) => {
    setButcher(event.target.value);
  };

  // const handleMeat = (event) => {
  //   setMeat(event.target.value);
  // };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleMeat = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setMeats([...meats, value]);
    } else {
      setMeats(meats.filter((meat) => meat !== value));
    }
  };

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
      meats: meats,
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
      <div id='experience-header'>
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
            <input className='checkbox' type="checkbox" value="ribeye steak" onChange={handleMeat} />  <img className='icon' alt='ribeye steak' src={ribeyesteak} />
            <input className='checkbox' type="checkbox" value="filet mignon" onChange={handleMeat} /> <img className='icon' alt='filet mignon' src={filetmignon} />
            <input className='checkbox' type="checkbox" value="new york strip steak" onChange={handleMeat} /> <img className='icon' alt='new york strip steak' src={nystripsteak} />
            <input className='checkbox' type="checkbox" value="pork lion chop" onChange={handleMeat} /> <img className='icon' alt='pork lion chop' src={porkloinchop} />
            <input className='checkbox' type="checkbox" value="pork shoulder" onChange={handleMeat} /> <img className='icon' alt='pork shoulder' src={porkshoulder} />
            <input className='checkbox' type="checkbox" value="beef brisket" onChange={handleMeat} /> <img className='icon' alt='beef brisket' src={beefbrisket} />
            <input className='checkbox' type="checkbox" value="flank steak" onChange={handleMeat} /> <img className='icon' alt='flank steak' src={flanksteak} />
            <input className='checkbox' type="checkbox" value="chicken breast" onChange={handleMeat} /> <img className='icon' alt='chicken breast' src={chickenbreast} />
            <input className='checkbox' type="checkbox" value="lamb chop" onChange={handleMeat} /> <img className='icon' alt='lamb chop' src={lambchop} />
            <input className='checkbox' type="checkbox" value="ground beef" onChange={handleMeat} /> <img className='icon' alt='ground beef' src={groundbeef} />
          </label>
          <label>
            <p>Price/lb:</p>
            $
            <input className='price-input' value={price} onChange={handlePrice} />
          </label>
          <br />
          <br />
          <label>
            <p>Review:</p>
            <RatingSystem rating={rating} onRatingChange={updateRating} />
            <textarea className='notes-input' value={review} onChange={handleReview} />
          </label>
          <br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default NewExperience;
