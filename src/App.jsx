import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
// import client from "./lib/prisma.js";

function App() {
  const [auth, setAuth] = useState([]);

  useEffect(() => {
    console.log(auth);
    if (auth.id) {
      console.log("load the reservations");
    } else {
      console.log("clear the reservations");
    }
    // client.Meat.findMany().then((response) =>
    //   console.log("this is the response", response)
    // );
  }, [auth]);

  useEffect(() => {
    const attemptLoginWithToken = async () => {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    }
  }, []);

  const login = async (credentials) => {
    let response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    if (response.ok) {
      const token = json.token;
      window.localStorage.setItem("token", token);
      response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    } else {
      console.log(json);
    }
  };

  const register = async (credentials) => {
    let response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let json = await response.json();
    if (response.ok) {
      const token = json.token;
      window.localStorage.setItem("token", token);
      response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      json = await response.json();
      if (response.ok) {
        setAuth(json);
      }
    } else {
      console.log(json);
    }
  };

  return (
    <>
      <div>
        <h1>Welcome to Pocket Butcher!</h1>
      </div>
      <div>
        <Login login={login} />
        <br />
        <Register register={register} />
      </div>
    </>
  );
}

export default App;
