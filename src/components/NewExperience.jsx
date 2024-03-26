import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const NewExperience = () => {
  const[butcherName, setButcherName] = useState("");
  const[meatName, setMeatName] = useState("");
  const[comment, setComment] = useState("");
  const[error, setError] = useState("");


  const navigate = useNavigate();
  
  // const submit = async(event) => {
  //   event.preventDefault();

  //   const credentials = {
  //     email, password 
  //   };

  //   try {
  //     await register(credentials);
  //     // Navigate('/account');
  //   }
  //   catch(error) {
  //     setError(error.message);
  //   }

  // }

  return(
    <>
    <NavBar/>
    <form onSubmit={ submit }>
    <input
      placeholder='Butcher'
      value={ butcherName }
      onChange={ event => setButcherName(event.target.value )}
      />

      <input
      placeholder='Meat Cut'
      value={ meatName }
      onChange={ event => setMeatName(event.target.value )}
      />

      <input
      placeholder='Experience'
      value={ comment }
      onChange={ event => setComment(event.target.value )}
      />

      {/* <button onClick={() => (submit)}>REGISTER</button> */}
      <button onClick={() => navigate('/account')}>CREATE</button>

    </form>
    </>
  );
};

export default NewExperience;