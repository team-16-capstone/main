import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Register = ({register}) => {
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[zip, setZip] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState("");



  const navigate = useNavigate();
  
  const submit = async(event) => {
    event.preventDefault();

    const credentials = {
      email, password 
    };

    try {
      await register(credentials);
      // Navigate('/account');
    }
    catch(error) {
      setError(error.message);
    }

  }

  return(
    <>
    <div id="register-container">
    <form onSubmit={ submit }>
    <input
      placeholder='First Name'
      value={ firstName }
      onChange={ event => setFirstName(event.target.value )}
      />
      <br/>
      <input
      placeholder='Last Name'
      value={ lastName }
      onChange={ event => setLastName(event.target.value )}
      />
      <br/>
      <input
      placeholder='zip code'
      value={ zip }
      onChange={ event => setZip(event.target.value )}
      />
      <br/>
      <input
      placeholder='email'
      value={ email }
      onChange={ event => setEmail(event.target.value )}
      />
      <br/>
      <input
      placeholder='password'
      value={ password }
      type="password"
      onChange={ event => setPassword(event.target.value )}
      />
      <br/>
      {/* <button onClick={() => (submit)}>REGISTER</button> */}
      <button onClick={() => navigate('/account')}>REGISTER</button>

    </form>
    <Link to='/'>Already a Member? Login</Link>
    </div>
    </>

  );
};

export default Register;