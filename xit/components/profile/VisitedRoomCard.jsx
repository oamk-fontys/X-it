import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Rating from "../home/popularRooms/Rating";
import { useNavigation } from "@react-navigation/native";

export default function RoomElement({ id, rating, city, roomName, img }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.cardItem}
                onPress={() => navigation.navigate('Room Details', { id })}
                activeOpacity={0.8}
            >
                <View style={styles.imageContainer}>
                    {img ? (
                        <Image
                            style={styles.image}
                            source={{ uri: img }}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.noImage}>
                            <Text style={styles.noImageText}>
                                No Image Available
                            </Text>
                        </View>
                    )}
                </View>
                
                <View style={styles.content}>
                    <View style={styles.metaContainer}>
                        <Rating rating={rating} size={14} />
                        <Text style={styles.city}>{city}</Text>
                    </View>
                    <Text style={styles.title}>{roomName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#393E46',
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardItem: {
        flexDirection: 'column',
    },
    imageContainer: {
        height: 160,
        backgroundColor: '#222831',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    noImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222831',
    },
    noImageText: {
        color: '#EEEEEE',
        fontSize: 14,
        opacity: 0.6,
    },
    content: {
        padding: 16,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    city: {
        color: '#EEEEEE',
        fontSize: 14,
        opacity: 0.8,
    },
    title: {
        color: '#EEEEEE',
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
});