import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import CommentElement from './recentCommentsComponents/CommentElement';

export default function RecentComments() {
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        let setter = [];
        //fetching comments data from db
        //dummy data represents db response
        [
            {
              text: "Thanks for the detailed walkthrough. It helped me understand the concept much better.",
              roomName: "Anubis Curse",
              city: "Oulu",
              userName: "escaper_01",
              date: "2025-02-14T14:32:28.000Z",
              pfp: "",
            },
            {
              text: "Great experience! The puzzles were challenging but so much fun. Highly recommend this escape room!",
              roomName: "Mystic Manor",
              city: "Helsinki",
              userName: "mysteryFan99",
              date: "2025-02-13T11:20:45.000Z",
              pfp: "",
            },
            {
              text: "A bit confusing at first, but once we got the hang of it, everything made sense. Would love to come back!",
              roomName: "Lost in Time",
              city: "Tampere",
              userName: "timeTraveler",
              date: "2025-02-12T18:45:00.000Z",
              pfp: "",
            },
            {
              text: "The attention to detail was amazing! Felt like we were truly transported to another world.",
              roomName: "Pirate's Cove",
              city: "Turku",
              userName: "adventureSeeker",
              date: "2025-02-11T09:15:32.000Z",
              pfp: "",
            },
            {
              text: "The staff was super friendly and helpful. The hints were perfectly timed, and we had a blast!",
              roomName: "Haunted Hotel",
              city: "Jyväskylä",
              userName: "ghostHunter",
              date: "2025-02-10T16:22:18.000Z",
              pfp: "",
            },
            {
              text: "Amazing escape room! The final puzzle was a real brain-teaser, but we managed to escape with minutes to spare.",
              roomName: "Enigma Files",
              city: "Espoo",
              userName: "codeBreaker",
              date: "2025-02-09T14:12:10.000Z",
              pfp: "",
            },
            {
              text: "The storyline was so immersive, and the set design was incredible. Felt like being in a movie!",
              roomName: "Atlantis Secrets",
              city: "Oulu",
              userName: "deepDiver",
              date: "2025-02-08T12:30:55.000Z",
              pfp: "",
            },
            {
              text: "Not too easy, not too hard—just right! The whole team had a fantastic time solving the puzzles.",
              roomName: "Sherlock's Mystery",
              city: "Rovaniemi",
              userName: "detectiveWannabe",
              date: "2025-02-07T19:41:39.000Z",
              pfp: "",
            },
            {
              text: "The theme was super creative, and I loved how the puzzles connected to the story. Highly engaging!",
              roomName: "Space Odyssey",
              city: "Vaasa",
              userName: "galaxyExplorer",
              date: "2025-02-06T08:55:25.000Z",
              pfp: "",
            },
            {
              text: "We got stuck a couple of times, but the staff gave just enough hints to keep us moving. Great experience!",
              roomName: "Lab Experiment",
              city: "Kuopio",
              userName: "scienceNerd",
              date: "2025-02-05T21:14:05.000Z",
              pfp: "",
            },
            {
              text: "Challenging but super rewarding once you solve everything. Would definitely recommend to escape room enthusiasts!",
              roomName: "King’s Quest",
              city: "Lahti",
              userName: "questMaster",
              date: "2025-02-04T17:38:12.000Z",
              pfp: "",
            },
            {
              text: "The clues were clever, and the overall atmosphere was so intense! Had a blast from start to finish.",
              roomName: "Spy Academy",
              city: "Joensuu",
              userName: "stealthMode",
              date: "2025-02-03T13:05:48.000Z",
              pfp: "",
            },
            {
              text: "I’ve been to several escape rooms, and this one is by far the best. Will be bringing more friends next time!",
              roomName: "Dragon's Den",
              city: "Porvoo",
              userName: "dragonTamer",
              date: "2025-02-02T10:25:55.000Z",
              pfp: "",
            },
            {
              text: "Some puzzles were pretty tough, but we loved the challenge. The teamwork required made it even better.",
              roomName: "Ancient Relic",
              city: "Hämeenlinna",
              userName: "teamPlayer",
              date: "2025-02-01T15:49:23.000Z",
              pfp: "",
            },
            {
              text: "The ending was such a surprise! Really well thought out. Can’t wait to try another room from this company.",
              roomName: "Final Hour",
              city: "Seinäjoki",
              userName: "escapeArtist",
              date: "2025-01-31T20:00:00.000Z",
              pfp: "",
            }
          ].forEach((e ,i) => {
            setter.push(
                <CommentElement
                    key={i}
                    text={e.text}
                    roomName={e.roomName}
                    city={e.city}
                    username={e.userName}
                    date={e.date}
                    pfp={e.pfp}
                />
            )
        })

        setCommentsList(setter);
    }, [])

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
                        style={styles.title}
                    >
                        Recent Comments
                    </Text>
                </View>
                <View
                    style={styles.content}
                >

                    <ScrollView
                        contentContainerStyle={styles.scrollable}
                    >
                        {commentsList}
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    body: {
        height: '100%',
        width: '100%',
        backgroundColor: '#393E46',
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleView: {
        width: '100%',
        backgroundColor: '#00ADB5',
        borderRadius: 15,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#EEEEEE',
        marginStart: 20
    },
    content: {
        flex: 5,
        width: '100%',
        marginTop: 5,
    },
    scrollable: {
        flexDirection: 'column',
        alignItems: 'center'
    },
})