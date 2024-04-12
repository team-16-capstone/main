import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import exppic from '../assets/exppic.jpg';
import meatmatchpic from '../assets/meatmatchpic.jpg';
import meatshop from '../assets/meatshop.jpg';
import meatsbw from '../assets/meatsbw.jpg';

const Account = ({ auth }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [experiences, setExperiences] = useState([]);

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

  return (
    <>
      <NavBar />
      <div id='account-header'>
      {/* <img id='logo-account' src={logowhite}/> */}
      <h2>MY ACCOUNT</h2>
      </div>
      <div id='user-welcome'>
      {currentUser ? <h3 id='welcome-message'>Welcome {currentUser.name}!</h3> : null}
      </div>
      <div id='account-body'>
        <h3 className='account-cards'>
          <p className='acct-card-headers'>MY EXPERIENCES</p>
          <div className='border'>
            <img id='acct-my-exp' src={meatsbw}/>
          </div>
          <button className='acct-card-button' onClick={() => navigate('/my-experiences')}>
            Browse All
          </button>
        </h3>
        <h3 className='account-cards'>
          <p className='acct-card-headers'>MEAT YOUR MATCH</p>
          <div className='border'>
          <img id='acct-meet' src={meatsbw}/>
          </div>
          <button className='acct-card-button' onClick={() => navigate('/meat-your-match')}>Search</button>
        </h3>
        <h3 className='account-card-right'>
          <p className='acct-card-headers'>CREATE EXPERIENCE</p>
          <div className='border'>
            <img id='acct-exp-pic' src={meatsbw}/>
          </div>
          <button className='acct-card-button' onClick={() => navigate('/new-experience')}>New</button>
        </h3>
      </div>
    </>
  );
};

export default Account;
