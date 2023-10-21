import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children }) => {
    const user = useSelector(selectUser)
    console.log("user= ",user)
    if (!user) {
      return <Navigate to="/auth" />;
    }
  
    return children;
  
  };

export default PrivateRoute;
