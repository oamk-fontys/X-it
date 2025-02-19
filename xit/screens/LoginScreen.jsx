import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LOG IN TO START</Text>

            <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#aaa" />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#aaa" secureTextEntry />

            <TouchableOpacity style={styles.button}>
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
