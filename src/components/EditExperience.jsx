import React, { useState, useEffect } from 'react';

const EditExperience = () => {
    const [updatedData, setUpdatedData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [experiences, setExperiences] = useState([]);

    const [butcherOptions, setButcherOptions] = useState([]);
    const [butcher, setButcher] = useState('');
    const [date, setDate] = useState('');
    const [meats, setMeats] = useState([]);
    const [price, setPrice] = useState('');
    const [review, setReview] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdateData = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/experiences/${id}`, {
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
            <select value={butcher} onChange={handleInputChange}>
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
        <input type="date" name="date" value={setDate.id} onChange={handleInputChange} />
      </label>
      <br/>
      <br/>
      <label>
            <p>Cut Purchased: </p>
            <input type="checkbox" value="beef" onChange={handleInputChange} /> <img className='icon' alt='beef' src='https://cdn-icons-png.flaticon.com/128/933/933310.png' />
            <input type="checkbox" value="chicken" onChange={handleInputChange} /> <img className='icon' alt='chicken' src='https://cdn-icons-png.flaticon.com/128/821/821074.png'/>
            <input type="checkbox" value="pork" onChange={handleInputChange} /> <img className='icon' alt='pork' src='https://cdn-icons-png.flaticon.com/128/1391/1391277.png'/>
        </label>
      <br/>
      <br/>
      <label>
        <p>Price/lb:</p> 
        <input type="text" name="price" value={setPrice.id} onChange={handleInputChange} />
      </label>
      <br/>
      <br/>
      <label>
        <p>Review:</p>
        <p>-rating from 1 to 5 starts will live here-</p>
        <input type="text" name="review" value={setReview.id} onChange={handleInputChange} />
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