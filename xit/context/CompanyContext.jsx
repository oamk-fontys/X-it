import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from "./NotificationContext";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { token } = useAuth();
    const { showNotification } = useNotification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getAllCompanies = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/company`);

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Fetch all companies failed: ', err);
            showNotification('Internal error occurred!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getCompanyById = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/company/${id}`);

            if (response.status === 404) {
                showNotification('Company not found', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Fetch company by id failed: ', err);
            showNotification('Internal error occurred!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const createCompany = async (companyData) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/company`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companyData),
            });

            if (response.status === 400) {
                showNotification('Invalid company data', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Create company failed: ', err);
            showNotification('Internal error occurred!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const updateCompany = async (id, companyData) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/company/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(companyData),
            });

            if (response.status === 401) {
                showNotification('Not authorized', 'error');
            }

            if (response.status === 404) {
                showNotification('Company not found', 'error');
            }

            if (response.status === 400) {
                showNotification('Invalid company data', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Update company failed: ', err);
            showNotification('Internal error occurred!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CompanyContext.Provider value={{
            loading,
            error,
            getAllCompanies,
            getCompanyById,
            createCompany,
            updateCompany
        }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => useContext(CompanyContext);