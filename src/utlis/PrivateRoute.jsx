import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const token = sessionStorage.getItem('token');
  // console.log("isAuthenticated", isAuthenticated);
  // return isAuthenticated && token ? children : <Navigate to="/login" replace />;
  return  token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
