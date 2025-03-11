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
        fontSize: themeLight.fontSizes.medium
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },

    //Text styles
    title: {
        color: themeLight.colors.text,
        fontSize: themeLight.fontSizes.large,
        fontWeight: "bold",
        marginBottom: 20
    },

    //Button styles
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
        fontSize: themeLight.fontSizes.medium,
    },

    //Link styles
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    link: {
        color: themeLight.colors.primary,
        fontWeight: "bold",
    },


    //Input styles
    input: {
        width: "80%",
        height: 40,
        backgroundColor: themeLight.colors.primary,
        borderRadius: 5,
        paddingHorizontal: 10,
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
    footerContainer: {
        height: 50,
        backgroundColor: themeLight.colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        
    },
    footerContent: {
        fontSize: themeLight.fontSizes.small,
        fontWeight: "bold"
    }
})

export default globalStyles