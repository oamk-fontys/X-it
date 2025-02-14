import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import CommentElement from './recentCommentsComponents/CommentElement';

export default function RecentComments() {
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        let setter = [];
        [
            "Great job!",
            "This is exactly what I was looking for.",
            "Needs some improvement, but it's on the right track.",
            "Awesome! Keep it up!",
            "I don't fully agree with this point, but it's an interesting perspective.",
            "Short and to the point.",
            "Can you elaborate more on this part?",
            "Brilliant explanation! It really clarified a lot for me.",
            "The code could be optimized in some places, especially in the rendering function.",
            "Thanks for the detailed walkthrough. It helped me understand the concept much better.",
            "Not bad, but I think there are a few things that can be improved.",
            "Simply amazing. I'm impressed by how well this is written.",
            "Good effort, but consider adding more real-world examples.",
            "The UI is responsive and clean. Great design choices overall!",
            "A bit confusing in the second half—might want to break that part down further.",
            'Thanks for this explanation! It really cleared things up for me. I was struggling to understand how the flexbox layout works in React Native, but the way you broke it down with examples made it so much easier. I also appreciate how you included responsive design tips because that’s something I’ve been trying to improve on. Overall, this was super helpful, and I’m definitely bookmarking this for future reference!'
        ].forEach((e ,i) => {
            setter.push(
                <CommentElement
                    text={e}
                    key={i}
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
        paddingTop: 10
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