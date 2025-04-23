import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import StatCard from "../StatCard";

export default function StatsTab({ roomStats }) {

  const stats = {
    // Average score across all games
    avgScore: Math.round(
      roomStats.reduce((sum, stat) => sum + stat.score, 0) / roomStats.length || 0
    ),

    // Highest score achieved
    highScore: Math.max(...roomStats.map((stat) => stat.score), 0),

    // Total hints used across all games
    totalHints: roomStats.reduce((sum, stat) => sum + stat.hintsUsed, 0),

    // Average completion time (in minutes)
    avgCompletionTime: Math.round(
      roomStats.reduce((sum, stat) => sum + stat.timeOfCompletion, 0) /
        roomStats.length /
        60 || 0
    ),
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {roomStats.length > 0 ? (
        <>
          <StatCard title="Average Score" value={stats.avgScore} />
          <StatCard title="High Score" value={stats.highScore} />
          <StatCard title="Total Hints Used" value={stats.totalHints} />
          <StatCard
            title="Avg Completion Time"
            value={`${stats.avgCompletionTime} mins`}
          />
        </>
      ) : (
        <Text style={styles.noDataText}>No game statistics available yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  noDataText: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

// import React from "react";
// import { StyleSheet, ScrollView } from "react-native";
// import StatCard from "../StatCard";

// export default function StatsTab({ roomStats }) {
//   return (
//     <ScrollView 
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={styles.container}
//     >
//       <StatCard title="Total Bookings" value={roomStats.totalBookings} />
//       <StatCard title="Upcoming" value={roomStats.upcoming} />
//       <StatCard title="Favorites" value={roomStats.favorites} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 16,
//   },
// });
