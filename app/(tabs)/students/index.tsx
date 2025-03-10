import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Text, FAB, Avatar } from "react-native-paper";
import { AppBar } from "../../../components/AppBar";
import AddStudentModal from "@/components/AddStudentModal";

interface Student {
  id: string;
  name: string;
  studentId: string;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "John Doe", studentId: "S001" },
    { id: "2", name: "Jane Smith", studentId: "S002" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddStudent = (name: string, studentId: string) => {
    const newStudent = { id: Date.now().toString(), name, studentId };
    setStudents([...students, newStudent]);
  };

  return (
    <View style={styles.container}>
      <AppBar title="📚 Students" />
      <FlatList
        data={students}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={`🎓 ID: ${item.studentId}`}
              left={(props) => <Avatar.Text {...props} label={item.name[0]} size={40} />}
            />
          </Card>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        label="Add Student"
        onPress={() => setModalVisible(true)}
      />
      <AddStudentModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddStudent}
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
