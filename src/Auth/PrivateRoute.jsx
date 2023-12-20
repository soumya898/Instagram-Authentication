// PrivateRoute.js

import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Token from '../Context/Token';

const PrivateRoute = ({ element, ...rest }) => {
  const { token } = useContext(Token);

  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
