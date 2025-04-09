import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from '../../context/AuthContext';
import { useNotification } from "../../context/NotificationContext";
import { useCompany } from '../../context/CompanyContext';
import { useRooms } from '../../context/RoomProvider';

import CompanyHeader from "./CompanyHeader";
import AddRoomButton from "./AddRoomButton";
import RoomListCard from "./RoomListCard";
import globalStyles from "../../theme/globalStyles";

export default function CompanyRooms() {
    const navigation = useNavigation();
    const { user } = useAuth();
    const { showNotification } = useNotification();
    const { getAllCompanies } = useCompany();
    const { getRoomsByCompanyId } = useRooms();
    
    const [company, setCompany] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(false);

                // replace with get company by user id. It should be implemented on backend
                const companies = await getAllCompanies();
                // replace with actual company lookup by user.id
                const userCompany = companies[0];

                if (userCompany) {
                    setCompany(userCompany);
                    // replace with use.id
                    const roomsData = await getRoomsByCompanyId("12a69198-40c2-40f4-81ba-d9add30435ae");
                    setRooms(roomsData);
                } else {
                    setCompany(null);
                    setRooms([]);
                    showNotification("No company found for this user");
                }
            } catch (err) {
                setError(true);
                showNotification("Error fetching data");
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
      
        fetchData();
    }, []);

    const handleAddRoom = () => navigation.navigate("Add Room");
    const handleRoomPress = (roomId) => navigation.navigate("Room Management", { roomId });

    return (
        <View style={globalStyles.safeAreaContainer}>
            <CompanyHeader 
                name={company?.name} 
                address={company?.address} 
                phone={company?.phone} 
            />
            
            <AddRoomButton onPress={handleAddRoom} />
            
            <RoomListCard 
                rooms={rooms} 
                onRoomPress={handleRoomPress} 
                emptyMessage="No rooms available"
            />
        </View>
    );
}

// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import RoomElement from "./RoomElement";
// import globalStyles from "../../theme/globalStyles";

// import { useAuth } from '../../context/AuthContext';
// import { useNotification } from "../../context/NotificationContext";
// import { useCompany } from '../../context/CompanyContext';
// import { useRooms } from '../../context/RoomProvider';

// export default function CompanyRooms() {
//     const navigation = useNavigation();
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
//             try {
//                 setIsLoading(true);
//                 setError(false);

//                 const companies = await getAllCompanies();
//                 // const userCompany = companies.find(company => company.ownerId === user?.id);
//                 const userCompany = companies[0];

//                 if (userCompany) {
//                     setCompany(userCompany);
//                     // const roomsData = await getRoomsByCompanyId(userCompany.id);
//                     const roomsData = await getRoomsByCompanyId("12a69198-40c2-40f4-81ba-d9add30435ae");
//                     setRooms(roomsData);
//                 } else {
//                     setCompany(null);
//                     setRooms([]);
//                     showNotification("No company found for this user");
//                 }
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

//     if (isLoading) {
//         return (
//             <View style={[globalStyles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View style={[globalStyles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
//                 <Text>Error loading company data</Text>
//             </View>
//         );
//     }

//     if (!company) {
//         return (
//             <View style={[globalStyles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
//                 <Text>No company found</Text>
//             </View>
//         );
//     }

//     const companyRoomList = rooms.length > 0 ? (
//         <ScrollView>
//             {rooms.map(room => (
//                 <RoomElement 
//                     key={room.id}
//                     room={room}
//                     onPress={() => navigation.navigate("Room Management", { roomId: room.id })}
//                 />
//             ))}
//         </ScrollView>
//     ) : (
//         <Text style={{ textAlign: 'center', padding: 20 }}>No rooms available</Text>
//     );

//     return (
//         <View style={{ paddingHorizontal: 5, paddingTop: 20, flex: 1 }}>
//             <View style={{ paddingLeft: 10, marginBottom: 20 }}>
//                 <Text style={globalStyles.title}>{company.name}</Text>
//                 {company.address && <Text style={globalStyles.text}>{company.address}</Text>}
//                 {company.phone && <Text style={globalStyles.text}>Phone: {company.phone}</Text>}
//             </View>

//             <View>
//                 <TouchableOpacity
//                     style={{
//                         backgroundColor: globalStyles.button.backgroundColor,
//                         paddingVertical: 10,
//                         paddingHorizontal: 15,
//                         borderRadius: 5,
//                         alignSelf: "flex-end",
//                         height: 40,
//                         marginRight: 10,
//                         marginBottom: 15,
//                     }}
//                     onPress={() => navigation.navigate("Add Room")}
//                 >
//                     <Text style={globalStyles.buttonText}>+ Add Room</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={[globalStyles.cardContainer, { marginHorizontal: 5, flex: 1 }]}>
//                 <View style={globalStyles.cardHeader}>
//                     <Text style={globalStyles.title}>Room List</Text>
//                 </View>
//                 <View style={[globalStyles.cardBody, { flex: 1 }]}>
//                     {companyRoomList}
//                 </View>
//             </View>
//         </View>
//     );
// }
