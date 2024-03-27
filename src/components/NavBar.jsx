import { Link } from "react-router-dom"

function NavBar() {
  return (
    <>
      <div id="nav-container">
       <Link className="link" to="/account">MY ACCOUNT</Link>
       <Link className="link" to="/butchers">BUTCHERS</Link>
       <Link className="link" to="/community">COMMUNITY</Link>
      </div>
    </>
  )
}

export default NavBar;