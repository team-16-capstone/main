import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const checkIfAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('http://localhost:3001/api/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        return true;
      } else {
        localStorage.removeItem('token');
        return false;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      localStorage.removeItem('token');
      return false;
    }
  } else {
    localStorage.removeItem('token');
    return false;
  }
};

const ProtectedRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await checkIfAuthenticated();
      setIsLoggedIn(result);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
