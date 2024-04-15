import { Link } from 'react-router-dom';
import logored from '../assets/logored.png';

function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/account';
  };
  return (
    <>
      <div id='nav-container'>
        <div id='nav-contents'>
        <Link className='link' to='/account'>
          MY ACCOUNT
        </Link>
        <Link className='link' to='/butchers'>
          BUTCHERS
        </Link>
        <Link className='link' to='/my-experiences'>
          MY EXPERIENCES
        </Link>
        <Link className='link' to='/community'>
          COMMUNITY
        </Link>
        <Link className='link' to='/' onClick={handleLogout}>
          LOGOUT
        </Link>
        <img id='logo-topper' src={logored}/>
        </div>
      </div>
    </>
  );
}

export default NavBar;
