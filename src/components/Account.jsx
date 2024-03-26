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
    <div>
      MY EXPERIENCES
      <button>Browse All</button>
    </div>
    <div>
      MEET YOUR MATCH
      <button onClick={() => navigate('/meat-your-match')}>Search</button>
    </div>
    <div>
      CREATE EXPERIENCE
      <button onClick={() => navigate('/new-experience')}>New</button>
    </div>
    </div>
    </>
  );
};

export default Account;
