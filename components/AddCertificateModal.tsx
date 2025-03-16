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

interface CertificateFormData {
  name: string;
  issuedTo: string;
  createdAt: number;
  description?: string;
  status: "PENDING" | "SIGNED" | "APPROVED";
}

interface CertificateModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CertificateFormData) => void;
}

const { height } = Dimensions.get("window");

const CertificateModal: React.FC<CertificateModalProps> = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CertificateFormData>({
    name: "",
    issuedTo: "",
    createdAt: Date.now(),
    description: "",
    status: "PENDING",
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name) {
      errors.name = "Certificate name is required";
    }
    
    if (!formData.issuedTo) {
      errors.issuedTo = "Recipient is required";
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
      setFormData({ ...formData, createdAt: selectedDate.getTime() });
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
              <Text style={styles.modalTitle}>Issue New Certificate</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={onClose}
                style={styles.modalCloseButton}
              />
            </View>

            <ScrollView style={styles.formContainer}>
              <TextInput
                label="Certificate Name"
                placeholder="Enter certificate name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                style={styles.input}
                mode="outlined"
                error={!!formErrors.name}
                left={<TextInput.Icon icon="certificate" />}
              />
              {formErrors.name && <HelperText type="error">{formErrors.name}</HelperText>}

              <TextInput
                label="Issued To (Student Code)"
                placeholder="Enter student code"
                value={formData.issuedTo}
                onChangeText={(text) => setFormData({ ...formData, issuedTo: text })}
                style={styles.input}
                mode="outlined"
                error={!!formErrors.issuedTo}
                left={<TextInput.Icon icon="account" />}
              />
              {formErrors.issuedTo && <HelperText type="error">{formErrors.issuedTo}</HelperText>}

              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <TextInput
                  label="Issue Date"
                  value={formatDate(new Date(formData.createdAt))}
                  style={styles.input}
                  mode="outlined"
                  editable={false}
                  left={<TextInput.Icon icon="calendar" />}
                  right={<TextInput.Icon icon="chevron-down" />}
                />
              </TouchableOpacity>

              <TextInput
                label="Description"
                placeholder="Enter certificate description"
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                style={[styles.input, styles.textArea]}
                mode="outlined"
                multiline
                numberOfLines={4}
                left={<TextInput.Icon icon="text" />}
              />

              <View style={styles.statusContainer}>
                <Text style={styles.statusLabel}>Status:</Text>
                <View style={styles.statusOptions}>
                  <TouchableOpacity 
                    style={[
                      styles.statusOption, 
                      formData.status === "PENDING" && styles.statusOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, status: "PENDING" })}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      formData.status === "PENDING" && styles.statusOptionTextSelected
                    ]}>Pending</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.statusOption, 
                      formData.status === "SIGNED" && styles.statusOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, status: "SIGNED" })}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      formData.status === "SIGNED" && styles.statusOptionTextSelected
                    ]}>Signed</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.statusOption, 
                      formData.status === "APPROVED" && styles.statusOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, status: "APPROVED" })}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      formData.status === "APPROVED" && styles.statusOptionTextSelected
                    ]}>Approved</Text>
                  </TouchableOpacity>
                </View>
              </View>

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
                  Issue Certificate
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  statusOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statusOptionSelected: {
    backgroundColor: "#374785",
    borderColor: "#374785",
  },
  statusOptionText: {
    color: "#666",
    fontWeight: "500",
  },
  statusOptionTextSelected: {
    color: "#fff",
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

export default CertificateModal;
