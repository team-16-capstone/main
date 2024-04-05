import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Account = ({ auth })=> {
  const [user, setUser] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
    <NavBar/>
    <h2>
      MY ACCOUNT
    </h2>
    <h3>Welcome {`${user.name}`}!</h3>
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
