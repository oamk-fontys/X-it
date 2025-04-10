import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";

import { useRooms } from '../context/RoomProvider';
import { useNotification } from "../context/NotificationContext";

import RoomDetails from "../components/companyManagement/roomManagement/RoomDetails";
import RoomActions from "../components/companyManagement/roomManagement/RoomActions";

export default function RoomManagementScreen() {
    const route = useRoute();
    const { roomId } = route.params;
    const { getRoomById } = useRooms();
    const { showNotification } = useNotification();
    
    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(false);
                const roomData = await getRoomById(roomId);
                setRoom(roomData);
            } catch (err) {
                setError(true);
                showNotification("Error fetching room data");
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
          
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00ADB5" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RoomDetails room={room} />
            <RoomActions roomId={roomId} room={room} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222831',
    },
});

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, ActivityIndicator } from "react-native";
// import { useRoute } from "@react-navigation/native";

// import { useRooms } from '../context/RoomProvider';
// import { useNotification } from "../context/NotificationContext";

// import RoomDetails from "../components/companyManagement/roomManagement/RoomDetails";
// import RoomActions from "../components/companyManagement/roomManagement/RoomActions";

// export default function RoomManagementScreen() {
//     const route = useRoute();
//     const { roomId } = route.params;
//     const { getRoomById } = useRooms();
//     const { showNotification } = useNotification();
    
//     const [room, setRoom] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);
//                 setError(false);
//                 const roomData = await getRoomById(roomId);
//                 setRoom(roomData);
//             } catch (err) {
//                 setError(true);
//                 showNotification("Error fetching room data");
//                 console.error("Fetch error:", err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
          
//         fetchData();
//     }, []);

//     if (isLoading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#00ADB5" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <RoomDetails room={room} />
//             <RoomActions roomId={roomId} room={room} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#222831',
//         padding: 20,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#222831',
//     },
// });

// import React from "react";
// import { View } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import globalStyles from "../theme/globalStyles";

// import { useRooms } from '../context/RoomProvider';

// import RoomDetails from "../components/companyManagement/roomManagement/RoomDetails";
// import RoomActions from "../components/companyManagement/roomManagement/RoomActions";

// export default function RoomManagementScreen() {
//     const route = useRoute();
//     const { roomId } = route.params;
//     const { getRoomById } = useRooms();

//     const [room, setRoom] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);
//                 setError(false);
    
//                 const roomData = await getRoomById(roomId);
//                 setRoom(roomData);
//             } catch (err) {
//                 setError(true);
//                 showNotification("Error fetching data");
//                 console.error("Fetch error:", err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
          
//         fetchData();
//     }, []);

//     return (
//         <View style={globalStyles.safeArea}>
//             <View style={{ paddingHorizontal: 20, flex: 1 }}>
//                 <RoomDetails room={room} />
//                 <RoomActions roomId={roomId} room={room} />
//             </View>
//         </View>
//     );
// }

// import React, { useState, useEffect } from "react";
// import { View } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import globalStyles from "../theme/globalStyles";

// import { useAuth } from '../context/AuthContext';
// import { useNotification } from "../context/NotificationContext";
// import { useCompany } from '../context/CompanyContext';
// import { useRooms } from '../context/RoomProvider';

// import RoomDetails from "../components/roomManagementScreenComponent/RoomDetails";
// import RoomActions from "../components/roomManagementScreenComponent/RoomActions";

// const companyRooms = [
//     { id: "1", name: "Luxurious Ceramic Chips", address: "Isokatu 11, 90100, Oulu", phone: "+358 12 3456 7890", level: "Easy", description: "This is Luxurious Ceramic Chips. Easy level. Available in Oulu." },
//     { id: "2", name: "Rustic Bronze Tuna", address: "Isokatu 11, 90100, Oulu", phone: "+358 12 3456 7890", level: "Hard", description: "A challenging escape room." },
// ];

// export default function RoomManagementScreen() {
//     const { user } = useAuth();
//     const { showNotification } = useNotification();
//     const { getAllCompanies } = useCompany();
//     const { getRoomsByCompanyId } = useRooms();
    
//     const [company, setCompany] = useState(null);
//     const [rooms, setRooms] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             setIsLoading(true);
//             setError(false);

//             const companies = await getAllCompanies();

//             // remove that in future
//             // endpoint should be implemented on backend
//             const userCompany = companies.find(company => company.ownerId === user?.id);

//             // const userCompany = await getCompanyByOwnerId(user?.id);
//             // setCompany(userCompany);

//             if (userCompany) {
//               setCompany(userCompany);
//               const roomsData = await getRoomsByCompanyId(userCompany.id);
//               setRooms(roomsData);
//             } else {
//               setCompany(null);
//               setRooms([]);
//             }
//           } catch (err) {
//             setError(true);
//           } finally {
//             setIsLoading(false);
//           }
//         };
      
//         fetchData();
//     }, []);

//     const route = useRoute();
//     const { roomId } = route.params;

//     return (
//         <View style={globalStyles.safeArea}>
//             <View style={{ paddingHorizontal: 20, flex: 1 }}>
//                 <RoomDetails room={room} />
//                 <RoomActions roomId={roomId} room={room} />
//             </View>
//         </View>
//     );
// }