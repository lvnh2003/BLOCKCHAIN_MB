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
  Avatar,
  Divider,
  Switch,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface ProfileFormData {
  name: string;
  email: string;
  role: string;
  darkMode: boolean;
  notifications: boolean;
}

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => void;
  onLogout: () => void;
  initialData: ProfileFormData;
}

const { height } = Dimensions.get("window");

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  visible, 
  onClose, 
  onSubmit, 
  onLogout,
  initialData 
}) => {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name) {
      errors.name = "Name is required";
    }
    
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
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
              <Text style={styles.modalTitle}>Profile Settings</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={onClose}
                style={styles.modalCloseButton}
              />
            </View>

            <ScrollView style={styles.formContainer}>
              <View style={styles.profileHeader}>
                <Avatar.Image size={80} source={{ uri: "https://i.pravatar.cc/300?img=68" }} />
                <TouchableOpacity style={styles.changePhotoButton}>
                  <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                style={styles.input}
                mode="outlined"
                error={!!formErrors.name}
                left={<TextInput.Icon icon="account" />}
              />
              {formErrors.name && <HelperText type="error">{formErrors.name}</HelperText>}

              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                error={!!formErrors.email}
                left={<TextInput.Icon icon="email" />}
              />
              {formErrors.email && <HelperText type="error">{formErrors.email}</HelperText>}

              <TextInput
                label="Role"
                value={formData.role}
                style={styles.input}
                mode="outlined"
                editable={false}
                left={<TextInput.Icon icon="shield-account" />}
              />

              <Divider style={styles.settingsDivider} />

              <Text style={styles.settingsGroupTitle}>Preferences</Text>

              <View style={styles.settingItem}>
                <View style={styles.settingItemLeft}>
                  <MaterialIcons name="dark-mode" size={24} color="#666" style={styles.settingIcon} />
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                </View>
                <Switch
                  value={formData.darkMode}
                  onValueChange={(value) => setFormData({ ...formData, darkMode: value })}
                  color="#374785"
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingItemLeft}>
                  <MaterialIcons name="notifications" size={24} color="#666" style={styles.settingIcon} />
                  <Text style={styles.settingLabel}>Notifications</Text>
                </View>
                <Switch
                  value={formData.notifications}
                  onValueChange={(value) => setFormData({ ...formData, notifications: value })}
                  color="#374785"
                />
              </View>

              <Divider style={styles.settingsDivider} />

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
                  Save Changes
                </Button>
              </View>

              <Button
                mode="outlined"
                icon="logout"
                onPress={onLogout}
                style={styles.logoutButton}
                labelStyle={styles.logoutButtonLabel}
              >
                Logout
              </Button>
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
  profileHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  changePhotoButton: {
    marginTop: 12,
  },
  changePhotoText: {
    color: "#374785",
    fontWeight: "500",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  settingsDivider: {
    marginVertical: 16,
  },
  settingsGroupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
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
  logoutButton: {
    marginTop: 24,
    borderColor: "#e74c3c",
    borderWidth: 1,
  },
  logoutButtonLabel: {
    color: "#e74c3c",
  },
});

export default ProfileModal;
