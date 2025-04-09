import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../../context/AuthContext';
import CommentElement from "./CommentElement";
import WriteComment from "./WriteComment";
import { useComments } from "../../context/CommentContext";
import globalStyles from "../../theme/globalStyles";

export default function Comments({ roomId }) {
    const [spoilerMode, setSpoilerMode] = useState(false);
    const [playedSection, setPlayedSection] = useState(false);

    const {
        spoiler,
        noSpoiler,
        getCommentsByRoom,
        loading
    } = useComments()
    const navigation = useNavigation();
    const { user } = useAuth();

    const content = (
        <View
            style={styles.content}
        >
            <ScrollView
                contentContainerStyle={styles.contentScrollable}
            >
                {(playedSection ? spoiler : noSpoiler).map((e, i) => (
                    <CommentElement
                        key={i}
                        username={e.user?.username}
                        text={e.content}
                        date={e.updatedAt}
                        pfp={null}
                        commentId={e.id}
                        userId={e.user?.id}
                        roomId={roomId}
                        isSpoiler={playedSection}
                    />
                ))}
            </ScrollView>
        </View>
    )

    const loadingView = (
        <View
            style={styles.content}
        >
            <Text
                style={globalStyles.text}
            >
                Loading...
            </Text>
        </View>
    )

    useEffect(() => {
        getCommentsByRoom(roomId, false)
        getCommentsByRoom(roomId, true)
    }, [])

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.body} 
            >
                <View
                    style={styles.header}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setPlayedSection(false);
                        }}
                        style={styles.headerView}
                    >
                        <Text
                            style={
                                !playedSection
                                ?
                                styles.headerTextChosen
                                :
                                styles.headerText
                            }
                        >
                            Did Not Play
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.headerTextChosen}
                    >
                        |
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            // unauthorized users are navigated to login page
                            if (user) {
                                if (!spoilerMode) {
                                    Alert.alert(
                                        'Spoiler Alert',
                                        'This section contains comments, posted by people who alredy played the room. If you choose to continue, you might encounter spoilers. Are you sure you want to continue?',
                                        [
                                            {
                                                text: 'Cancel',
                                                style: 'cancel'
                                            },
                                            {
                                                text: 'Continue',
                                                onPress: () => {
                                                    setSpoilerMode(true);
                                                    setPlayedSection(true);
                                                },
                                                style: 'default'
                                            }
                                        ],
                                        {
                                            cancelable: false
                                        }
                                    )
                                } else {
                                    setPlayedSection(true);
                                }
                            } else {
                                navigation.navigate('Login');
                            }
                        }}
                        style={styles.headerView}
                    >
                        <Text
                            style={
                                playedSection
                                ?
                                styles.headerTextChosen
                                :
                                styles.headerText
                            }
                        >
                            Did Play
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    loading
                    ?
                    loadingView
                    :
                    content
                }
                <WriteComment
                    roomId={roomId}
                    playedSection={playedSection}
                />
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        height: 500,
    },
    body: {
        width: "100%",
        height: '100%',
        backgroundColor: '#393E46',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 15
    },
    header: {
        borderRadius: 15,
        width: '100%',
        backgroundColor: '#00ADB5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    headerView: {
        flex: 1,
    },
    headerText: {
        fontWeight: 'bold',
        color: '#393E46',
        textAlign: 'center',
        fontSize: 18
    },
    headerTextChosen: {
        fontWeight: 'bold',
        color: '#EEEEEE',
        textAlign: 'center',
        fontSize: 18,
    },
    content: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentScrollable: {
        alignItems: 'center',
        width: '100%'
    }
})