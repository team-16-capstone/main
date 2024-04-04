import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Account = ({ auth })=> {

  const navigate = useNavigate()

  return (
    <>
    <NavBar/>
    <h2>
      MY ACCOUNT
    </h2>
    <div id="account-body">
    <h3 className="account-cards">
      MY EXPERIENCES
      <br/>
      <button onClick={() => navigate('/my-experiences')}>Browse All</button>
    </h3>
    <h3 className="account-cards">
      MEAT YOUR MATCH
      <br/>
      <button onClick={() => navigate('/meat-your-match')}>Search</button>
    </h3>
    <h3 className="account-cards">
      CREATE EXPERIENCE
      <br/>
      <button onClick={() => navigate('/new-experience')}>New</button>
    </h3>
    </div>
    </>
  );
};

export default Account;
