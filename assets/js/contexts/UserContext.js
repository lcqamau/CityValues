import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children, token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setUser(decodedToken);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};