import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
