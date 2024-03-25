import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
// import client from "./lib/prisma.js";

function App() {
  const [auth, setAuth] = useState([]);


  const devUser = {
    id: "7",
    token: "10489571n45gjqckjnv",
    email: "devuser@email.com"
    
  }

  useEffect(()=> {
    // console.log(auth);
    if(auth.id){
      console.log('load user account');
    } 
    else {
      console.log('clear user account');

    }
    // client.Meat.findMany().then((response) =>
    //   console.log("this is the response", response)
    // );
  }, [auth]);

  useEffect(() => {
    const attemptLoginWithToken = async()=> {
      const response = await fetch('https://pocketbutcher.com/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`

        }
      );
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    };
    const token = window.localStorage.getItem("token");
    if (token) {
      attemptLoginWithToken();
    } else {

    }
  }, []);

  
  const login = async(credentials)=> {
    let response = await fetch('https://pocketbutcher.com/api/users/login', {
     method: 'POST',
     body: JSON.stringify(credentials),
     headers: {
       'Content-Type': 'application/json'
     }
    });
    let json = await response.json();
    if(response.ok){
     const token = json.token;
     window.localStorage.setItem('token', token);
     response = await fetch('https://pocketbutcher.com/api/users/me', {
       headers: {
         Authorization: `Bearer ${token}`
       }
     });
     json = await response.json();
     if(response.ok){
       setAuth(json);
     } else {
      setAuth(devUser);
     }
    }
    else {
     console.log(json);

    }
  };

   const register = async(credentials)=> {
    let response = await fetch('https://pocketbutcher.com/api/users/register', {
     method: 'POST',
     body: JSON.stringify(credentials),
     headers: {
       'Content-Type': 'application/json'
     }
    });
    let json = await response.json();
    if(response.ok){
     const token = json.token;
     window.localStorage.setItem('token', token);
     response = await fetch('https://pocketbutcher.com/api/users/me', {
       headers: {
         Authorization: `Bearer ${token}`
       }
     });
     json = await response.json();
     if(response.ok){
       setAuth(json);
     }
    }
    else {
     console.log(json);
    }
   };



  return (
    <>
      <div>

        <h1>Pocket Butcher!</h1>

      </div>
      <nav>
          {
            auth.id ? (
              <Link to='/account'>MY ACCOUNT</Link>
            ) : (null)
          }
          <div>
          Welcome! { auth.email }
          </div>
      </nav>

        
        {
          auth.id ? (
            <button onClick={ logout }>LOGOUT</button>
          ) : 
          (
            <>
            

            <Routes>
              <Route
                path='/' element= {<Login login ={ login }/>} >
              </Route>
              <Route
                path='/register' element= {<Register register ={ register }/>} >
              </Route>
              <Route
                path='/account' element= {<Account/>} >
              </Route>
            </Routes>
            
            <Link to='/register'>New Here? Register</Link>
            <br/>
            <Link to='/'>Already a Member? Login</Link>

            </>
          )
        }
    </>
  );
}

export default App;
