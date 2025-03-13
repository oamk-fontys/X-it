import { StyleSheet, View, Text, Image } from "react-native";
import globalStyles from "../../../theme/globalStyles";

export default function CommentElement({
    text,
    roomName,
    city,
    username,
    date,
    pfp
}) {
    const formatDate = (date) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];

        const month = months[new Date(date).getMonth()];
        const day = new Date(date).getDate();

        return `${day} ${month}`
    }

    return (
        <View
            style={[globalStyles.cardContainer, globalStyles.safeArea]}
        >
            <View
                style={globalStyles.cardHeader}
            >
                <Text
                    style={globalStyles.subTitle}
                >
                    {roomName}
                </Text>
                <Text
                    style={globalStyles.subTitleSmall}
                >
                    {city}
                </Text>
            </View>
            <View
                style={globalStyles.cardBody}
            >
                <View
                    style={globalStyles.cardSubHeader}
                >
                    <Text
                        style={globalStyles.subTitleSmall}
                    >
                        {username}
                    </Text>
                    <Text
                        style={globalStyles.subTitleSmall}
                    >
                        {formatDate(date)}
                    </Text>
                </View>
                <View
                    style={globalStyles.cardItem}
                >
                    <View
                        style={globalStyles.cardItemImage}
                    >
                        <Image
                            style={globalStyles.imageRound}
                            source={{ uri: pfp || 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png' }}
                        />
                    </View>
                    <View
                        style={globalStyles.cardItemContent}
                    >
                        <Text
                            style={globalStyles.textSmall}
                        >
                            {text}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    body: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#222831',
        borderRadius: 10,
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: { width: 4, height: 2 }
    },
    titleView: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#00ADB5',
        padding: 5,
        paddingStart: 10,
        paddingEnd: 10,
        justifyContent: 'space-between',
    },
    titleText: {
        fontWeight: 'bold',
        color: '#EEEEEE',
        fontSize: 14,
    },
    content: {
        width: '100%',
        flexDirection: 'column'
    },
    commentHead: {
        flexDirection: 'row',
        padding: 5,
        paddingStart: 10,
        paddingEnd: 10,
        justifyContent: 'space-between'
    },
    commentHeadText: {
        fontSize: 14,
        color: '#EEEEEE',
        fontWeight: 'bold'
    },
    commentBody: {
        flexDirection: 'row',
        padding: 10,
        paddingTop: 0
    },
    pfpView: {
        width: 60,
        height: 60,
    },
    pfp: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    commentTextView: {
        marginStart: 5,
        flex: 1,
        height: 60
    },
    commentText: {
        fontSize: 16,
        color: '#EEEEEE',
        fontWeight: 'bold'
    }
})