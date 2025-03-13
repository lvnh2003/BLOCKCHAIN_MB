"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Text, Card, Button, Avatar, Chip, Dialog, Portal, Searchbar, FAB, Divider } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useAuth } from "../../context/AuthContext"
import type { Certificate, CertificateResponeTeacher } from "@/types"
import { Ionicons } from "@expo/vector-icons"
import { formatTimestamp } from "@/utils/formatTime"
import { getAllCertificatesOfTeacher } from "@/utils/teacher/getAllCertificatesOFTeacher"

export default function TeacherDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [certificates, setCertificates] = useState<CertificateResponeTeacher[]>();


  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const mockCertificates: CertificateResponeTeacher[] = await getAllCertificatesOfTeacher(user);
        setCertificates(mockCertificates);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } 
    };
  
    fetchCertificates();
  }, [user]); 


  const filteredCertificates = certificates?.filter((cert) =>
    cert.certificateType?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  // Số lượng chứng chỉ đang chờ ký
  const pendingCount = certificates?.filter((cert) => cert.certificate.status === "PENDING").length

  // Số lượng chứng chỉ đã ký
  const signedCount = certificates?.filter((cert) => cert.certificate.status === "SIGNED").length


  // Xem chi tiết chứng chỉ - Navigate to certificate detail page
  const handleViewCertificate = (certificateData: CertificateResponeTeacher) => {
    router.push({
      pathname: "/certificate/[id]",
      params: { id: certificateData.certificate.id, certificateData: JSON.stringify(certificateData) },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || "Teacher"}</Text>
          </View>
          <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                router.replace('/login');
              }}
            >
              <Ionicons name="log-out-outline" size={22} color="#fff" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          <Avatar.Image size={50} source={{ uri: "https://i.pravatar.cc/300" }} />
        </View>
        <Searchbar
          placeholder="Search certificates..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#fff"
          inputStyle={{ color: "#fff" }}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsNumber}>{pendingCount}</Text>
            <Text style={styles.statsLabel}>Pending</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsNumber}>{signedCount}</Text>
            <Text style={styles.statsLabel}>Signed</Text>
          </Card.Content>
        </Card>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsNumber}>{certificates?.length}</Text>
            <Text style={styles.statsLabel}>Total</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Certificates to Manage</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.certificateList}>
        {filteredCertificates?.map((data: CertificateResponeTeacher) => (
          <Card key={data.certificate.id} style={styles.certificateCard}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <View style={styles.certificateInfo}>
                  <Text style={styles.certificateName} numberOfLines={1} ellipsizeMode="tail">
                    {data.certificateType.name}
                  </Text>
                  <Text style={styles.issueDate}>Issue Date:  {formatTimestamp(data.certificate.createdAt)}</Text>
                </View>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.cardFooter}>

                <View style={styles.cardActions}>
                  <Button
                    mode="text"
                    onPress={() => handleViewCertificate(data)}
                    labelStyle={styles.buttonLabel}
                  >
                    View
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    backgroundColor: "#3498db",
    padding: 30,
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 14,
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBar: {
    elevation: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -20,
    marginHorizontal: 20,
  },
  statsCard: {
    width: "30%",
    elevation: 4,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3498db",
  },
  statsLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    color: "#3498db",
    fontSize: 14,
  },
  certificateList: {
    paddingHorizontal: 20,
  },
  certificateCard: {
    marginBottom: 15,
    elevation: 3,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  certificateImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  certificateInfo: {
    flex: 1,
    justifyContent: "center",
  },
  certificateName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  studentName: {
    fontSize: 14,
    color: "#666",
  },
  issueDate: {
    fontSize: 12,
    color: "#888",
  },
  divider: {
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusChip: {
    height: 28,
  },
  pendingChip: {
    backgroundColor: "#f39c12",
  },
  signedChip: {
    backgroundColor: "#2ecc71",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 14,
  },
  signButton: {
    marginLeft: 8,
    height: 36,
    justifyContent: "center",
  },
  signButtonLabel: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#3498db",
  },
  dialogCertName: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  logoutText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
  },
})

