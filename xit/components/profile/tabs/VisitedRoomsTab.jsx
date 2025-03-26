import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import VisitedRoomCard from "../VisitedRoomCard";

export default function VisitedRoomsTab() {
  const visitedRooms = [
    { 
      id: 1, 
      rating: 4.5, 
      city: 'New York', 
      roomName: 'Meeting Room A',
      img: null 
    },
    { 
      id: 2, 
      rating: 3.8, 
      city: 'Los Angeles', 
      roomName: 'Conference Hall',
      img: null 
    },
    { 
      id: 3, 
      rating: 3.8, 
      city: 'Los Angeles', 
      roomName: 'Conference Hall',
      img: null 
    },
    { 
      id: 4, 
      rating: 3.8, 
      city: 'Los Angeles', 
      roomName: 'Conference Hall',
      img: null 
    },
  ];

  return (
    <FlatList
      data={visitedRooms}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <VisitedRoomCard 
          id={item.id}
          rating={item.rating}
          city={item.city}
          roomName={item.roomName}
          img={item.img}
        />
      )}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  separator: {
    height: 16,
  },
});
