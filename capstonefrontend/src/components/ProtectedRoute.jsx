import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!token || !user) {
    // If no token or user, redirect to login
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const userRole = user.role;

  // Check if the user's role matches the allowed roles
  if (!roles.includes(userRole)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
