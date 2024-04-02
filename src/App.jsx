import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Router, Routes, Route } from 'react-router-dom';
import MeatYourMatch from './components/MeatYourMatch';
import NewExperience from './components/NewExperience';
import Butchers from './components/Butchers';
import Community from './components/Community';
import StripeTest from './components/StripeTest';
// import findUserByToken from '../prisma/index.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const [auth, setAuth] = useState([]);
  const [butchers, setButchers] = useState([]);
  const [singleButcher, setSingleButcher] = useState([]);

  // useEffect(() => {
  //   // console.log(auth);
  //   if (auth.id) {
  //     console.log("load user account");
  //   } else {
  //     console.log("clear user account");
  //   }

  // client.Meat.findMany().then((response) =>
  //   console.log("this is the response", response)
  // );
  // }, [auth]);

  useEffect(() => {
    const fetchButchers = async () => {
      const response = await fetch('http://localhost:3001/api/butchers/');
      const json = await response.json();
      setButchers(json);
    };
    fetchButchers();
  }, []);

  useEffect(() => {
    const fetchSingleButcher = async () => {
      const response = await fetch('http://localhost:3001/api/butchers/3');
      const json = await response.json();
      setSingleButcher(json);
    };
    fetchSingleButcher();
  }, []);

  useEffect(() => {
    const attemptLoginWithToken = async () => {
      const response = await fetch('https://localhost:5173/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    };
    const token = window.localStorage.getItem('token');
    if (token) {
      attemptLoginWithToken();
    } else {
    }
  }, []);

  // const isLoggedIn = async (req, res, next) => {
  //   try {
  //     req.user = await findUserByToken(req.headers.authorization);
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  const login = async (credentials) => {
    let response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await response.json();
    if (response.ok) {
      const token = json.token;
      window.localStorage.setItem('token', token);

      response = await fetch('http://localhost:3001/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    } else {
      console.log(json);
    }
  };

  const register = async (credentials) => {
    let response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let json = await response.json();
    if (response.ok) {
      const token = json.token;
      window.localStorage.setItem('token', token);
      // response = await fetch('http://localhost:5173/account', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    } else {
      console.log(json);
    }
  };

  //   const logout = ()=> {
  //     window.localStorage.removeItem('token');
  //     setAuth({});
  //   };

  return (
    <>
      <div>
        <h1 id='logo'>Pocket Butcher</h1>
      </div>
      {/* <nav>
          {
            auth.id ? (
              <Link to='/account'>MY ACCOUNT</Link>
            ) : (null)
          }
          <div>
          Welcome! { auth.email }
          </div>
      </nav> */}

      {auth.id ? (
        <button onClick={logout}>LOGOUT</button>
      ) : (
        <>
          <>
            <Routes>
              <Route path='/' element={<Login login={login} />}></Route>
              <Route
                path='/register'
                element={<Register register={register} />}
              ></Route>
              <Route element={<ProtectedRoute />}>
                <Route path='/account' element={<Account />}></Route>
                <Route
                  path='/meat-your-match'
                  element={<MeatYourMatch />}
                ></Route>
                <Route
                  path='/new-experience'
                  element={<NewExperience />}
                ></Route>
                <Route path='/butchers' element={<Butchers />}></Route>
                <Route path='/community' element={<Community />}></Route>
                <Route path='/stripetest' element={<StripeTest />}></Route>
              </Route>
            </Routes>
          </>
        </>
      )}
    </>
  );
}

export default App;
