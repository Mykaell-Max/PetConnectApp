import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setId] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedId = await AsyncStorage.getItem('userId');
        if (storedToken && storedId) {
          setIsLoggedIn(true);
          setToken(storedToken);
          setId(storedId);
        }
      } catch (error) {
        console.error('Error reading token from AsyncStorage:', error);
      }
    };
    checkToken();
  }, []);

  const login = async (jwtToken, userId) => {
    try {
      setIsLoggedIn(true);
      setToken(jwtToken);
      setId(userId);
      await AsyncStorage.setItem('userToken', jwtToken);
      await AsyncStorage.setItem('userId', userId);
    } catch (error) {
      console.error('Error storing data in AsyncStorage:', error);
    }
  };

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      setToken(null);
      setId(null);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
    } catch (error) {
      console.error('Error removing data from AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);