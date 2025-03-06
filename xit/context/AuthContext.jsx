import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

  // check if user is logged in on app refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        // get token from storage
        const token = await SecureStore.getItemAsync('authToken');

        if (token) {

            // parse token and check expiration date
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const isExpired = decodedToken.exp * 1000 < Date.now();

            if (isExpired) {
                await SecureStore.deleteItemAsync('authToken');
            } else {
                setUser({
                    id: decodedToken.id,
                    email: decodedToken.email,
                    username: decodedToken.username,
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                    phoneNumber: decodedToken.phoneNumber,
                    dateOfBirth: decodedToken.dateOfBirth,
                    role: decodedToken.role,
                    companyId: decodedToken.companyId
                });
            }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
        const response = await fetch( API_URL + '/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const { access_token } = await response.json();

        await SecureStore.setItemAsync('authToken', access_token);

        const decodedToken = JSON.parse(atob(access_token.split('.')[1]));
        setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            username: decodedToken.username,
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastName,
            phoneNumber: decodedToken.phoneNumber,
            dateOfBirth: decodedToken.dateOfBirth,
            role: decodedToken.role,
            companyId: decodedToken.companyId
        });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (
    email,
    password,
    confirmPassword,
    username,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth
  ) => {
    try {
      const response = await fetch( API_URL + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            username: username,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
