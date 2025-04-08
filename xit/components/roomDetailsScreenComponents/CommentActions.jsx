import React, { useState } from "react"
import { View, Modal, Text, StyleSheet, Pressable, TouchableOpacity, Alert, TextInput } from "react-native"
import globalStyles from "../../theme/globalStyles"
import { useAuth } from "../../context/AuthContext"
import { useComments } from "../../context/CommentContext"

export default function CommentActions({
    modalVisible,
    setModalVisible,
    commentId,
    userId,
    text,
    roomId,
    isSpoiler
}) {
    const [edited, setEdited] = useState(text)
    const [editingState, setEditingState] = useState(false)
    
    const { user } = useAuth()
    const { deleteComment, getCommentsByRoom, editComment } = useComments()

    return (
        <View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View
                    style={styles.container}
                >
                    <Pressable
                        style={styles.cancel}
                        onPress={() => {
                            setModalVisible(false)
                        }}
                    ></Pressable>
                    <View
                        style={styles.contentContainer}
                    >
                        <View
                            style={styles.body}
                        >
                            {/* Go to profile */}
                            <TouchableOpacity
                                style={styles.actionElementBody}
                                onPress={() => {
                                    setModalVisible(false)
                                }}
                            >
                                <Text
                                    style={styles.actionName}
                                >
                                    Go to profile
                                </Text>
                            </TouchableOpacity>
                            {
                                user?.id === userId
                                ?
                                <View>
                                    {/* Edit comment */}
                                    <TouchableOpacity
                                        style={styles.actionElementBody}
                                        onPress={() => {
                                            setModalVisible(false)
                                            setEditingState(true)
                                        }}
                                    >
                                        <Text
                                            style={styles.actionName}
                                        >
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                    {/* Delete comment */}
                                    <TouchableOpacity
                                        style={styles.actionElementBody}
                                        onPress={() => {
                                            Alert.alert(
                                                'Delete comment',
                                                'Are you sure you would like to delete comment?',
                                                [
                                                    {
                                                        text: 'Cancel',
                                                        style: 'cancel'
                                                    },
                                                    {
                                                        text: 'Delete',
                                                        style: 'destructive',
                                                        onPress: () => {
                                                            deleteComment(commentId)
                                                            .then(() => {
                                                                getCommentsByRoom(roomId, isSpoiler)
                                                            })
                                                        }
                                                    }
                                                ],
                                                {
                                                    cancelable: false
                                                }
                                            )
                                        }}
                                    >
                                        <Text
                                            style={styles.actionName}
                                        >
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null
                            }
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    setModalVisible(false)
                                }}
                            >
                                <Text
                                    style={[
                                        styles.actionName,
                                        {
                                            color: '#00ADB5'
                                        }
                                    ]}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={editingState}
                animationType="slide"
                transparent={true}
            >
                <View
                    style={styles.container}
                >
                    <View
                        style={[
                            styles.contentContainer,
                            {
                                flex: 1,
                                paddingTop: 60
                            }
                        ]}
                    >
                        <View
                            style={[
                                styles.body,
                                {
                                    flex: 1
                                }
                            ]}
                        >
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <TextInput
                                    style={styles.editInput}
                                    value={edited}
                                    onChangeText={text => {
                                        setEdited(text)
                                    }}
                                    multiline={true}
                                />
                            </View>
                            <View
                                style={styles.buttonsView}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setEditingState(false)
                                    }}
                                >
                                    <Text
                                        style={styles.actionName}
                                    >
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        editComment(commentId, edited.trim())
                                        .then(() => {
                                            getCommentsByRoom(roomId, isSpoiler)
                                        })
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.actionName,
                                            {
                                                color: '#00ADB5'
                                            }
                                        ]}
                                    >
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        style={styles.cancel}
                        onPress={() => {
                            setEditingState(false)
                        }}
                    ></Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    cancel: {
        width: '100%',
        flex: 1,
    },
    contentContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 30
    },
    body: {
        backgroundColor: '#EEEEEE',
        width: '100%',
        borderRadius: 15,
        padding: 20,

    },
    actionElementBody: {
        width: '100%',
        borderBottomColor: '#393E46',
        borderBottomWidth: 1,
        alignItems: 'center',
        marginBottom: 10
    },
    actionName: {
        color: '#393E46',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    cancelButton: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10
    },
    editInput: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        color: '#393E46',
        borderColor: '#393E46',

    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})