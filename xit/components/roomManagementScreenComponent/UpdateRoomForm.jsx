import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import globalStyles from "../../theme/globalStyles";
import DropdownSelector from "../DropdownSelector";

export default function UpdateRoomForm() {
    const navigation = useNavigation();
    const route = useRoute();
    const { room } = route.params;

    const [roomName, setRoomName] = useState(room.name);
    const [address, setAddress] = useState(room.address);
    const [phone, setPhone] = useState(room.phone);
    const [level, setLevel] = useState(room.level);
    const [description, setDescription] = useState(room.description);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileName = uri.split('/').pop();
            setImage(uri);
            setImageName(fileName);
        }
    };

    const handleSave = () => {
        console.log("Updated Room:", { roomName, address, phone, level, description, image });
        navigation.goBack();
    };

    const handleCancel = () => {
        Alert.alert(
            "Cancel Update",
            "Are you sure you want to discard changes?",
            [
                { text: "No" },
                { text: "Yes", onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
            {/* Room Name */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Room Name</Text>
            <TextInput style={[globalStyles.input, { width: "100%"}]} value={roomName} onChangeText={setRoomName} />

            {/* Address */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Address</Text>
            <TextInput style={[globalStyles.input, { width: "100%"}]} value={address} onChangeText={setAddress} />

            {/* Phone */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Phone</Text>
            <TextInput style={[globalStyles.input, { width: "100%"}]} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

            {/* Level Dropdown */}
            <DropdownSelector
                label="Choose Level"
                selectedValue={level}
                onValueChange={setLevel}
            />

            {/* Description */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Description</Text>
            <TextInput
                style={[globalStyles.input, { height: 80, width: "100%" }]}
                multiline
                value={description}
                onChangeText={setDescription}
            />

            {/* Upload Image */}
            <TouchableOpacity style={[globalStyles.button, {width: "100%", marginTop: 20, marginBottom: 5}]} onPress={pickImage}>
                <Text style={globalStyles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
            {imageName && (
                <Text style={{ color: "red", fontSize: 12, marginBottom: 15 }}>
                    {`Selected file: ${imageName}`}
                </Text>
            )}

            {/* Save & Cancel Buttons */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                <TouchableOpacity style={[globalStyles.button, {width: 150, marginHorizontal: 25 }, { backgroundColor: "green" }]} onPress={handleSave}>
                    <Text style={globalStyles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[globalStyles.button, {width: 150, marginHorizontal: 25 }, { backgroundColor: "red" }]} onPress={handleCancel}>
                    <Text style={globalStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
