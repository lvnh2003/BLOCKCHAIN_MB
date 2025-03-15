import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "@/types";

// Sample user data
const userData: User = {
  code: "USR12345",
  password: "••••••••",
  role: "TEACHER",
  name: "Tools Lateef",
  id: "TL-2023-001",
  avatar: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482740uFk/anh-mo-ta.png",
  birthdate: "15/04/1990"
};

const ProfileScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Get role color
  const getRoleColor = (role?: string) => {
    switch(role) {
      case "STUDENT": return "#4CAF50";
      case "TEACHER": return "#2196F3";
      case "MASTER": return "#FF9800";
      default: return "#757575";
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    return dateString;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: userData.avatar || "https://via.placeholder.com/150"
              }}
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{userData.name || "User Name"}</Text>
              <View style={[styles.roleBadge, { backgroundColor: getRoleColor(userData.role) }]}>
                <Text style={styles.roleText}>{userData.role || "ROLE"}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* User Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>User Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="identifier" size={24} color="#EF4637" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>User ID</Text>
                <Text style={styles.infoValue}>{userData.id || "Not specified"}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="barcode" size={24} color="#EF4637" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Code</Text>
                <Text style={styles.infoValue}>{userData.code}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="lock" size={24} color="#EF4637" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <Text style={styles.infoValue}>
                    {showPassword ? userData.password : "••••••••"}
                  </Text>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#757575" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="cake-variant" size={24} color="#EF4637" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Birthdate</Text>
                <Text style={styles.infoValue}>{formatDate(userData.birthdate)}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialCommunityIcons name="account-tie" size={24} color="#EF4637" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Role</Text>
                <Text style={[styles.infoValue, { color: getRoleColor(userData.role) }]}>
                  {userData.role || "Not specified"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#FDEDEB",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  nameContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  roleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#757575",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  footer: {
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  footerContainer: {
    padding: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 5,
  },
  statText: {
    fontSize: 14,
    color: "#FFF",
  },
});

export default ProfileScreen;