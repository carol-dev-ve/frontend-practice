import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your application and provide authentication state and methods
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])
  
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear('user')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};