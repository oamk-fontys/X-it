import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from "./NotificationContext";

const StatisticContext = createContext();

export const StatisticProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { token } = useAuth();
    const { showNotification } = useNotification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // get all statistic of the user
    const getUserStatistic = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/statistic`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.message || 'Internal error occured!';
                showNotification(errorMessage, 'error');
                return;
            }

            return data;
        } catch (err) {
            console.error('Fetch user statistic failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StatisticContext.Provider value={{
            loading,
            error,
            getUserStatistic
        }}>
        {children}
        </StatisticContext.Provider>
    );
};

export const useStatistic = () => useContext(StatisticContext);