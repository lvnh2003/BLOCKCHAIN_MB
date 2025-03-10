import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Surface } from "react-native-paper";
import { AppBar } from "../../components/AppBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>
      <AppBar title="🏠 Home" />
      <View style={styles.content}>
        <Text style={styles.title}>🎓 Student Management System</Text>

        <Surface style={styles.surface}>
          <Text style={styles.subtitle}>Quick Stats</Text>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <MaterialCommunityIcons name="account-group" size={30} color="#6200ee" />
              <Text style={styles.statText}>Total Students: 150</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <MaterialCommunityIcons name="certificate" size={30} color="#6200ee" />
              <Text style={styles.statText}>Total Certificates: 75</Text>
            </Card.Content>
          </Card>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  surface: {
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "white",
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statText: {
    fontSize: 16,
  },
});
