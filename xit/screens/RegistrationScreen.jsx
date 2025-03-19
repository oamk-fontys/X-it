import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import globalStyles from '../theme/globalStyles';

export default function RegistrationScreen({ navigation }) {

    const { register } = useAuth();
    const { showNotification } = useNotification();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            showNotification('Email and password required', 'error');
        }

        try {
            const succeed = await register(
                email,
                password,
                confirmPassword,
                username,
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
            );
            succeed && navigation.navigate('Login');
            succeed && showNotification('Registration success', 'success');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <View style={globalStyles.mainContainer}>
                <View style={globalStyles.titleContainer}>
                    <Text style={globalStyles.title}>Register</Text>
                </View>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Email"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Password"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Username"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="First Name"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Last Name"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Phone Number"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Date of Birth (DD.MM.YYYY)"
                    placeholderTextColor={globalStyles.placeholderTextColor}
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                />
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={handleRegister}>
                    <Text style={globalStyles.buttonText}>Register</Text>
                </TouchableOpacity>

                <View style={globalStyles.linkContainer}>
                    <Text style={[globalStyles.text, { marginRight: 5 }]}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={globalStyles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
