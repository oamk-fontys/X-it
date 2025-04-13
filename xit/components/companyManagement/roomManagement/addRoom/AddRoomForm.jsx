import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Modal, StyleSheet, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import DropdownSelector from "../../../DropdownSelector";

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
        console.log("Room Saved:", { roomName, address, phone, level, description, image });
        navigation.navigate("CompanyRoomListScreen");
    };

    const handleCancel = () => {
        Alert.alert(
            "Cancel",
            "Are you sure you want to cancel?",
            [
                { text: "No", style: "cancel" },
                { text: "Yes", onPress: () => navigation.navigate("CompanyRoomListScreen") }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add room</Text>
                <View style={styles.headerDivider} />
            </View>

            {/* Room Name */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Room Name</Text>
                <TextInput
                    style={styles.input}
                    value={roomName}
                    onChangeText={setRoomName}
                    placeholder="Enter room name"
                    placeholderTextColor="#777"
                />
            </View>

            {/* Address */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Enter address"
                    placeholderTextColor="#777"
                />
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter phone number"
                    placeholderTextColor="#777"
                />
            </View>

            {/* Level Dropdown */}
            <DropdownSelector
                label="Choose Level"
                selectedValue={level}
                onValueChange={setLevel}
                containerStyle={styles.dropdownContainer}
                textColor="#EEEEEE"
                backgroundColor="#393E46"
                accentColor="#00ADB5"
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Picker
                            selectedValue={level}
                            onValueChange={(itemValue) => setLevel(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Easy" value="Easy" style={styles.pickerItem} />
                            <Picker.Item label="Middle" value="Middle" style={styles.pickerItem} />
                            <Picker.Item label="Hard" value="Hard" style={styles.pickerItem} />
                        </Picker>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Description */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter room description"
                    placeholderTextColor="#777"
                />
            </View>

            {/* Upload Image */}
            <View style={styles.uploadContainer}>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#EEEEEE" />
                    <Text style={styles.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>
                {imageName && (
                    <Text style={styles.fileNameText}>
                        {`Selected: ${imageName}`}
                    </Text>
                )}
            </View>

            {/* Image Preview */}
            {image && (
                <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: image }} style={styles.imagePreview} />
                </View>
            )}

            {/* Save & Cancel Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.cancelActionButton]}
                    onPress={handleCancel}
                >
                    <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={handleSave}
                >
                    <Text style={styles.actionButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#222831",
    },
    header: {
        marginBottom: 25,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#EEEEEE',
        marginBottom: 8,
    },
    headerDivider: {
        height: 2,
        backgroundColor: '#00ADB5',
        width: '30%',
        borderRadius: 2,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EEEEEE',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#393E46',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        color: '#EEEEEE',
    },
    descriptionInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    dropdownContainer: {
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalContent: {
        backgroundColor: "#393E46",
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    picker: {
        color: '#EEEEEE',
        backgroundColor: '#393E46',
    },
    pickerItem: {
        color: '#EEEEEE',
        backgroundColor: '#393E46',
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: "rgba(238, 238, 238, 0.1)",
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    confirmButton: {
        backgroundColor: "rgba(0, 173, 181, 0.2)",
        borderWidth: 1,
        borderColor: '#00ADB5',
    },
    buttonText: {
        color: "#EEEEEE",
        fontWeight: '600',
        fontSize: 16,
    },
    uploadContainer: {
        marginBottom: 20,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 173, 181, 0.2)',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00ADB5',
    },
    uploadButtonText: {
        color: '#EEEEEE',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    fileNameText: {
        color: "#00ADB5",
        fontSize: 14,
        marginTop: 8,
        fontStyle: 'italic',
    },
    imagePreviewContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imagePreview: {
        width: 200,
        height: 150,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00ADB5',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    actionButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: "rgba(0, 173, 181, 0.2)",
        borderWidth: 1,
        borderColor: '#00ADB5',
        marginLeft: 10,
    },
    cancelActionButton: {
        backgroundColor: "rgba(238, 238, 238, 0.1)",
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginRight: 10,
    },
    actionButtonText: {
        color: "#EEEEEE",
        fontWeight: '600',
        fontSize: 16,
    },
});
