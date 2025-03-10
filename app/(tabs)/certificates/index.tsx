import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text, FAB, Avatar } from "react-native-paper";
import { AppBar } from "../../../components/AppBar";
import { Certificate } from "../../../types";

const certificatesData: Certificate[] = [
  { id: "1", name: "Web Development", issueDate: "2023-01-15" },
  { id: "2", name: "Data Science", issueDate: "2023-03-20" },
  { id: "3", name: "Blockchain Mastery", issueDate: "2023-06-10" },
  { id: "4", name: "AI & ML", issueDate: "2023-09-05" },
];

export default function Certificates() {
  const renderItem = ({ item }: { item: Certificate }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={item.name}
        subtitle={`📅 Issue Date: ${item.issueDate}`}
        left={(props) => <Avatar.Icon {...props} icon="certificate" />}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <AppBar title="🏆 Certificates" />
      <FlatList
        data={certificatesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Certificate"
        onPress={() => console.log("Add certificate")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "white",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "#6200ee",
  },
});
