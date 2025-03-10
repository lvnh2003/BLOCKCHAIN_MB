import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, TextInput, Button, PaperProvider } from "react-native-paper";

interface AddStudentModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, studentId: string) => void;
}

export default function AddStudentModal({ visible, onClose, onSave }: AddStudentModalProps) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSave = () => {
    if (name && studentId) {
      onSave(name, studentId);
      setName("");
      setStudentId("");
      onClose();
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.title}>Add New Student</Text>
          <TextInput
            label="Student Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="Student ID"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={handleSave} style={styles.button}>
              Save
            </Button>
            <Button mode="outlined" onPress={onClose} style={styles.button}>
              Cancel
            </Button>
          </View>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
