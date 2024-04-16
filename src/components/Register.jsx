import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logored from '../assets/logored.png';
import Footer from './Footer';

const Register = ({ register }) => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const credentials = {
      name,
      email,
      password,
    };

    try {
      if (
        credentials.name === '' ||
        credentials.email === '' ||
        credentials.password === ''
      ) {
        return console.log('Form cannot be blank');
      }
      await register(credentials);
      navigate('/stripepayment');
    } catch (error) {
      console.error(error);
      setError('Could not register your account, please try again.');
    }
  };

  return (
    <>
      <div id='register-container'>
      <img id='logo-login' src={logored}/>
        {error && <p id='error-container'>{error}</p>}
        <form onSubmit={submit}>
          <input
            placeholder='First Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          {/* <input
            placeholder='Last Name'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <br /> */}
          {/* <input
            placeholder='Zip code'
            value={zip}
            onChange={(event) => setZip(event.target.value)}
          />
          <br /> */}
          <input
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br />
          <input
            placeholder='Password'
            value={password}
            type='password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <button type='submit'>REGISTER</button>
          <br />
        </form>
        <Link className='link' to='/'>
          Already a Member? Login
        </Link>
      </div>
      <br/>
      <Footer />
    </>
  );
};

export default Register;
