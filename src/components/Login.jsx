import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ login })=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      email,
      password
    };
    await login(credentials);

    const navigate = useNavigate();
  }

  return (
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
      <button onClick={() => navigate("/account")}>LOGIN</button>
    </form>
  );
};

export default Login;