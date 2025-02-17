import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function WriteComment({ roomId, playedSection, comments, setComments }) {
    const [text, setText] = useState('');

    const postComment = () => {
        if (text) {
            setComments([
                {
                    text: text,
                    userName: 'unnamed',
                    date: new Date().toISOString(),
                    pfp: '',
                    played: playedSection
                },
                ...comments
            ])
        }
        setText('');
    }

    return (
        <View
            style={styles.writeComment}
        >
            <View
                style={styles.inputView}
            >
                <TextInput
                    style={styles.input}
                    placeholder={`Write comment for ${
                        playedSection
                        ?
                        'Did Play'
                        :
                        'Did Not Play'
                    } section...`}
                    placeholderTextColor='#EEEEEE'
                    value={text}
                    onChangeText={val => {
                        setText(val);
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.postCommentView}
                onPress={postComment}
            >
                <Ionicons
                    name="arrow-up-circle"
                    size={35}
                    color="#EEEEEE"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = new StyleSheet.create({
    writeComment: {
        width: '100%',
        backgroundColor: '#00ADB5',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputView: {
        flex: 1,
        padding: 5,
        paddingStart: 15,
        paddingEnd: 15
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        color: '#EEEEEE',
        fontSize: 16,
        height: 40
    },
    postCommentView: {
        padding: 5,
        paddingEnd: 15,
        paddingStart: 0,
    },
})