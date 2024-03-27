import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const NewExperience = () => {
  const[butcherName, setButcherName] = useState("");
  const[meatName, setMeatName] = useState("");
  const[comment, setComment] = useState("");
  const[error, setError] = useState("");


  const navigate = useNavigate();
  
  //this is not done and needs work!
  const submit = async(event) => {
    event.preventDefault();
    await createPlayer({butcherName, meatName, comment});
    refetch();
  }

  return(
    <>
    <NavBar/>
    <div id="new-exp-body">
    <h2>CREATE EXPERIENCE</h2>  
    <form onSubmit={ submit }>
    <input
      placeholder='Butcher'
      value={ butcherName }
      onChange={ event => setButcherName(event.target.value )}
      />
      <br/>
      <input
      placeholder='Meat Cut'
      value={ meatName }
      onChange={ event => setMeatName(event.target.value )}
      />
      <br/>
      <input
      placeholder='Experience'
      value={ comment }
      onChange={ event => setComment(event.target.value )}
      />
      <br/>
      {/* <button onClick={() => (submit)}>REGISTER</button> */}
      <button onClick={() => navigate('/account')}>CREATE</button>
    </form>
    </div>
    </>
  );
};

export default NewExperience;