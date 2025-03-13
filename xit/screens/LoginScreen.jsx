import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useAuth } from '../context/AuthContext';
import globalStyles from "../theme/globalStyles";

export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {

        if (!email || !password) {
            Alert.alert("Error", "Email and password are required.");
            return;
        }

        try {
            await login(email, password);
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    return (
        <View style={globalStyles.safeArea}>
            <View style={globalStyles.mainContainer}>
                <View style={globalStyles.titleContainer}>
                    <Text style={globalStyles.title}>Log in</Text>
                </View>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Password"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    autoCapitalize="none"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
                    <Text style={globalStyles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={globalStyles.linkContainer}>
                    <Text style={[globalStyles.text, { marginRight: 5 }]}>Not registered?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Sign up")}>
                        <Text style={globalStyles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")}>
                    <Text style={globalStyles.link}>Forgot password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};