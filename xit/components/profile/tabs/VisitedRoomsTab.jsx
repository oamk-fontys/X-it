import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import VisitedRoomCard from "../VisitedRoomCard";

export default function VisitedRoomsTab({ visitedRooms }) {
  return (
    <View style={styles.container}>
      {visitedRooms.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No visited rooms</Text>
        </View>
      ) : (
        <FlatList
          data={visitedRooms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <VisitedRoomCard 
              id={item.id}
              rating={item.rating}
              city={item.city}
              roomName={item.name}
              img={item.logo ? item.logo.url : null}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  separator: {
    height: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
