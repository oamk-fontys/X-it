import React from "react";
import { useEffect, useState, useContext, createContext } from "react";
import { useNotification } from "./NotificationContext";
import { useAuth } from "./AuthContext";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const { showNotification } = useNotification();
    const { token } = useAuth();

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [loading, setLoading] = useState(true)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch(apiUrl + '/room')
        .then(res => res.json())
        .then(json => {
            if (Array.isArray(json)) {
                setRooms(json)
            } else {
                throw new Error(JSON.stringify(json.message))
            }
        })
        .catch(e => {
            showNotification(e.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const getAllRooms = async () => {
        fetch(apiUrl + '/room')
        .then(res => res.json())
        .then(json => {
            if (Array.isArray(json)) {
                setRooms(json)
            } else {
                throw new Error(JSON.stringify(json.message))
            }
        })
        .catch(e => {
            showNotification(e.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const getRoomById = (id) => {
        return rooms.find(e => e.id === id)
    }

    const searchForRoom = (query) => {
        if (query === '') {
            return rooms
        }

        let out = [];

        out = rooms.filter(e =>(
            e.name.toLowerCase().includes(query)
        ));

        out.push(...rooms.filter(e => (
            !out.includes(e)
            &&
            e.description.toLowerCase().includes(query)
        )));

        out.push(...rooms.filter(e => (
            !out.includes(e)
            &&
            e.company.id.toLowerCase().includes(query)
        )));

        return out;
    }

    const getCompanyNames = () => {
        let out = [];

        rooms.forEach(e => {
            if (!out.includes(e.company.name)) {
                out.push(e.company.name)
            }
        });

        return out;
    }

    const getCities = () => {
        let out = [];

        rooms.forEach(e => {
            if (!out.includes(e.company.city)) {
                out.push(e.company.city)
            }
        });

        return out
    }

    const filteredRooms = (rooms, filters) => {
        const { company } = filters;
        const { rating } = filters;
        const { city } = filters;

        let filtered = [];
        if (company && company.length !== 0) {
            filtered = rooms.filter(e => (
                company.includes(e.company.name)
            ))
        } else {
            filtered = rooms
        }

        if (rating && rating.length !== 0) {
            filtered = filtered.filter(() => false)
        }

        if (city && city.length !== 0) {
            filtered = filtered.filter(e => (
                city.includes(e.company.city)
            ))
        }

        return filtered
    }

    const getRoomByIdFromBackend = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/room/${id}`);

            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.message || 'Failed to find room';
                showNotification(errorMessage, 'error');
                return;
            }

            return data;
        } catch (err) {
            console.error('Fetch room by id from backend failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getVisitedRooms = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/room/visited-rooms`, {
                headers: {
                  "Authorization": `Bearer ${token}`,
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
            console.error('Fetch room by id from backend failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getRoomsByCompanyId = async (companyId) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/room/company/${companyId}`);

            // if (response.status == 404) {
            //     showNotification('Company not found', 'error');
            // }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('Fetch rooms by company id failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const createRoom = async (
        name,
        description,
        companyId,
        duration,
        cleanUpTime,
        difficulty,
        address,
        city,
        postalCode,
        country,
        phoneNumber
    ) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    companyId,
                    duration: Number(duration),
                    cleanUpTime: Number(cleanUpTime),
                    difficulty,
                    address,
                    city,
                    postalCode,
                    country,
                    phoneNumber
                })
            });

            console.log('DATA UPDATE REQUEST ' + JSON.stringify({
                name,
                description,
                companyId,
                duration: Number(duration),
                cleanUpTime: Number(cleanUpTime),
                difficulty,
                address,
                city,
                postalCode,
                country,
                phoneNumber,
                logoId
            }))
    
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.message || 'Failed to create room';
                showNotification(errorMessage, 'error');
                return;
            }

            showNotification('Room created successfully!', 'success');
            return data;
        } catch (err) {
            console.error('Create room failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };
    
    const updateRoom = async (
        roomId,
        name,
        description,
        companyId,
        duration,
        cleanUpTime,
        difficulty,
        address,
        city,
        postalCode,
        country,
        phoneNumber,
        logoId
    ) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/room/${roomId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    companyId,
                    duration: Number(duration),
                    cleanUpTime: Number(cleanUpTime),
                    difficulty,
                    address,
                    city,
                    postalCode,
                    country,
                    phoneNumber,
                    logoId
                })
            });
    
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.message || 'Failed to update room';
                showNotification(errorMessage, 'error');
                return;
            }

            showNotification('Room updated successfully!', 'success');
            return data;
        } catch (err) {
            console.error('Update room failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const deleteRoom = async (roomId) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/room/${roomId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            const data = await response.json();
            if (!response.ok) {
                const errorMessage = data.message || 'Failed to delete room';
                showNotification(errorMessage, 'error');
                return;
            }
    
            showNotification('Room deleted successfully!', 'success');
            return true;
        } catch (err) {
            console.error('Delete room failed: ', err);
            showNotification('Internal error occured!', 'error');
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const getRatingByRoom = async (roomId) => {
        try {
            const res = await fetch(`${apiUrl}/rating/room/${roomId}`)

            if (!res.ok) {
                throw new Error(`${res.status} Ratings error`)
            }

            const json = await res.json() || []

            return json.map(e => e.rating) || []
        } catch(e) {
            showNotification(e.message)
        }
    }

    const average = (arr) => {
        let sum = 0;

        arr.forEach(e => {
            sum += e;
        });

        return sum / arr.length
    }

    return (
        <RoomContext.Provider
            value={{
                rooms,
                getAllRooms,
                getRoomById,
                searchForRoom,
                getCompanyNames,
                getCities,
                filteredRooms,
                getRoomByIdFromBackend,
                getVisitedRooms,
                getRoomsByCompanyId,
                createRoom,
                updateRoom,
                deleteRoom,
                loading,
                getRatingByRoom,
                average
            }}
        >
            {children}
        </RoomContext.Provider>
    )
}

export const useRooms = () => useContext(RoomContext)