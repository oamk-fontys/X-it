import React from "react";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL
    const { token } = useAuth();
    const { showNotification } = useNotification();

    const [timeSlots, setTimeSlots] = useState([])

    const getTimesByRoom = async(roomId) => {
        fetch(`${apiUrl}/time-slots/${roomId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => {
            if (Array.isArray(json)) {
                setTimeSlots(json)
            } else {
                throw new Error(JSON.stringify(json.message))
            }
        })
        .catch(e => {
            showNotification(e.message)
        })
    }

    const getTimeSlotsByDay = (day) => {
        const weekday = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][day];

        let slots =  timeSlots.filter(e => (
            e.day === weekday
        )) || [];

        for (let n = 0; n < slots.length; n++) {
            for (let m = 0; m < slots.length - n - 1 ; m++) {
                if (
                    (
                        getHour(slots[m].start) > getHour(slots[m + 1].start)
                    )
                    ||
                    (
                        getHour(slots[m].start) === getHour(slots[m + 1].start)
                        &&
                        getMinute(slots[m].start) > getMinute(slots[m + 1].start)
                    )
                ) {
                    let setter = slots[m]
                    slots[m] = slots[m + 1]
                    slots[m + 1] = setter
                }
            }
        }

        return slots
    }

    const getHour = (time) => {
        if (!time) {
            return;
        }

        let hour = time.split(':')[0];
        if (hour[0] === '0') {
            hour = hour[1] || '0'
        }

        return +hour
    }

    const getMinute = (time) => {
        if (!time) {
            return;
        }

        let minute = time.split(':')[1];

        return +minute;
    }

    return (
        <TimeContext.Provider
            value={{
                getTimesByRoom,
                timeSlots,
                getTimeSlotsByDay,
                getHour,
                getMinute
            }}
        >
            {children}
        </TimeContext.Provider>
    )
}

export const useTime = () => useContext(TimeContext)