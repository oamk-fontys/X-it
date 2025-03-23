import React from "react";
import { FlatList, StyleSheet } from "react-native";
import RoomElement from "../homeScreenComponents/popularRoomsComponents/RoomElement";

export default function VisitedRoomsTab(){
  const visitedRooms = [
    { id: 1, rating: 4.5, city: 'New York', roomName: 'Meeting Room A' },
    { id: 2, rating: 3.8, city: 'Los Angeles', roomName: 'Conference Hall' },
  ];

  return (
    <FlatList
      data={visitedRooms}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <RoomElement {...item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
});
