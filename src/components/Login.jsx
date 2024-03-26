import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Login = ({ login })=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const submit = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      email,
      password
    };
    await login(credentials);

  }

  return (
    <>
    <form onSubmit={ submit }>
      <input
        placeholder='email'
        value={ email }
        onChange={ ev => setEmail(ev.target.value )}
      />
      <input
        placeholder='password'
        value={ password }
        type="password"
        onChange={ ev => setPassword(ev.target.value )}
      />
      {/* <button onClick={() => (submit)}>LOGIN</button> */}
      <button onClick={() => navigate('/account')}>LOGIN</button>
    </form>
    <Link to='/register'>Become a Member</Link>
    </>
  );
};

export default Login;