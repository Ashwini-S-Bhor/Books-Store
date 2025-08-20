import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (currentUser) {
    return children;
  }

  // redirect to login and remember where user wanted to go
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
