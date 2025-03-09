import React from "react";
import { useEffect, useState, useContext, createContext } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch(apiUrl + '/room')
        .then(res => res.json())
        .then(json => {
            setRooms(json)
        })
        .catch(e => {
            alert(e.message)
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
            e.name.includes(query)
        ));

        out.push(...rooms.filter(e => (
            !out.includes(e)
            &&
            e.description.includes(query)
        )));

        out.push(...rooms.filter(e => (
            !out.includes(e)
            &&
            e.companyId.includes(query)
        )));

        return out;
    }

    const getCompanies = () => {
        let out = [];

        rooms.forEach(e => {
            if (!out.includes(e.companyId)) {
                out.push(e.companyId)
            }
        });

        return out;
    }

    const filteredRooms = (rooms, filters) => {
        const { company } = filters;

        let filtered = [];
        if (company && company.length !== 0) {
            filtered = rooms.filter(e => (
                company.includes(e.companyId)
            ))
        } else {
            filtered = rooms
        }

        return filtered
    }

    return (
        <RoomContext.Provider
            value={{
                rooms,
                getRoomById,
                searchForRoom,
                getCompanies,
                filteredRooms
            }}
        >
            {children}
        </RoomContext.Provider>
    )
}

export const useRooms = () => useContext(RoomContext)