import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from '@expo/vector-icons';
import globalStyles from "../theme/globalStyles";

export default function DropdownSelector({ label, selectedValue, onValueChange }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <Text style={[globalStyles.subTitleSmall, { marginBottom: 3 }]}>{label}</Text>
            <TouchableOpacity
                style={[
                    globalStyles.pickerContainer,
                    {
                        borderRadius: 5,
                        borderWidth: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 10,
                    },
                ]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={{ color: globalStyles.text.color, paddingVertical: 10 }}>
                    {selectedValue}
                </Text>
                <Ionicons name="chevron-down" size={20} color={globalStyles.text.color} />
            </TouchableOpacity>

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
                            selectedValue={selectedValue}
                            onValueChange={onValueChange}
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
        </View>
    );
}
