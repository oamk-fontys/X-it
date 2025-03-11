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
            style={globalStyles.container}
        >
            <View
                style={styles.body}
            >
                <View
                    style={styles.titleView}
                >
                    <Text
                        style={styles.titleText}
                    >
                        {roomName}
                    </Text>
                    <Text
                        style={styles.titleText}
                    >
                        {city}
                    </Text>
                </View>
                <View
                    style={styles.content}
                >
                    <View
                        style={styles.commentHead}
                    >
                        <Text
                            style={styles.commentHeadText}
                        >
                            {username}
                        </Text>
                        <Text
                            style={styles.commentHeadText}
                        >
                            {formatDate(date)}
                        </Text>
                    </View>
                    <View
                        style={styles.commentBody}
                    >
                        <View
                            style={styles.pfpView}
                        >
                            <Image
                                style={styles.pfp}
                                source={{uri: pfp || 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png'}}
                            />
                        </View>
                        <View
                            style={styles.commentTextView}
                        >
                            <Text
                                style={styles.commentText}
                            >
                                {text}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        paddingTop: 0,
        paddingBlock: 5,
    },
    body: {
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#222831',
        borderRadius: 10,
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: {width: 4, height: 2}
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