import React from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions } from "react-native";
import StatCard from "../StatCard";
import { LineChart, BarChart } from "react-native-chart-kit";
import * as Progress from "react-native-progress";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 48;

// Dark theme chart configuration
const darkChartConfig = {
  backgroundColor: "#222831",
  backgroundGradientFrom: "#222831",
  backgroundGradientTo: "#222831",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(238, 238, 238, ${opacity})`, // EE EEEE for text
  labelColor: (opacity = 1) => `rgba(238, 238, 238, ${opacity})`,
  barPercentage: 0.5,
  propsForDots: { 
    r: "5", 
    strokeWidth: "2", 
    stroke: "#00ADB5" // Teal accent color
  },
  fillShadowGradient: "#00ADB5",
  fillShadowGradientOpacity: 0.2,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
  barRadius: 4,
};

export default function StatsTab({ roomStats }) {
  // Calculate statistics
  const stats = {
    avgScore: Math.round(
      roomStats.reduce((sum, stat) => sum + stat.score, 0) / roomStats.length || 0
    ),
    highScore: Math.max(...roomStats.map((stat) => stat.score), 0),
    totalHints: roomStats.reduce((sum, stat) => sum + stat.hintsUsed, 0),
    avgCompletionTime: Math.round(
      roomStats.reduce((sum, stat) => sum + stat.timeOfCompletion, 0) /
        roomStats.length /
        60 || 0
    ),
    totalGames: roomStats.length,
    noHintGames: roomStats.filter(stat => stat.hintsUsed === 0).length,
  };

  // Prepare data for charts
  const scoreHistory = roomStats.map(stat => stat.score);
  const labels = roomStats.map((_, index) => `Game ${index + 1}`);

  // Calculate performance percentages (assuming 1000 is max score)
  const MAX_SCORE = 1000;
  const highScoreRatio = stats.highScore / MAX_SCORE;
  const avgScoreRatio = stats.avgScore / MAX_SCORE;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {roomStats.length > 0 ? (
        <>
          {/* Performance Section */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Performance</Text>
            <View style={styles.progressCirclesContainer}>
              <View style={styles.progressCircleWrapper}>
                <Progress.Circle
                  size={100}
                  progress={highScoreRatio}
                  showsText={true}
                  formatText={() => `${Math.round(highScoreRatio * 100)}%`}
                  color="#00ADB5" // Teal accent color
                  thickness={8}
                  borderWidth={0}
                  unfilledColor="#393E46" // Darker background
                />
                <Text style={styles.chartSubtitle}>High Score</Text>
              </View>
              <View style={styles.progressCircleWrapper}>
                <Progress.Circle
                  size={100}
                  progress={avgScoreRatio}
                  showsText={true}
                  formatText={() => `${Math.round(avgScoreRatio * 100)}%`}
                  color="#4CAF50" // Green for contrast
                  thickness={8}
                  borderWidth={0}
                  unfilledColor="#393E46"
                />
                <Text style={styles.chartSubtitle}>Avg Score</Text>
              </View>
            </View>
          </View>

          {/* Charts Section */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Score Progress</Text>
            <LineChart
              data={{
                labels: labels,
                datasets: [{ data: scoreHistory }],
              }}
              width={chartWidth}
              height={220}
              chartConfig={darkChartConfig}
              bezier
              style={styles.chart}
            />
          </View>

          {/* Stats Cards - 3 per row */}
          <View style={styles.cardRow}>
            <StatCard 
              title="Avg Score" 
              value={stats.avgScore} 
              theme="dark"
            />
            <StatCard 
              title="High Score" 
              value={stats.highScore} 
              theme="dark"
            />
            <StatCard 
              title="Total Games" 
              value={stats.totalGames} 
              theme="dark"
            />
          </View>
          <View style={styles.cardRow}>
            <StatCard 
              title="Total Hints" 
              value={stats.totalHints} 
              theme="dark"
            />
            <StatCard 
              title="No-Hint Games" 
              value={stats.noHintGames} 
              theme="dark"
            />
            <StatCard 
              title="Avg Time" 
              value={`${stats.avgCompletionTime}m`} 
              theme="dark"
            />
          </View>
        </>
      ) : (
        <Text style={styles.noDataText}>No game statistics available yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
    paddingBottom: 40,
    backgroundColor: "#222831",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
  },
  chartContainer: {
    backgroundColor: "#393E46",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  progressCirclesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
  },
  progressCircleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#EEEEEE",
  },
  chartSubtitle: {
    fontSize: 14,
    color: "#EEEEEE",
    marginTop: 8,
    textAlign: "center",
  },
  chart: {
    borderRadius: 8,
    marginTop: 12,
    alignSelf: "center",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 24,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: "#EEEEEE",
  },
  noDataText: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#EEEEEE",
  },
});
