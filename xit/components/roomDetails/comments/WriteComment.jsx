import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../../../context/AuthContext';
import { useComments } from '../../../context/CommentContext';

export default function WriteComment({ roomId, playedSection }) {
    const [text, setText] = useState('');

    const navigation = useNavigation();
    const { user } = useAuth();
    const { loading, postComment, getCommentsByRoom } = useComments()
    

    const postCommentPress = async () => {
        // unauthorized users are navigated to login page
        if (user) {
            postComment(
                text.trim(),
                roomId,
                playedSection
            )
            .then(() => {
                getCommentsByRoom(roomId, playedSection)
                setText('')
            })
        } else {
            navigation.navigate('Login');
        }
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
                    editable={!loading}
                />
            </View>
            <TouchableOpacity
                style={styles.postCommentView}
                onPress={postCommentPress}
                disabled={loading}
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