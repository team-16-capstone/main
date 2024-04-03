import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function NewExperience() {
  const [butcherOptions, setButcherOptions] = useState([]);
  const [butcher, setButcher] = useState('');
  const [meats, setMeats] = useState([]);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      butcher: butcher,
      meats: meats,
      review: review,
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
        navigate('/community');
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
      <div id='new-exp-body'>
        <form onSubmit={handleSubmit} onKeyDown={handleEnterButton}>
          <label>
            Butcher:
            <select value={butcher} onChange={handleButcher}>
              <option value=''>***Select Butchers***</option>
              {butcherOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Meats:
            <input type='checkbox' value='beef' onChange={handleMeat} /> Beef
            <input type='checkbox' value='chicken' onChange={handleMeat} />{' '}
            Chicken
            <input type='checkbox' value='pork' onChange={handleMeat} /> Pork
          </label>
          <br />
          <label>
            Review:
            <textarea value={review} onChange={handleReview} />
          </label>
          <br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
}

export default NewExperience;
