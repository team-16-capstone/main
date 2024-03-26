import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Account = ({ auth })=> {

  const navigate = useNavigate()

  return (
    <>
    <NavBar/>
    <div>
      MY ACCOUNT
    </div>
    <br/>
    <div id="account-body">
    <div className="account-cards">
      MY EXPERIENCES
      <br/>
      <button>Browse All</button>
    </div>
    <div className="account-cards">
      MEET YOUR MATCH
      <br/>
      <button onClick={() => navigate('/meat-your-match')}>Search</button>
    </div>
    <div className="account-cards">
      CREATE EXPERIENCE
      <br/>
      <button onClick={() => navigate('/new-experience')}>New</button>
    </div>
    </div>
    </>
  );
};

export default Account;
