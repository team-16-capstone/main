import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function NewExperience() {
  const [butcherOptions, setButcherOptions] = useState([]);
  const [butcher, setButcher] = useState('');
  const [date, setDate] = useState('');
  const [meats, setMeats] = useState([]);
  const [price, setPrice] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchButchers();
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

  const handleButcher = (event) => {
    setButcher(event.target.value);
  };

  const handleDate = (event) => {
    // setDate(event.target.value);
    setDate({...date, [event.target.name]: event.target.value});
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

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(date);
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const formData = {
      butcher: butcher,
      date: formattedDate,
      meats: meats,
      price: price,
      review: review
    };

    

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
      <h2>CREATE EXPERIENCE</h2>
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
          <br/>
          <br/>
          <label>
            <p>Purchased on: </p>
            <input type='date' value={date.date} onChange={handleDate} />
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
          <label>
            <p>Price/lb:</p>
            $
            <input id='price-input' value={price} onChange={handlePrice} />
          </label>
          <br/>
          <br/>
          <label>
            <p>Review:</p>
            <p>-rating from 1 to 5 starts will live here-</p>
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
