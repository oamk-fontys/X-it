import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert("Error", "Username and password are required.");
            return;
        }

        try {
            // check the API address
            // const response = await fetch("https://??????/api/auth/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ username, password }),
            // });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Success", `Welcome back, ${username}!`);
                console.log("Token:", data.token);
            } else {
                Alert.alert("Login Failed", data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOG IN TO START</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
                <Text style={styles.text}>NOT A USER?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
                    <Text style={styles.linkText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")}>
                <Text style={styles.forgotPassword}>FORGOT PASSWORD</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222831",
    },
    title: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        height: 40,
        backgroundColor: "#393E46",
        borderRadius: 5,
        paddingHorizontal: 10,
        color: "#fff",
        marginBottom: 10,
    },
    button: {
        width: "80%",
        backgroundColor: "#00ADB5",
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    text: {
        color: "#fff",
    },
    linkText: {
        color: "#00ADB5",
        fontWeight: "bold",
        marginLeft: 5,
    },
    forgotPassword: {
        color: "#00ADB5",
        fontWeight: "bold",
    },
});

export default LoginScreen;
