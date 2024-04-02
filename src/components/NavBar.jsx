import { Link } from 'react-router-dom';

function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/account';
  };
  return (
    <>
      <div id='nav-container'>
        <Link className='link' to='/account'>
          MY ACCOUNT
        </Link>
        <Link className='link' to='/butchers'>
          BUTCHERS
        </Link>
        <Link className='link' to='/community'>
          COMMUNITY
        </Link>
        <Link className='link' to='/' onClick={handleLogout}>
          LOGOUT
        </Link>
      </div>
    </>
  );
}

export default NavBar;
