import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import CustomDropdown from '../components/CustomDropdown';
//import PhoneCountryCode from '../components/PhoneCountryCodes';
import globalStyles from '../theme/globalStyles';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['defaultProps']);

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

    //Formatted birthday logic
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');

    const days = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));
    const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));
    const years = Array.from({ length: 60 }, (_, i) => {
        const year = new Date().getFullYear() - i;
        return { label: `${year}`, value: `${year}` };
    });

    const handleDateChange = (day, month, year) => {
        if (day && month && year) {
            const formatted = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`).toISOString();
            setDateOfBirth(formatted);
        }
    };


    const handleRegister = async () => {

        if (!birthDay || !birthMonth || !birthYear) {
            showNotification('Please select a valid date of birth', 'error');
            return;
        } else if (password !== confirmPassword) {
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
                    <Text style={globalStyles.title}>Sign up</Text>
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

                {/*<PhoneCountryCode
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                />*/}

                <View style={[globalStyles.verticalAlignContainer, { width: '80%' }]}>
                    <Text style={globalStyles.textMuted}>Birthday</Text>
                    <View style={globalStyles.horizontalAlignContainer}>
                        <CustomDropdown
                            placeholder="Day"
                            data={days}
                            value={birthDay}
                            onChange={(item) => {
                                setBirthDay(item.value);
                                handleDateChange(item.value, birthMonth, birthYear);
                            }}
                            style={{ marginRight: 4 }}
                        />
                        <CustomDropdown
                            placeholder="Month"
                            data={months}
                            value={birthMonth}
                            onChange={(item) => {
                                setBirthMonth(item.value);
                                handleDateChange(birthDay, item.value, birthYear);
                            }}
                            style={{ marginRight: 4 }}
                        />
                        <CustomDropdown
                            placeholder="Year"
                            data={years}
                            value={birthYear}
                            onChange={(item) => {
                                setBirthYear(item.value);
                                handleDateChange(birthDay, birthMonth, item.value);
                            }}
                        />
                    </View>
                </View>

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
