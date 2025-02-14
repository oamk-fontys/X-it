import { StyleSheet, View, Text, Image } from "react-native";

//https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png

export default function CommentElement({ text }) {
    const roomName = `Dead Man's Island`;
    const city = 'Oulu';
    const username = 'TheGreatEscaper';
    const date = '14 Feb';
    const pfp = 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png';

    return (
        <View
            style={styles.container}
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
                            {date}
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
                                source={{uri: pfp}}
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
        borderRadius: 10
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
        width: '100%',
        height: '100%',
        borderRadius: '50%'
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