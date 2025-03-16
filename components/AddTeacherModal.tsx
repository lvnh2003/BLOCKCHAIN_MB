import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Modal,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  HelperText,
  IconButton,
} from "react-native-paper";

interface TeacherFormData {
  name: string;
  code: string;
  birthdate: string;
  major?: string;
}

interface TeacherModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: TeacherFormData) => void;
}

const { height } = Dimensions.get("window");

const TeacherModal: React.FC<TeacherModalProps> = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<TeacherFormData>({
    name: "",
    code: "",
    birthdate: new Date().toISOString().split("T")[0],
    major: "",
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name) {
      errors.name = "Name is required";
    }
    
    if (!formData.code) {
      errors.code = "Teacher code is required";
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const isoDate = selectedDate.toISOString().split("T")[0];
      setFormData({ ...formData, birthdate: isoDate });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Teacher</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={onClose}
                style={styles.modalCloseButton}
              />
            </View>

            <ScrollView style={styles.formContainer}>
              <TextInput
                label="Full Name"
                placeholder="Enter teacher's full name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                style={styles.input}
                mode="outlined"
                error={!!formErrors.name}
                left={<TextInput.Icon icon="account" />}
              />
              {formErrors.name && <HelperText type="error">{formErrors.name}</HelperText>}

              <TextInput
                label="Teacher Code"
                placeholder="Enter teacher's code"
                value={formData.code}
                onChangeText={(text) => setFormData({ ...formData, code: text })}
                style={styles.input}
                mode="outlined"
                error={!!formErrors.code}
                left={<TextInput.Icon icon="card-account-details" />}
              />
              {formErrors.code && <HelperText type="error">{formErrors.code}</HelperText>}

              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <TextInput
                  label="Date of Birth"
                  value={formData.birthdate ? formatDate(new Date(formData.birthdate)) : ""}
                  style={styles.input}
                  mode="outlined"
                  editable={false}
                  left={<TextInput.Icon icon="calendar" />}
                  right={<TextInput.Icon icon="chevron-down" />}
                />
              </TouchableOpacity>

              <TextInput
                label="Major"
                placeholder="Enter teacher's major"
                value={formData.major}
                onChangeText={(text) => setFormData({ ...formData, major: text })}
                style={styles.input}
                mode="outlined"
                left={<TextInput.Icon icon="school" />}
              />

              <View style={styles.formActions}>
                <Button
                  mode="outlined"
                  onPress={onClose}
                  style={styles.cancelButton}
                  labelStyle={styles.cancelButtonLabel}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.submitButton}
                  labelStyle={styles.submitButtonLabel}
                >
                  Add Teacher
                </Button>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalCloseButton: {
    margin: 0,
  },
  formContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  datePickerButton: {
    marginBottom: 16,
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    borderColor: "#ddd",
  },
  cancelButtonLabel: {
    color: "#666",
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#374785",
  },
  submitButtonLabel: {
    color: "#fff",
  },
});

export default TeacherModal;
