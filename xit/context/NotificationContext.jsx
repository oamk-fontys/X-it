import React, { createContext, useState, useContext } from 'react';
import AppNotification from '../components/AppNotification';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 5000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification.message && (
        <AppNotification message={notification.message} type={notification.type} />
      )}
    </NotificationContext.Provider>
  );
};