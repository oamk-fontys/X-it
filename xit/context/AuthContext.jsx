import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const { showNotification } = useNotification();

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPendingCompany, setHasPendingCompany] = useState(false);

  // check if user is logged in on app refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        // get token from storage
        const tok = await SecureStore.getItemAsync('authToken');

        if (tok) {
          // parse token and check expiration date
          const decodedToken = JSON.parse(atob(tok.split('.')[1]));
          const isExpired = decodedToken.exp * 1000 < Date.now();

          if (isExpired) {
            await SecureStore.deleteItemAsync('authToken');
            showNotification('Session expired', 'error');
          } else {
            setToken(tok);
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
            await checkPendingCompanyStatus(decodedToken.id);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        showNotification('Internal error occured!', 'error');
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(API_URL + '/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });

      if (response.ok) {
        const { access_token } = await response.json();

        await SecureStore.setItemAsync('authToken', access_token);

        const decodedToken = JSON.parse(atob(access_token.split('.')[1]));
        setToken(access_token);
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
        await checkPendingCompanyStatus(decodedToken.id);
      }

      if (response.status === 400 || response.status === 401) {
        showNotification('Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showNotification('Internal error occured!', 'error');
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
      const response = await fetch(API_URL + '/auth/register', {
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
        const data = await response.json();
        showNotification(data.message, 'error');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      showNotification('Internal error occured!', 'error');
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Internal error occured!', 'error');
    }
  };

  //Company registration
  const registerCompany = async (name, address, city, postalCode, vat, description, ownerId, logoId) => {
    try {
      const requestBody = {
        name,
        address,
        city,
        postalCode,
        vat,
        description,
        ownerId,
        verified: false,
        logoId
      };

      const response = await fetch(`${API_URL}/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register company");
      }

      showNotification("Company registered successfully!", "success");
      return true;
    } catch (error) {
      showNotification(error.message, "error");
      return false;
    }
  };

  const checkPendingCompanyStatus = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/company`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }

      const companies = await response.json();

      // DEBUG LOGS
      console.log("USER ID:", userId);
      console.log("COMPANIES:", companies);

      const pending = companies.find(
        (company) => company.ownerId === userId && company.verified === false
      );

      setHasPendingCompany(!!pending);
    } catch (error) {
      console.error("Failed to check pending company:", error);
      setHasPendingCompany(false);
    }
  };




  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, registerCompany, hasPendingCompany }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
