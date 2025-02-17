import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import CommentElement from "./CommentElement";
import WriteComment from "./WriteComment";

export default function Comments({ roomId }) {
    const [spoilerMode, setSpoilerMode] = useState(false);
    const [playedSection, setPlayedSection] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let setter = [];

        [
            {
                text: "Thanks for the detailed walkthrough. It helped me understand the concept much better.",
                userName: "escaper_01",
                date: "2025-02-14T14:32:28.000Z",
                pfp: "",
                played: false
            },
            {
                text: "Great experience! The puzzles were challenging but so much fun. Highly recommend this escape room!",
                userName: "mysteryFan99",
                date: "2025-02-13T11:20:45.000Z",
                pfp: "",
                played: true
            },
            {
                text: "A bit confusing at first, but once we got the hang of it, everything made sense. Would love to come back!",
                userName: "timeTraveler",
                date: "2025-02-12T18:45:00.000Z",
                pfp: "",
                played: false
            },
            {
                text: "The attention to detail was amazing! Felt like we were truly transported to another world.",
                userName: "adventureSeeker",
                date: "2025-02-11T09:15:32.000Z",
                pfp: "",
                played: true
            },
            {
                text: "The staff was super friendly and helpful. The hints were perfectly timed, and we had a blast!",
                userName: "ghostHunter",
                date: "2025-02-10T16:22:18.000Z",
                pfp: "",
                played: false
            },
            {
                text: "Amazing escape room! The final puzzle was a real brain-teaser, but we managed to escape with minutes to spare.",
                userName: "codeBreaker",
                date: "2025-02-09T14:12:10.000Z",
                pfp: "",
                played: false
            },
            {
                text: "The storyline was so immersive, and the set design was incredible. Felt like being in a movie!",
                userName: "deepDiver",
                date: "2025-02-08T12:30:55.000Z",
                pfp: "",
                played: false
            },
            {
                text: "Not too easy, not too hard—just right! The whole team had a fantastic time solving the puzzles.",
                userName: "detectiveWannabe",
                date: "2025-02-07T19:41:39.000Z",
                pfp: "",
                played: false
            },
            {
                text: "The theme was super creative, and I loved how the puzzles connected to the story. Highly engaging!",
                userName: "galaxyExplorer",
                date: "2025-02-06T08:55:25.000Z",
                pfp: "",
                played: true
            },
            {
                text: "We got stuck a couple of times, but the staff gave just enough hints to keep us moving. Great experience!",
                userName: "scienceNerd",
                date: "2025-02-05T21:14:05.000Z",
                pfp: "",
                played: true
            },
            {
                text: "Challenging but super rewarding once you solve everything. Would definitely recommend to escape room enthusiasts!",
                userName: "questMaster",
                date: "2025-02-04T17:38:12.000Z",
                pfp: "",
                played: false
            },
            {
                text: "The clues were clever, and the overall atmosphere was so intense! Had a blast from start to finish.",
                userName: "stealthMode",
                date: "2025-02-03T13:05:48.000Z",
                pfp: "",
                played: true
            },
            {
                text: "I’ve been to several escape rooms, and this one is by far the best. Will be bringing more friends next time!",
                userName: "dragonTamer",
                date: "2025-02-02T10:25:55.000Z",
                pfp: "",
                played: false
            },
            {
                text: "Some puzzles were pretty tough, but we loved the challenge. The teamwork required made it even better.",
                userName: "teamPlayer",
                date: "2025-02-01T15:49:23.000Z",
                pfp: "",
                played: true
            },
            {
                text: "The ending was such a surprise! Really well thought out. Can’t wait to try another room from this company.",
                userName: "escapeArtist",
                date: "2025-01-31T20:00:00.000Z",
                pfp: "",
                played: false
            }
        ].forEach(e => {
            setter.push(e);
        })

        setComments(setter);
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
                <View
                    style={styles.content}
                >
                    <ScrollView
                        contentContainerStyle={styles.contentScrollable}
                    >
                        {comments.filter(
                            e => playedSection === e.played
                        ).map((e, i) => (
                            <CommentElement
                                key={i}
                                username={e.userName}
                                text={e.text}
                                date={e.date}
                                pfp={e.pfp}
                            />
                        ))}
                    </ScrollView>
                </View>
                <WriteComment
                    roomId={roomId}
                    playedSection={playedSection}
                    comments={comments}
                    setComments={setComments}
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
        flex: 1
    },
    contentScrollable: {
        alignItems: 'center',
        width: '100%'
    }
})