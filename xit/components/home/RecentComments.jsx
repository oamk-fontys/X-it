import { View, StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import CommentElement from './recentComments/CommentElement';
import globalStyles from '../../theme/globalStyles';
import { useComments } from '../../context/CommentContext'

export default function RecentComments() {
    const { loading, recent } = useComments()

    let commentsList = [];

    let setter = [];
    
    recent.forEach((e, i) => {
        if (!e.played) {
            setter.push(
                <CommentElement
                    key={i}
                    text={e.content}
                    roomName={e.room?.name}
                    city={null}
                    username={e.user?.username}
                    date={e.updatedAt}
                    pfp={null}
                    roomId={e.room?.id}
                />
            )
        }
    })

    if (loading) {
        commentsList = [
            <Text
                style={globalStyles.text}
                key={0}
            >Loading...</Text>
        ]
    } else if (setter.length === 0) {
        commentsList = [
            <Text
                key={0}
                style={globalStyles.text}
            >No Comments</Text>
        ]
    } else {
        commentsList = [...setter]
    }

    return (
        <View
            style={globalStyles.cardContainer}
        >
            <View
                style={globalStyles.cardHeader}
            >
                <Text
                    style={globalStyles.title}
                >
                    Recent Comments
                </Text>
            </View>
            <View
                style={globalStyles.cardBody}
            >
                <ScrollView contentContainerStyle={{ gap: 5 }}>
                    {commentsList}
                </ScrollView>
            </View>
        </View>
    )
}