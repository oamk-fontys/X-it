import React from "react";
import { useEffect, useState, useContext, createContext } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch('')
        .then(res => res.json())
        .then(json => {
            setRooms(json)
        })
    }, [])

    const getRoomById = (id) => {
        return rooms.find(e => e.id === id)
    }

    return (
        <RoomContext.Provider
            value={{
                rooms,
                getRoomById
            }}
        >
            {children}
        </RoomContext.Provider>
    )
}

export const useRooms = () => useContext(RoomContext)