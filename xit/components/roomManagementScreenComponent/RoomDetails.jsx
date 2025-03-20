import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import globalStyles from "../../theme/globalStyles";

const placeholderImage = require("../../assets/profile-placeholder.jpeg");

export default function RoomDetails({ room }) {
    return (
        <View style={{ paddingHorizontal: 5, flex: 1 }}>
            {/* 房间名称 */}
            <Text style={[globalStyles.title, {marginTop: 15, marginLeft: -10}]}>{room.name}</Text>

            {/* 房间图片 */}
            <View style={{ alignItems: "center", marginVertical: 10 }}>
                <Image
                    source={placeholderImage}
                    style={{ width: "107%", height: 200, borderRadius: 5 }}
                    resizeMode="cover"
                />
            </View>

            {/* Room Info Section */}
            <View style={[globalStyles.cardContainer, {width: "107%", marginLeft: -10, marginTop: 10,marginBottom: 30 }]}>
                <View style={globalStyles.cardHeader}>
                    <Text style={globalStyles.title}>Room Info</Text>
                </View>
                <View style={globalStyles.cardBody}>
                    <InfoRow label="Name" value={room.name} />
                    <InfoRow label="Address" value={room.address} />
                    <InfoRow label="Phone" value={room.phone} />
                    <InfoRow label="Level" value={room.level} />
                    <InfoRow label="Description" value={room.description} />
                </View>
            </View>
        </View>
    );
}

const InfoRow = ({ label, value }) => (
    <View style={{ flexDirection: "row", marginTop: 3, marginBottom: 3 }}>
        <View style={{ flex: 1, padding: 8, backgroundColor: "#444", borderRadius: 5, marginRight: 5, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "#EEE", fontWeight: "bold" }}>{label}</Text>
        </View>
        <View style={{ flex: 2, padding: 8, backgroundColor: "#333", borderRadius: 5 }}>
            <Text style={{ color: "#EEE" }}>{value}</Text>
        </View>
    </View>
);

