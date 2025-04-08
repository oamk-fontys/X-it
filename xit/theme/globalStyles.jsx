import { StyleSheet } from "react-native";
import theme from "./theme";

const globalStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background
    },

    //Container styles
    mainContainer: {
        justifyContent: "center",
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        padding: 20
    },
    horizontalAlignContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    verticalAlignContainer: {
        flexDirection: 'column',
    },
    container: {
        flex: 1,
    },


    //Text styles
    title: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.large,
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.5)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4
    },
    subTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.medium,
        fontWeight: "bold",
    },
    subTitleSmall: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.small,
        fontWeight: "bold",
    },
    text: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.medium
    },
    textSmall: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.small
    },
    textError: {
        color: theme.colors.textMuted,
        fontStyle: "italic",
        textAlign: 'center',
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


    //Card styles
    cardContainer: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: theme.colors.containerBackground,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeader: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        backgroundColor: theme.colors.primary,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    cardSubHeader: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    cardBody: {
        flex: 5,
        width: '100%',
        flexDirection: 'column',
        padding: 5,
        gap: 5,
    },
    cardItem: {
        backgroundColor: theme.colors.background,
        flex: 1,
        borderRadius: 5,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    cardItemImage: {
        flex: 1,
        aspectRatio: 1,
    },
    cardItemContent: {
        flex: 5,
        marginLeft: 10
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

    //Input styles
    input: {
        width: "80%",
        height: 40,
        color: theme.colors.text,
        backgroundColor: theme.colors.containerBackground,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderColor: theme.colors.textMuted,
        borderWidth: 1,
    },

    placeholderTextColor: theme.colors.textMuted,

    //Image styles

    imgContainer: {
        height: '100%',
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    imageRound: {
        height: "100%",
        width: "100%",
        borderRadius: 30,
    },
    noImage: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: theme.colors.textMuted,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //Icon styles
    icon: {
        color: theme.colors.text,
        margin: 2
    },
    iconPrimary: {
        color: theme.colors.primary,
        margin: 2
    },

    // picker styles
    pickerContainer: {
        width: "100%",
        height: 40,
        backgroundColor: theme.colors.containerBackground,
        borderRadius: 5,
        justifyContent: "center",
        paddingHorizontal: 10,
        marginBottom: 10,
        borderColor: theme.colors.textMuted,
        borderWidth: 1,
        position: "relative",
    },

    picker: {
        color: theme.colors.text,
        width: "100%",
        height: 40,
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
    },

    // map styles
    mapWrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },

})

export default globalStyles