import { Link } from 'react-router-dom';
import logored from '../assets/logored.png';

function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/account';
  };
  return (
    <>
      <div id='nav'>
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
        </div>
        <div id='nav-logo-container'>
        <img id='logo-topper' src={logored}/>
        </div>
      </div>
      <div>
        <label className='hamburger-menu'>
          <input type='checkbox'></input>
        </label>
        <aside className='sidebar'>
          <nav id='sidebar-nav'>
            <Link className='sidebar-links' to='/account'>MY ACCOUNT</Link>
            <Link className='sidebar-links' to='/butchers'>BUTCHERS</Link>
            <Link className='sidebar-links' to='/my-experiences'>MY EXPERIENCES</Link>
            <Link className='sidebar-links' to='/community'>COMMUNITY</Link>
            <Link className='sidebar-links' to='/' onClick={handleLogout}>LOGOUT</Link>
          </nav>
        </aside>
      </div>
      </div>
    </>
  );
}

export default NavBar;
