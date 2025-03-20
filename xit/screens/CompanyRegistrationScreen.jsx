import React, { useState } from "react";
import { View, TextInput, Text, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import { useAuth } from "../context/AuthContext";
import globalStyles from "../theme/globalStyles";

export default function CompanyRegistrationScreen({ navigation }) {
    const { registerCompany, user } = useAuth();

    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [vat, setVat] = useState("");
    const [description, setDescription] = useState("");

    const handleRegisterCompany = async () => {
        if (!companyName || !address || !city || !postalCode || !vat || !description) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        //Check user is logged in correctly
        if (!user || !user.id) {
            Alert.alert("Error", "User ID is missing. Please log in again.");
            return;
        }

        const success = await registerCompany(
            companyName,
            address,
            city,
            postalCode,
            vat,
            description,
            user.id
        );
        
        if (success) {
            navigation.navigate("Home");
        }
    };

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.mainContainer}>
                <View style={globalStyles.titleContainer}>
                    <Text style={globalStyles.title}>Register Your Company</Text>
                </View>

                {user && (
                    <View style={globalStyles.titleContainer}>
                        <Text style={globalStyles.textError}>
                            You are logged in as <Text style={globalStyles.subTitleSmall}>{user.username}</Text> and applying for ownership of a company.
                        </Text>
                    </View>
                )}

                <TextInput
                    style={globalStyles.input}
                    placeholder="Company Name"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={companyName}
                    onChangeText={setCompanyName}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Address"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="City"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={city}
                    onChangeText={setCity}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Postal Code"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={postalCode}
                    onChangeText={setPostalCode}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="VAT Number"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={vat}
                    onChangeText={setVat}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Description"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={description}
                    onChangeText={setDescription}
                />

                <TouchableOpacity style={globalStyles.button} onPress={handleRegisterCompany}>
                    <Text style={globalStyles.buttonText}>Register Company</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
