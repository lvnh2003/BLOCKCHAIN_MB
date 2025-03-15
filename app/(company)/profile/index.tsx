import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Phần đầu (Header) */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482740uFk/anh-mo-ta.png",
              }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Tools Lateef</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.profession}>
              <Text style={{ fontSize: 22 }}>Profession</Text>
              <Text style={styles.texDesctiption}>UI/UX Designer</Text>
            </View>
            <View style={styles.contact}>
              <Text style={{ fontSize: 22 }}>Contact</Text>
              <Text style={styles.texDesctiption}>+84 123 456 789</Text>
            </View>
            <View style={styles.location}>
              <Text style={{ fontSize: 22 }}>Location</Text>
              <Text style={styles.texDesctiption}>
                Ho Chi Minh City, Vietnam
              </Text>
            </View>
            <View style={styles.position}>
              <Text style={{ fontSize: 22 }}>Position</Text>
              <Text style={styles.texDesctiption}>Senior Designer</Text>
            </View>
          </View>
        </View>

        {/* Phần thứ hai (Jobs Done) */}
        <View style={styles.jobsDone}>
          <Text style={styles.sectionTitle}>Jobs Done</Text>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Product Design</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Front end</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Visual Designer</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Voyager</Text>
            </View>
          </View>
        </View>

        {/* Phần cuối (Footer) */}
        <LinearGradient
          colors={["#6a11cb", "#2575fc"]} // Màu gradient
          style={styles.footer}
        >
          {/* Progress Bars */}
          <SafeAreaView style={styles.footerContainer}>
            <View style={styles.progressContainer}>
              <Text style={styles.progressTitle}>Skills</Text>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>UI/UX Design</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: "80%", backgroundColor: "#FFD700" },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Frontend Development</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: "60%", backgroundColor: "#32CD32" },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Communication</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: "90%", backgroundColor: "#1E90FF" },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Call-to-Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#FF4757" }]}
              >
                <Text style={styles.buttonText}>Hire Me</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#2ED573" }]}
              >
                <Text style={styles.buttonText}>View Portfolio</Text>
              </TouchableOpacity>
            </View>

            {/* Stats with Icons */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="trophy"
                  size={24}
                  color="#FFD700"
                />
                <Text style={styles.statNumber}>15</Text>
                <Text style={styles.statText}>Awards</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={24}
                  color="#32CD32"
                />
                <Text style={styles.statNumber}>37</Text>
                <Text style={styles.statText}>Projects</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                  color="#FF6B81"
                />
                <Text style={styles.statNumber}>99%</Text>
                <Text style={styles.statText}>Satisfaction</Text>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
    height: 300,
    padding: 0,
  },
  texDesctiption: {
    fontSize: 14,
    color: "#EF4637",
  },
  avatarContainer: {
    marginRight: 16,
    backgroundColor: "#FDEDEB",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profession: {
    fontSize: 18,
    color: "gray",
    marginTop: 4,
    display: "flex",
  },
  contact: {
    fontSize: 18,
    color: "gray",
    marginTop: 4,
    display: "flex",
  },
  location: {
    fontSize: 18,
    color: "gray",
    marginTop: 4,
    display: "flex",
  },
  position: {
    fontSize: 18,
    color: "gray",
    marginTop: 4,
    display: "flex",
  },
  jobsDone: {
    marginBottom: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 16,
  },
  card: {
    width: 152,
    backgroundColor: "#fff",
    height: 100,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: "#EF4637",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4637",
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
    flex: 1,
    display: "flex",
  },
  footerContainer: {
    padding: 16,
    flex: 1,
    height: "100%",
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  progressItem: {
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#FFF",
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
    justifyContent: "space-between",
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
