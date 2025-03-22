import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Image, Alert, Modal} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import {useNavigation} from "@react-navigation/native";
import globalStyles from "../../theme/globalStyles";
import DropdownSelector from "../DropdownSelector";


export default function AddRoomForm() {
    const navigation = useNavigation();
    const [roomName, setRoomName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [level, setLevel] = useState("Easy");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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
        // need to fetch date from API
        console.log("Room Saved:", {roomName, address, phone, level, description, image});

        navigation.navigate("CompanyRoomListScreen");
    };

    const handleCancel = () => {
        Alert.alert(
            "Cancel",
            "Are you sure you want to cancel?",
            [
                {text: "No"},
                {text: "Yes", onPress: () => navigation.navigate("CompanyRoomListScreen")}
            ]
        );
    };

    return (
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
            {/* Room Name */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Room Name</Text>
            <TextInput
                style={[globalStyles.input, { width: "100%"}]}
                value={roomName}
                onChangeText={setRoomName}
            />

            {/* Address */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Address</Text>
            <TextInput
                style={[globalStyles.input, { width: "100%"}]}
                value={address}
                onChangeText={setAddress}
            />

            {/* Phone */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Phone</Text>
            <TextInput
                style={[globalStyles.input, { width: "100%"}]}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            {/* Level Dropdown */}
            <DropdownSelector
                label="Choose Level"
                selectedValue={level}
                onValueChange={setLevel}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View
                        style={{
                            backgroundColor: globalStyles.pickerContainer.backgroundColor,
                            borderRadius: 10,
                            padding: 20,
                            marginHorizontal: 20,
                        }}
                    >
                        <Picker
                            selectedValue={level}
                            onValueChange={(itemValue) => setLevel(itemValue)}
                            style={{ color: globalStyles.text.color }}
                        >
                            <Picker.Item label="Easy" value="Easy" />
                            <Picker.Item label="Middle" value="Middle" />
                            <Picker.Item label="Hard" value="Hard" />
                        </Picker>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: "gray", borderRadius: 5 }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: "white" }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 10, backgroundColor: "green", borderRadius: 5 }}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: "white" }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Description */}
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>Description</Text>
            <TextInput
                style={[globalStyles.input, {width: "100%"}, { height: 100 }]}
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
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                }}
            >
                <TouchableOpacity
                    style={[globalStyles.button, , { backgroundColor: "green" }]}
                    onPress={handleSave}
                >
                    <Text style={globalStyles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[globalStyles.button, {width: 150, marginHorizontal: 25}, { backgroundColor: "red" }]}
                    onPress={handleCancel}
                >
                    <Text style={globalStyles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
