import NavBar from './NavBar';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import exppic from '../assets/exppic.jpg';
import meatshop from '../assets/meatshop.jpg';
import meatsbw from '../assets/meatsbw.jpg';
import myexppic from '../assets/my-exp-pic.jpg';
import meatmatchpic from '../assets/meatmatchpic.jpg';
import createexppic from '../assets/createexppic.jpg';
import verifyToken from '../utilities/verifyToken';
import fetchUserById from '../utilities/fetchUserById';
import fetchExperiences from '../utilities/fetchExperiences';

const Account = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    verifyToken(token)
      .then(fetchUserById)
      .then(setCurrentUser)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchExperiences()
      .then(setExperiences)
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <NavBar />
      <div className='site-bg'>
        <br/>
      <div id='account-header'>
        {/* <img id='logo-account' src={logowhite}/> */}
        <h2>MY ACCOUNT</h2>
      </div>
      <div id='user-welcome'>
      {currentUser ? <h3 id='welcome-message'>Logged in as {currentUser.name}</h3> : null}
      </div>
      <div id='account-body'>
        <h3 className='account-card-right'>
          <p className='acct-card-headers'>CREATE EXPERIENCE</p>
          <div className='border'>
            <img id='acct-exp-pic' src={createexppic} />
          </div>
          <button
            className='acct-card-button'
            onClick={() => navigate('/new-experience')}
          >
            New
          </button>
        </h3>
        <h3 className='account-cards'>
          <p className='acct-card-headers'>MEAT YOUR MATCH</p>
          <div className='border'>
            <img id='acct-meet' src={meatmatchpic} />
          </div>
          <button
            className='acct-card-button'
            onClick={() => navigate('/meat-your-match')}
          >
            Search
          </button>
        </h3>
        <h3 className='account-cards'>
          <p className='acct-card-headers'>USER EXPERIENCES</p>
          <div className='border'>
            <img id='acct-my-exp' src={myexppic} />
          </div>
          <button
            className='acct-card-button'
            onClick={() => navigate('/my-experiences')}
          >
            Browse All
          </button>
        </h3>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
