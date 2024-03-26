import { Link } from "react-router-dom"

function NavBar() {
  return (
    <>
      <div id="nav-container">
       <Link to="/account">MY ACCOUNT</Link>
       <Link to="/butchers">BUTCHERS</Link>
       <Link to="/community">COMMUNITY</Link>
      </div>
    </>
  )
}

export default NavBar;