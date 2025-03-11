import { StyleSheet } from "react-native";
import theme from "./theme";

const globalStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        flex: 1
    },


    //Text styles
    title: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.large,
        fontWeight: "bold",
        marginVertical: 20
    },
    text: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.medium
    },

    //Button styles
    button: {
        width: "80%",
        backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.medium,
        fontWeight: "bold"
    },

    //Link styles
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    link: {
        color: theme.colors.primary,
        fontWeight: "bold",
        fontSize: theme.fontSizes.medium
    },

    //Input styles
    input: {
        width: "80%",
        height: 40,
        color: theme.colors.text,
        backgroundColor: theme.colors.containerBackground,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderColor: theme.colors.mutedText,
        borderWidth: 1,
    },

    placeholderTextColor: theme.colors.mutedText,

    //Icon styles
    icon: {
        color: theme.colors.text
    },

    
    //Header and footer styles
    headerContainer: {
        height: 60,
        backgroundColor: theme.colors.primaryMuted,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    headerContent: {
        fontSize: theme.fontSizes.large,
        color: theme.colors.text,
        fontWeight: "bold"
    },
    footerContainer: {
        height: 50,
        backgroundColor: theme.colors.primaryMuted,
        alignItems: "center",
        justifyContent: "center",
        
    },
    footerContent: {
        fontSize: theme.fontSizes.small,
        color: theme.colors.text,
        fontWeight: "bold"
    }
})

export default globalStyles