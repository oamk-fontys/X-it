import React from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import globalStyles from "../../theme/globalStyles";

const placeholderImage = require("../../assets/profile-placeholder.jpeg");

export default function RoomElement({id, roomName}) {
    const navigation = useNavigation();

    return (
        <View
            style={globalStyles.container}
        >
            <TouchableOpacity
                style={globalStyles.cardItem}
                onPress={() => navigation.navigate("Room Management", {roomId: id})}
            >
                <View style={globalStyles.cardItemImage}>
                    <Image source={placeholderImage} style={globalStyles.image}/>
                </View>

                <View style={globalStyles.cardItemContent}>
                    <Text style={globalStyles.subTitle}>{roomName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
