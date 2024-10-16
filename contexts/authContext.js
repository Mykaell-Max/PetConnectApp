import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        setIsLoggedIn(true);
        setToken(storedToken);
      }
    };
    checkToken();
  }, []);

  const login = async (jwtToken) => {
    setIsLoggedIn(true);
    setToken(jwtToken);
    await AsyncStorage.setItem('userToken', jwtToken);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);