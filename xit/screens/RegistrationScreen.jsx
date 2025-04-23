import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, SafeAreaView, ScrollView, Switch} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import CustomDropdown from '../components/CustomDropdown';
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
    const [countryCode, setCountryCode] = useState('358');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    //Formatted birthday logic
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');

    const [isCompany, setIsCompany] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyCity, setCompanyCity] = useState('');
    const [companyVat, setCompanyVat] = useState('');
    const [companyPostalCode, setCompanyPostalCode] = useState('');
    const [companyCountryCode, setCompanyCountryCode] = useState('358');
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');

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

        //VALIDATION 
        if (!email || !password || !confirmPassword || !username || !firstName || !lastName || !phoneNumber || !dateOfBirth) {
            showNotification('Please fill all fields.', 'error');
            return;
        }

        if (isCompany) {
            if (!companyName || !companyAddress || !companyCity || !companyVat || !companyPostalCode || !companyPhoneNumber) {
                showNotification('Please fill all company fields.', 'error');
                return;
            }
        }

        const fullPhoneNumber = '+' + (countryCode + phoneNumber).trim();
        const fullCompanyPhone = '+' + (companyCountryCode + companyPhoneNumber).trim();
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^\+?[0-9]{6,15}$/
        const usernameRegex = /^[A-Za-z0-9._-]+$/

        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        if (email.includes(' ')) {
            showNotification('Email cannot contain spaces.', 'error');
            return;
        }

        if (password.includes(' ')) {
            showNotification('Password cannot contain spaces.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match.', 'error');
            return;
        }

        if (username.includes(' ')) {
            showNotification('Username cannot contain spaces.', 'error');
            return;
        }

        if (!usernameRegex.test(username)) {
            showNotification(
                'Username can only contain letters, numbers, underscores (_), dots (.) and hyphens (-).',
                'error'
            );
            return;
        }

        if (!birthDay || !birthMonth || !birthYear) {
            showNotification('Please select a valid date of birth', 'error');
            return;
        }

        if (!phoneRegex.test(fullPhoneNumber)) {
            showNotification('Please enter a valid phone number.', 'error');
            return;
        }

        if (isCompany && !phoneRegex.test(fullCompanyPhone)) {
            showNotification('Please enter a valid company phone number.', 'error');
            return;
        }

        const payload = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            username: username,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: fullPhoneNumber,
            dateOfBirth: dateOfBirth,
            ...(isCompany && {
              company: {
                name: companyName,
                address: companyAddress,
                city: companyCity,
                vat: companyVat,
                postalCode: companyPostalCode,
                phoneNumber: fullCompanyPhone,
                description: 'Coming soon...',
                verified: false
              },
            }),
          };


        try {
            const succeed = await register(payload);
            if (succeed) {
                navigation.navigate('Login');
                showNotification('Registration success', 'success');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={globalStyles.safeArea}>
            <ScrollView>
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

                    <View style={[globalStyles.verticalAlignContainer, { width: '80%' }]}>
                        <View style={globalStyles.horizontalAlignContainer}>
                            <View style={[globalStyles.verticalAlignContainer, { marginTop: 6, marginRight: 4 }]}>
                                <Text style={globalStyles.text}>+</Text>
                            </View>

                            <TextInput
                                style={[globalStyles.input, { width: 50, marginRight: 4 }]}
                                placeholder="358"
                                placeholderTextColor={globalStyles.placeholderTextColor}
                                value={countryCode}
                                keyboardType="number-pad"
                                onChangeText={setCountryCode}
                            />
                            <TextInput
                                style={[globalStyles.input, { flex: 1 }]}
                                placeholder="Phone number"
                                placeholderTextColor={globalStyles.placeholderTextColor}
                                value={phoneNumber}
                                keyboardType="phone-pad"
                                onChangeText={setPhoneNumber}
                            />

                        </View>
                    </View>

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

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                        <Switch
                            value={isCompany}
                            onValueChange={setIsCompany}
                        />
                        <Text style={globalStyles.text}> Register as company owner</Text>
                    </View>

                    {isCompany && (
                        <>
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
                                value={companyAddress}
                                onChangeText={setCompanyAddress}
                            />
                            <TextInput
                                style={globalStyles.input}
                                placeholder="City"
                                placeholderTextColor={globalStyles.placeholderTextColor}
                                value={companyCity}
                                onChangeText={setCompanyCity}
                            />
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Postal Code"
                                placeholderTextColor={globalStyles.placeholderTextColor}
                                value={companyPostalCode}
                                keyboardType="number-pad"
                                onChangeText={setCompanyPostalCode}
                            />
                            <TextInput
                                style={globalStyles.input}
                                placeholder="VAT Number"
                                placeholderTextColor={globalStyles.placeholderTextColor}
                                value={companyVat}
                                onChangeText={setCompanyVat}
                            />

                            <View style={[globalStyles.verticalAlignContainer, { width: '80%' }]}>
                                <View style={globalStyles.horizontalAlignContainer}>
                                    <View style={[globalStyles.verticalAlignContainer, { marginTop: 6, marginRight: 4 }]}>
                                        <Text style={globalStyles.text}>+</Text>
                                    </View>

                                    <TextInput
                                        style={[globalStyles.input, { width: 50, marginRight: 4 }]}
                                        placeholder="358"
                                        placeholderTextColor={globalStyles.placeholderTextColor}
                                        value={companyCountryCode}
                                        keyboardType="number-pad"
                                        onChangeText={setCompanyCountryCode}
                                    />
                                    <TextInput
                                        style={[globalStyles.input, { flex: 1 }]}
                                        placeholder="Phone number"
                                        placeholderTextColor={globalStyles.placeholderTextColor}
                                        value={companyPhoneNumber}
                                        keyboardType="phone-pad"
                                        onChangeText={setCompanyPhoneNumber}
                                    />
                                </View>
                            </View>
                        </>
                    )}

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
            </ScrollView>
        </SafeAreaView>
    );
};
