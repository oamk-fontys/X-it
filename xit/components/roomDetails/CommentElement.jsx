import { StyleSheet, View, Text, Image, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import globalStyles from "../../theme/globalStyles";
import CommentActions from "./CommentActions";

export default function CommentElement({ username, text, pfp, date, commentId, userId, roomId, isSpoiler }) {
    const [modalVisible, setModalVisible] = useState(false);

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

        const dateObject = new Date(date);

        const hours = dateObject.getHours();
        let minutes = dateObject.getMinutes().toString();
        if (minutes.length === 1) {
            minutes = `0${minutes}`
        }
        const month = months[dateObject.getMonth()];
        const day = dateObject.getDate()

        return `${hours}:${minutes} ${day} ${month}`
    }

    return (
        <View
            style={styles.container}
        >
            <Pressable
                style={styles.body}
                onPress={() => {
                    setModalVisible(true)
                }}
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
                    style={styles.content}
                >
                    <View
                        style={styles.infoView}
                    >
                        <Text
                            style={styles.info}
                        >
                            {username}
                        </Text>
                        <Text
                            style={styles.info}
                        >
                            {formatDate(date)}
                        </Text>
                    </View>
                    <View
                        style={styles.textView}
                    >
                        <Text
                            style={styles.text}
                        >
                            {text}
                        </Text>
                    </View>
                </View>
            </Pressable>
            <CommentActions
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                commentId={commentId}
                userId={userId}
                text={text}
                roomId={roomId}
                isSpoiler={isSpoiler}
            />
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        paddingTop: 0,
    },
    body: {
        width: '100%',
        flexDirection: 'row',
    },
    pfpView: {
        padding: 5
    },
    pfp: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    content: {
        flex: 1,
        padding: 5,
    },
    infoView: {
        flexDirection: 'row',
        justifyContent: "space-between",

    },
    info: {
        fontWeight: 'bold',
        color: '#EEEEEE',
        fontSize: 14
    },
    textView: {
        marginTop: 5
    },
    text: {
        color: '#EEEEEE',
        fontSize: 18
    },
})