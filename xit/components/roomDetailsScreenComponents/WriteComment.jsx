import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function WriteComment({ roomId, playedSection, setComments }) {
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
                />
            </View>
            <TouchableOpacity
                style={styles.postCommentView}
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
        flex: 2,
        width: '100%',
        backgroundColor: '#00ADB5',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputView: {
        flex: 1,
        height: '100%',
        padding: 5,
        paddingStart: 15,
        paddingEnd: 15
    },
    input: {
        height: '100%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        
    },
    postCommentView: {
        padding: 5,
        paddingEnd: 15,
        paddingStart: 0,
    },
})