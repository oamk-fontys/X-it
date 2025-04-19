import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from "./NotificationContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { token } = useAuth();
    const { showNotification } = useNotification();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // get all bookings of the user
    const getAllUserBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/booking/user`, {
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
            console.error('Fetch all bookings failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // get all bookings if role is admin
    const getAllBookings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/booking`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status == 401) {
                showNotification('Not authorized', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Fetch all bookings failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getBookingById = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/booking/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status == 401) {
                showNotification('Not authorized', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Fetch booking by id failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const createBooking = async (bookingData) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (response.status == 401) {
                showNotification('Not authorized', 'error');
            }

            // this error should be handled properly
            // room or timeslot may not be found
            if (response.status == 404) {
                showNotification('Not found', 'error');
            }

            if (response.status == 403) {
                showNotification('Timeslot is already booked', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Create booking failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const generateQRtoken = async (booking_id) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/booking`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({'booking_id':booking_id}),
            });

            if (response.status == 401) {
                showNotification('Not authorized', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Booking validation failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const updateBooking = async (id, bookingData) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/booking/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (response.status == 401 || response.status == 403) {
                showNotification('Not authorized', 'error');
            }

            if (response.status == 404) {
                showNotification('Booking not found', 'error');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Update booking failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BookingContext.Provider value={{
            loading,
            error,
            getAllBookings,
            getAllUserBookings,
            getBookingById,
            createBooking,
            updateBooking,
            generateQRtoken
        }}>
        {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);