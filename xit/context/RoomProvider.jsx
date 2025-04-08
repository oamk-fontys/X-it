import React from "react";
import { useEffect, useState, useContext, createContext } from "react";
import { useNotification } from "./NotificationContext";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const { showNotification } = useNotification();

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
            // setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RoomContext.Provider
            value={{
                rooms,
                getRoomById,
                searchForRoom,
                getCompanyNames,
                getCities,
                filteredRooms,
                getRoomsByCompanyId,
                loading
            }}
        >
            {children}
        </RoomContext.Provider>
    )
}

export const useRooms = () => useContext(RoomContext)