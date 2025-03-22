import React, {useEffect} from "react";
import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import RoomElement from "./RoomElement";
import globalStyles from "../../theme/globalStyles";
import {useNavigation} from "@react-navigation/native";

const companyRooms = [
    {id: "1", name: "Luxurious Ceramic Chips"},
    {id: "2", name: "Rustic Bronze Tuna"},
    {id: "3", name: "Bespoke Wooden Gloves"},
    {id: "4", name: "Awesome Bamboo Shirt"},
];
const companyName = "Exit Oulu";

export default function CompanyRooms() {
    const navigation = useNavigation();

    let companyRoomList = [
        <View key={0} style={globalStyles.cardContainer}>
            <Text style={[globalStyles.title, globalStyles.textError]}>Loading...</Text>
        </View>
    ];

    if (companyRooms.length !== 0) {
        companyRoomList = companyRooms.map((room, index) => (
            <RoomElement key={index} id={room.id} roomName={room.name}/>
        ));
    }

    return (
        <View style={{ paddingHorizontal: 5, paddingTop: 20, flex: 0.75 }}>
            <View style={{ paddingLeft: 10, marginBottom: 20 }}>
                <Text style={globalStyles.title}>{companyName}</Text>
            </View>

            <View>
                <TouchableOpacity
                    style={{
                        backgroundColor: globalStyles.button.backgroundColor,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        alignSelf: "flex-end",
                        height: 40,
                        marginRight: 10,
                    }}
                    onPress={() => navigation.navigate("Add Room")}
                >
                    <Text style={globalStyles.buttonText}>+  Add Room</Text>
                </TouchableOpacity>
            </View>

            <View style={[globalStyles.cardContainer, { marginHorizontal: 5 }]}>
                <View style={globalStyles.cardHeader}>
                    <Text style={globalStyles.title}>Room List</Text>
                </View>
                <View style={globalStyles.cardBody}>{companyRoomList}</View>
            </View>
        </View>
    );
}
