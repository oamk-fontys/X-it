import React, { useState, useContext, createContext } from "react";
import { useNotification } from "./NotificationContext";
import { useAuth } from "./AuthContext";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const { showNotification } = useNotification()
    const { token } = useAuth()

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

    const postComment = async (content, roomId, isSpoiler) => {
        try {
            setLoading(true)
            
            if (content === '') {
                alert('Unable to post empty comment')
            } else {
                const body = {
                    content: content,
                    roomId: roomId,
                    isSpoiler: isSpoiler
                }
            

                const res = await fetch(`${apiUrl}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(body),
                })
                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                return res.json()
            }
        } catch(e) {
            showNotification(e.message)
        } finally {
            setLoading(false)
        }
    }

    const editComment = async (commentId, text) => {
        setLoading(true)

        const content = {
            content: text
        }

        try {
            if (text === '') {
                alert('Unable to post empty comment')
            } else {
                const res = await fetch(`${apiUrl}/comment/${commentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(content)
                })

                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                return res.json()
            }
        } catch(e) {
            showNotification(e.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteComment = async (commentId) => {
        setLoading(true)

        try {
            const res = await fetch(
                `${apiUrl}/comment/${commentId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )

            if (!res.ok) {
                throw new Error(res.statusText)
            }
        } catch(e) {
            showNotification(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <CommentContext.Provider
            value={{
                loading,
                spoiler,
                noSpoiler,
                getCommentsByRoom,
                postComment,
                editComment,
                deleteComment
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export const useComments = () => useContext(CommentContext)