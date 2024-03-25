import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={ submit }>
    <input
      placeholder='First Name'
      value={ firstName }
      onChange={ event => setFirstName(event.target.value )}
      />

      <input
      placeholder='Last Name'
      value={ lastName }
      onChange={ event => setLastName(event.target.value )}
      />

      <input
      placeholder='zip code'
      value={ zip }
      onChange={ event => setZip(event.target.value )}
      />
      
      <input
      placeholder='email'
      value={ email }
      onChange={ event => setEmail(event.target.value )}
      />

      <input
      placeholder='password'
      value={ password }
      type="password"
      onChange={ event => setPassword(event.target.value )}
      />

      <button onClick={() => navigate("/account")}>REGISTER</button>

    </form>
    </>

    

  );
};

export default Register;