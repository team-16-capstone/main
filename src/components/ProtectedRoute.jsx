import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  return isLoggedIn;
};

const ProtectedRoute = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
