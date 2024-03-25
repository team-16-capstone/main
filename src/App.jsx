import './App.css'
import Login from './components/Login'
import Register from './components/Register';
import { useState, useEffect} from 'react'

function App() {

  const [auth, setAuth] = useState([]);

  useEffect(()=> {
    // console.log(auth);
    if(auth.id){
      console.log('load user account');
    } 
    else {
      console.log('clear user account');
    }
  }, [auth]);

  useEffect(() => {
    const attemptLoginWithToken = async()=> {
      const response = await fetch('https://pocketbutcher.com/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      if(response.ok){
        setAuth(json);
      }
    };
    const token = window.localStorage.getItem('token');
    if(token){
      attemptLoginWithToken();
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
        </nav>

        <div>
          Welcome! { auth.email }
        </div>
        {
          auth.id ? (
            <button onClick={ logout }>LOGOUT</button>
          ) : 
          (
            <>
            <Login login= { login }/>
            <Register register = { register }/>
            </>
          )
        }
    </>
  )
}

export default App
