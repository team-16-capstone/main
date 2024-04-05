import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = ({ auth }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    const verifyToken = async () => {
      const response = await fetch('http://localhost:3001/api/verifytoken', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        throw new Error(message);
      }

      const result = await response.json();
      return result.userId;
    };

    const fetchUserById = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/users/${userId}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.statusText}`);
        }
        const user = await response.json();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    verifyToken()
      .then(fetchUserById)
      .catch((error) => console.error(error));
  }, []);

  // HI JULIE! currentUser is equal to the user that's currently logged in :) so currentUser.name will be their name, etc.

  return (
    <>
      <NavBar />
      <h2>MY ACCOUNT</h2>
      {currentUser ? <h2>Welcome {currentUser.name}</h2> : null}
      <div id='account-body'>
        <h3 className='account-cards'>
          MY EXPERIENCES
          <br />
          <button onClick={() => navigate('/my-experiences')}>
            Browse All
          </button>
        </h3>
        <h3 className='account-cards'>
          MEAT YOUR MATCH
          <br />
          <button onClick={() => navigate('/meat-your-match')}>Search</button>
        </h3>
        <h3 className='account-cards'>
          CREATE EXPERIENCE
          <br />
          <button onClick={() => navigate('/new-experience')}>New</button>
        </h3>
      </div>
    </>
  );
};

export default Account;
