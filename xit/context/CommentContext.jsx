import React, { useState, useContext, createContext } from "react";
import { useNotification } from "./NotificationContext";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { showNotification } = useNotification()

    const [noSpoiler, setNoSpoiler] = useState([])
    const [spoiler, setSpoiler] = useState([])
    const [loading, setLoading] = useState(false)

    const getCommentsByRoom = async (roomId, isSpoiler) => {
        setLoading(true)

        fetch(`${apiUrl}/comment/${roomId}?isSpoiler=${isSpoiler}`)
        .then(res => {
            if (res => {
                if (!res.ok || !res) {
                    throw new Error(res.statusText)
                }
            })

            return res.json()
        })
        .then(json => {
            if (isSpoiler) {
                setSpoiler(json)
            } else {
                setNoSpoiler(json);
            }
        })
        .catch(e => {
            showNotification(e.message)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return (
        <CommentContext.Provider
            value={{
                loading,
                spoiler,
                noSpoiler,
                getCommentsByRoom
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export const useComments = () => useContext(CommentContext)