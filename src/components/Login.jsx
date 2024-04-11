import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = async (ev) => {
    ev.preventDefault();
    const credentials = {
      email,
      password,
    };
    try {
      await login(credentials);
      navigate('/account');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id='login-container'>
      <img id='logo-login' src='https://mail.google.com/mail/u/0?ui=2&ik=ccaf984398&attid=0.1&permmsgid=msg-a:r7152435504917764301&th=18ecdbf99b6abeb1&view=att&disp=safe&realattid=f_luvdzmy30'/>
        <form onSubmit={submit}>
          <input
            placeholder='email'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <br />
          <input
            placeholder='password'
            value={password}
            type='password'
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <br />
          <button onClick={() => submit}>LOGIN</button>
        </form>
        <Link className='link' to='/register'>
          Become a Member
        </Link>
        <br />
        <Link className='link' to='/stripepayment'>
          Pay for your Membership
        </Link>
      </div>
    </>
  );
};

export default Login;
