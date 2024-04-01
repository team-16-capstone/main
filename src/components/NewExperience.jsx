import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function NewExperience() {
  const [butcher, setButcher] = useState('');
  const [meats, setMeats] = useState([]);
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const handleButcherChange = (event) => {
    setButcher(event.target.value);
  };

  const handleMeatChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setMeats([...meats, value]);
    } else {
      setMeats(meats.filter(meat => meat !== value));
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      butcher: butcher,
      meats: meats,
      review: review
    };

    try {
      const response = await fetch('http://localhost:3001/api/new-experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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

  return (
    <>
      <NavBar />
      <div id="new-exp-body">
        <h2>CREATE EXPERIENCE</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Butcher:
            <select value={butcher} onChange={handleButcherChange}>
              <option value="butcher1">B1</option>
              <option value="butcher2">B2</option>
              <option value="butcher3">B3</option>
            </select>
          </label>
          <br />
          <label>
            Meats:
            <input type="checkbox" value="beef" onChange={handleMeatChange} /> Beef
            <input type="checkbox" value="chicken" onChange={handleMeatChange} /> Chicken
            <input type="checkbox" value="pork" onChange={handleMeatChange} /> Pork
          </label>
          <br />
          <label>
            Review:
            <textarea value={review} onChange={handleReviewChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default NewExperience;