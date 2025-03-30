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

    // get all bookings by user id if role is user
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
            getBookingById,
            createBooking,
            updateBooking
        }}>
        {children}
        </BookingContext.Provider>
    );
};

// export const BookingProvider = ({ children }) => {
//     const apiUrl = process.env.EXPO_PUBLIC_API_URL;
//     const { token } = useAuth();
//     const { showNotification } = useNotification();

//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     // REMOVE USE EFFECT IN FUTURE
//     // GET BOOKINGS BY USER ID SHOULD BE IMPLEMENTED ON BACKEND
//     useEffect(() => {
//         const fetchInitialBookings = async () => {
//             try {
//                 const res = await fetch(`${apiUrl}/booking`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (response.status == 401) {
//                     showNotification('Not authorized', 'error');
//                 }

//                 const data = await res.json();
//                 setBookings(data);
//             } catch (err) {
//                 console.error('Fetch initial bookings failed: ', err);
//                 showNotification('Internal error occured!', 'error');
//             }
//         };

//         if (token) {
//             fetchInitialBookings();
//         }
//     }, [token]);

//     // REMOVE THIS IN FUTURE
//     // GET BOOKINGS BY USER ID SHOULD BE IMPLEMENTED ON BACKEND
//     const getBookingsByUserId = (userId) => {
//         return bookings.filter(booking => booking.user.id === userId);
//     };

//     // ADD THIS IN FUTURE
//     // GET BOOKINGS BY USER ID SHOULD BE IMPLEMENTED ON BACKEND
//     // const getBookingsByUserId = async (userId) => {
//     //     try {
//     //         setLoading(true);
//     //         const response = await fetch(`${apiUrl}/booking/${userId}`, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`,
//     //             },
//     //         });

//     //         if (response.status == 401) {
//     //             showNotification('Not authorized');
//     //         }

//     //         const data = await response.json();
//     //         return data;
//     //     } catch (err) {
//     //         console.error('Fetch bookings by user id failed: ', err);
//     //         showNotification('Internal error occured!', 'error');
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     // get all bookings by user id if role is user
//     // get all bookings if role is admin
//     const getAllBookings = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${apiUrl}/booking`, {
//                 headers: {
//                 'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.status == 401) {
//                 showNotification('Not authorized', 'error');
//             }

//             const data = await response.json();
//             // remove this in future
//             setBookings(data);
//             return data;
//         } catch (err) {
//             console.error('Fetch all bookings failed: ', err);
//             showNotification('Internal error occured!', 'error');
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getBookingById = async (id) => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${apiUrl}/booking/${id}`, {
//                 headers: {
//                 'Authorization': `Bearer ${token}`,
//                 },
//             });

//             if (response.status == 401) {
//                 showNotification('Not authorized', 'error');
//             }

//             const data = await response.json();
//             return data;
//         } catch (err) {
//             console.error('Fetch booking by id failed: ', err);
//             showNotification('Internal error occured!', 'error');
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createBooking = async (bookingData) => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${apiUrl}/booking`, {
//                 method: 'POST',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(bookingData),
//             });

//             if (response.status == 401) {
//                 showNotification('Not authorized', 'error');
//             }

//             // this error should be handled properly
//             // room or timeslot may not be found
//             if (response.status == 404) {
//                 showNotification('Not found', 'error');
//             }

//             if (response.status == 403) {
//                 showNotification('Timeslot is already booked', 'error');
//             }

//             const data = await response.json();
//             // remove this in future
//             setBookings(prev => [...prev, data]);
//             return data;
//         } catch (err) {
//             console.error('Create booking failed: ', err);
//             showNotification('Internal error occured!', 'error');
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateBooking = async (id, bookingData) => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${apiUrl}/booking/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(bookingData),
//             });

//             if (response.status == 401 || response.status == 403) {
//                 showNotification('Not authorized', 'error');
//             }

//             if (response.status == 404) {
//                 showNotification('Booking not found', 'error');
//             }

//             const data = await response.json();

//             // remove this in future
//             setBookings(prev => 
//                 prev.map(booking => booking.id === id ? data : booking)
//             );
//             return data;
//         } catch (err) {
//             console.error('Update booking failed: ', err);
//             showNotification('Internal error occured!', 'error');
//             setError(true);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <BookingContext.Provider value={{
//             bookings,
//             loading,
//             error,
//             getAllBookings,
//             getBookingById,
//             createBooking,
//             updateBooking
//         }}>
//         {children}
//         </BookingContext.Provider>
//     );
// };

export const useBooking = () => useContext(BookingContext);