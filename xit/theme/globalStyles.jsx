import { StyleSheet } from "react-native";
import themeLight from "./themeLight";

const globalStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: themeLight.colors.background
    },
    content: {
        flex: 1,
    },
    text: {
        color: themeLight.colors.text,
        fontSize: 16
    },
    button: {
        backgroundColor: themeLight.colors.primary,
        borderRadius: 5
    },
    title: {
        color: themeLight.colors.text,
        fontSize: 20,
        fontWeight: "bold",
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