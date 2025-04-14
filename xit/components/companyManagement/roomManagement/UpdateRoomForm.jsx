import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Modal, StyleSheet, ScrollView, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useNotification } from '../../../context/NotificationContext';
import { useRooms } from '../../../context/RoomProvider';
import DropdownSelector from "../../DropdownSelector";

export default function UpdateRoomForm() {
    const navigation = useNavigation();
    const route = useRoute();
    const { roomId } = route.params;
    const { getRoomById, updateRoom } = useRooms();
    const { showNotification } = useNotification();
    
    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchRoomData = async () => {
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

        fetchRoomData();
    }, [roomId]);

    const [roomName, setRoomName] = useState(room.name);
    const [address, setAddress] = useState(room.address);
    const [phone, setPhone] = useState(room.phone);
    const [level, setLevel] = useState(room.difficulty);
    const [description, setDescription] = useState(room.description);
    const [image, setImage] = useState(room.image || null);
    const [imageName, setImageName] = useState(room.image ? "Current image" : null);
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
        navigation.navigate("CompanyRoomListScreen");
    };

    const handleCancel = () => {
        Alert.alert(
            "Discard Changes",
            "Are you sure you want to discard all changes?",
            [
                { text: "No", style: "cancel" },
                { text: "Yes", onPress: () => navigation.goBack() }
            ]
        );
    };

    return (
        <ScrollView 
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Update room</Text>
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
                label="Difficulty Level"
                selectedValue={level}
                onValueChange={setLevel}
                containerStyle={styles.dropdownContainer}
                textColor="#EEEEEE"
                backgroundColor="#393E46"
                accentColor="#00ADB5"
                iconColor="#00ADB5"
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Difficulty Level</Text>
                        <Picker
                            selectedValue={level}
                            onValueChange={(itemValue) => setLevel(itemValue)}
                            style={styles.picker}
                            dropdownIconColor="#00ADB5"
                        >
                            <Picker.Item label="Easy" value="Easy" style={styles.pickerItem} />
                            <Picker.Item label="Medium" value="Medium" style={styles.pickerItem} />
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
                    placeholder="Enter room description..."
                    placeholderTextColor="#777"
                />
            </View>

            {/* Upload Image Section */}
            <View style={styles.uploadSection}>
                <Text style={styles.sectionTitle}>Room Image</Text>
                <View style={styles.uploadContainer}>
                    <TouchableOpacity 
                        style={styles.uploadButton} 
                        onPress={pickImage}
                        activeOpacity={0.8}
                    >
                        <View style={styles.uploadButtonContent}>
                            <Ionicons name="image-outline" size={28} color="#00ADB5" />
                            <Text style={styles.uploadButtonText}>Change Image</Text>
                        </View>
                    </TouchableOpacity>
                    {imageName && (
                        <View style={styles.fileInfoContainer}>
                            <Ionicons name="checkmark-circle" size={16} color="#00ADB5" />
                            <Text style={styles.fileNameText}>
                                {imageName.length > 20 
                                    ? `${imageName.substring(0, 15)}...${imageName.substring(imageName.length - 5)}`
                                    : imageName}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Image Preview */}
            {image && (
                <View style={styles.imagePreviewContainer}>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.imagePreview} 
                        resizeMode="cover"
                    />
                    <TouchableOpacity 
                        style={styles.removeImageButton}
                        onPress={() => {
                            setImage(null);
                            setImageName(null);
                        }}
                    >
                        <Ionicons name="close-circle" size={24} color="#e74c3c" />
                    </TouchableOpacity>
                </View>
            )}

            {/* Form Actions */}
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.cancelActionButton]}
                    onPress={handleCancel}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>Discard Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>Update Room</Text>
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
        paddingBottom: 40,
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
        marginBottom: 22,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EEEEEE',
        marginBottom: 10,
        marginLeft: 5,
    },
    input: {
        backgroundColor: '#393E46',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#EEEEEE',
    },
    descriptionInput: {
        height: 140,
        textAlignVertical: 'top',
    },
    dropdownContainer: {
        marginBottom: 22,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    modalContent: {
        backgroundColor: "#393E46",
        borderRadius: 14,
        padding: 25,
        marginHorizontal: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    modalTitle: {
        color: '#EEEEEE',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        textAlign: 'center',
    },
    picker: {
        color: '#EEEEEE',
        backgroundColor: '#393E46',
    },
    pickerItem: {
        color: '#EEEEEE',
        backgroundColor: '#393E46',
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
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
        backgroundColor: "rgba(0, 173, 181, 0.3)",
        borderWidth: 1,
        borderColor: '#00ADB5',
    },
    buttonText: {
        color: "#EEEEEE",
        fontWeight: '600',
        fontSize: 16,
    },
    uploadSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#EEEEEE',
        marginBottom: 12,
        marginLeft: 5,
    },
    uploadContainer: {
        marginBottom: 5,
    },
    uploadButton: {
        backgroundColor: 'rgba(57, 62, 70, 0.6)',
        padding: 16,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#00ADB5',
        borderStyle: 'dashed',
    },
    uploadButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButtonText: {
        color: '#EEEEEE',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
    },
    fileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 5,
    },
    fileNameText: {
        color: "#00ADB5",
        fontSize: 14,
        marginLeft: 8,
        fontStyle: 'italic',
    },
    imagePreviewContainer: {
        alignItems: 'center',
        marginBottom: 25,
        position: 'relative',
    },
    imagePreview: {
        width: Dimensions.get('window').width * 0.8,
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#00ADB5',
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(34, 40, 49, 0.7)',
        borderRadius: 20,
        padding: 2,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    actionButton: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    saveButton: {
        backgroundColor: "rgba(0, 173, 181, 0.3)",
        borderWidth: 1.5,
        borderColor: '#00ADB5',
        marginLeft: 15,
    },
    cancelActionButton: {
        backgroundColor: "rgba(238, 238, 238, 0.1)",
        borderWidth: 1.5,
        borderColor: '#EEEEEE',
        marginRight: 15,
    },
    actionButtonText: {
        color: "#EEEEEE",
        fontWeight: '600',
        fontSize: 16,
        marginHorizontal: 5,
    },
});
