// src/contexts/LoginContext.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../ContextCreator';

export const LoginProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isLoggedIn = !!loggedInUser;
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('loggedInUser');
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData, token) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
    setLoggedInUser(userData);
    toast.success(`${userData.role} login successful!`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('token');
    setLoggedInUser(null);
    toast.success('You have been logged out successfully!');
    navigate('/');
  };

  return (
    <LoginContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        isLoggedIn,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
