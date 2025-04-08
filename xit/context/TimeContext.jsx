import React from "react";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL
    const { token } = useAuth();
    const { showNotification } = useNotification();
    const [ loading, setLoading ] = useState(false)

    const [timeSlots, setTimeSlots] = useState([])

    const getTimesByRoom = async(roomId, date) => {
        const getQueryDate = (date) => {
            const dateObject = new Date(date);
            return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`
        }

        setLoading(true)
        const query = (
            date
            ?
            `${apiUrl}/time-slots/${roomId}?date=${getQueryDate(date)}`
            :
            `${apiUrl}/time-slots/${roomId}`
        )

        fetch(query, {
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
        .finally(() => {
            setLoading(false)
        })
    }

    const sortTimeSlots = (slotsArray) => {
        let slots = slotsArray || [];

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

        return slots;
    }

    const getTimeSlotsByDay = (day) => {
        const weekday = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"][day];

        const slots =  timeSlots.filter(e => (
            e.day === weekday
        )) || [];

        return sortTimeSlots(slots)
    }

    const getFirstSlotByDay = (day) => {
        const start = sortTimeSlots(getTimeSlotsByDay(day))[0]?.start

        return getHour(start) + getMinute(start) / 60
    }

    const getLastSlotByDay = (day) => {
        const start =  sortTimeSlots(getTimeSlotsByDay(day)).at(-1)?.start

        return getHour(start) + getMinute(start) / 60
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
                getMinute,
                loading,
                getFirstSlotByDay,
                getLastSlotByDay
            }}
        >
            {children}
        </TimeContext.Provider>
    )
}

export const useTime = () => useContext(TimeContext)