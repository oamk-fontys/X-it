import { StyleSheet } from "react-native";
import themeLight from "./themeLight";

const globalStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: themeLight.colors.background,
    },
    content: {
        flex: 1
    },
    text: {
        color: themeLight.colors.text,
        fontSize: 16
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
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
    linkText: {
        color: "#00ADB5",
        fontWeight: "bold",
        marginLeft: 5,
    },
    forgotPassword: {
        color: "#00ADB5",
        fontWeight: "bold",
    },
    title: {
        color: themeLight.colors.text,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },

    //Input styles
    input: {
        width: "80%",
        height: 40,
        backgroundColor: "#393E46",
        borderRadius: 5,
        paddingHorizontal: 10,
        color: "#fff",
        marginBottom: 10,
    },

    
    //HEADER AND FOOTER STYLES
    header: {
        height: 60,
        backgroundColor: themeLight.colors.secondary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    footer: {
        height: 50,
        backgroundColor: themeLight.colors.secondary,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default globalStyles