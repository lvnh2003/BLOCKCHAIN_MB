"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Animated,
  Platform,
  RefreshControl,
} from "react-native"
import { Text, Avatar, Searchbar, ActivityIndicator, Surface, IconButton, Divider } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useAuth } from "../../context/AuthContext"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"
import { MaterialCommunityIcons, MaterialIcons, Feather, AntDesign } from "@expo/vector-icons"
import { PieChart } from "react-native-chart-kit"
import StudentModal from "@/components/AddStudentModal"
import TeacherModal from "@/components/AddTeacherModal"
import CompanyModal from "@/components/AddCompanyModal"
import CertificateModal from "@/components/AddCertificateModal"
import ProfileModal from "@/components/EditProfileModal"
import { getAllUsers } from "@/utils/admin/getAllUsers"
import { Certificate, User } from "@/types"
import { createCertificate } from "@/utils/admin/createCertificate"
import Toast from "react-native-toast-message"
import { getAllCertificatesAdmin } from "@/utils/admin/getAllCertificate"
import { createUser } from "@/utils/admin/createUser"


const { width } = Dimensions.get("window")
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)


const mockData = {
  students: {
    total: 1248,
    active: 1052,
    newThisMonth: 87,
    growthRate: 12.4,
  },
  teachers: {
    total: 64,
    active: 58,
    newThisMonth: 5,
    growthRate: 8.2,
  },
  companies: {
    total: 32,
    active: 28,
    newThisMonth: 3,
    growthRate: 10.5,
  },
  certificates: {
    total: 876,
    signed: 742,
    pending: 134,
  },
}
export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current
  const [usersData,setUsersData] = useState<User[]>();
  const [certificates, setCertificates] = useState<Certificate[]>();
useEffect(()=>{
  const fetchData = async () =>{
    const data = await getAllUsers()
    setUsersData(data);

    const certificatesData = await getAllCertificatesAdmin();
    setCertificates(certificatesData);
  }
  fetchData();
  
},[usersData])

const totalStudents = usersData?.filter(s => s.role === "STUDENT").length;
const totalTeachers = usersData?.filter(s => s.role === "TEACHER").length;
const totalCompanies= usersData?.filter(s => s.role === "COMPANY").length;
const totalCertificate = certificates?.length;
  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // Profile form initial data
  const profileInitialData = {
    name: user?.name || "Admin User",
    email: user?.email || "admin@example.com",
    role: "Administrator",
    darkMode: false,
    notifications: true,
  }

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
      setRefreshing(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [refreshing])

  const onRefresh = () => {
    setRefreshing(true)
  }

  // Toggle search bar
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar)
  }

  // Get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "student":
        return <MaterialIcons name="person" size={24} color="#1976D2" />
      case "teacher":
        return <MaterialIcons name="school" size={24} color="#4CAF50" />
      case "certificate":
        return <MaterialCommunityIcons name="certificate" size={24} color="#FF9800" />
      case "company":
        return <MaterialIcons name="business" size={24} color="#9C27B0" />
      default:
        return <MaterialIcons name="info" size={24} color="#1976D2" />
    }
  }

  // Handle form submissions
  const handleStudentSubmit = async (data: any) => {
    await createUser(data.name, data.code, "STUDENT");
    setActiveModal(null)
  }

  const handleTeacherSubmit =async (data: any) => {
    await createUser(data.name, data.code, "TEACHER");
    setActiveModal(null)
  }

  const handleCompanySubmit =async (data: any) => {
    await createUser(data.name, data.code, "COMPANY");
    setActiveModal(null)
  }

  const handleCertificateSubmit = async (data: any) => {
    await createCertificate(data.name);
    setActiveModal(null)
  }

  const handleProfileSubmit = (data: any) => {
    console.log("Profile form submitted:", data)
    alert("Profile updated successfully!")
    setActiveModal(null)
  }

  const handleLogout = () => {
    router.replace("/login")
  }

  const handleQuickActionSelect = (actionId: string) => {
    setActiveModal(actionId)
  }

  // Animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 120],
    extrapolate: "clamp",
  })

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  })

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 60, 90],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  })

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/6295/6295417.png" }}
          style={styles.loadingImage}
        />
        <ActivityIndicator size="large" color="#1976D2" style={styles.loadingIndicator} />
        <Text style={styles.loadingText}>Loading dashboard data...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />

      {/* Animated Header */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          }}
          style={styles.headerBackground}
          imageStyle={styles.headerBackgroundImage}
        >
          <LinearGradient colors={["rgba(55, 71, 133, 0.8)", "rgba(35, 45, 90, 0.95)"]} style={styles.headerGradient}>
            {/* Compact Header Title (visible on scroll) */}
            <Animated.View style={[styles.compactHeader, { opacity: headerTitleOpacity }]}>
              <Text style={styles.compactHeaderTitle}>Admin Dashboard</Text>
              <View style={styles.compactHeaderActions}>
                <IconButton
                  icon="magnify"
                  iconColor="#fff"
                  size={24}
                  onPress={toggleSearchBar}
                  style={styles.headerActionButton}
                />
                <IconButton
                  icon="account-cog"
                  iconColor="#fff"
                  size={24}
                  onPress={() => setActiveModal("profile")}
                  style={styles.headerActionButton}
                />
              </View>
            </Animated.View>

            {/* Full Header Content (fades on scroll) */}
            <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.welcomeText}>Welcome back,</Text>
                  <Text style={styles.userName}>{user?.name || "Admin"}</Text>
                  <Text style={styles.userRole}>System Administrator</Text>
                </View>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.headerActionButton} onPress={toggleSearchBar}>
                    <Feather name="search" size={22} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerActionButton} onPress={() => setActiveModal("profile")}>
                    <Feather name="settings" size={22} color="#fff" />
                  </TouchableOpacity>
                  <Avatar.Image size={50} source={{ uri: "https://i.pravatar.cc/300?img=68" }} style={styles.avatar} />
                </View>
              </View>
            </Animated.View>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>

      {/* Search Bar (Conditional) */}
      {showSearchBar && (
        <View style={styles.searchBarContainer}>
          <BlurView intensity={80} tint="light" style={styles.searchBarBlur}>
            <Searchbar
              placeholder="Search dashboard..."
              onChangeText={() => {}}
              value=""
              style={styles.searchBar}
              iconColor="#374785"
              inputStyle={{ color: "#333" }}
              placeholderTextColor="#888"
              onIconPress={toggleSearchBar}
              icon="arrow-left"
            />
          </BlurView>
        </View>
      )}

      <AnimatedScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#374785"]} />}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        {/* Main Stats Cards */}
        <View style={styles.statsGrid}>
          {/* Students Card */}
          <Surface style={styles.simpleStatsCard}>
            <View style={styles.simpleStatsContent}>
              <View style={[styles.simpleStatsIcon, { backgroundColor: "#1976D2" }]}>
                <MaterialIcons name="people" size={28} color="#fff" />
              </View>
              <View style={styles.simpleStatsTextContainer}>
                <Text style={styles.simpleStatsNumber}>{totalStudents}</Text>
                <Text style={styles.simpleStatsTitle}>Students</Text>
              </View>
            </View>
          </Surface>

          {/* Teachers Card */}
          <Surface style={styles.simpleStatsCard}>
            <View style={styles.simpleStatsContent}>
              <View style={[styles.simpleStatsIcon, { backgroundColor: "#4CAF50" }]}>
                <MaterialIcons name="school" size={28} color="#fff" />
              </View>
              <View style={styles.simpleStatsTextContainer}>
                <Text style={styles.simpleStatsNumber}>{totalTeachers}</Text>
                <Text style={styles.simpleStatsTitle}>Teachers</Text>
              </View>
            </View>
          </Surface>

          {/* Companies Card */}
          <Surface style={styles.simpleStatsCard}>
            <View style={styles.simpleStatsContent}>
              <View style={[styles.simpleStatsIcon, { backgroundColor: "#9C27B0" }]}>
                <MaterialIcons name="business" size={28} color="#fff" />
              </View>
              <View style={styles.simpleStatsTextContainer}>
                <Text style={styles.simpleStatsNumber}>{totalCompanies}</Text>
                <Text style={styles.simpleStatsTitle}>Companies</Text>
              </View>
            </View>
          </Surface>

          {/* Certificates Card */}
          <Surface style={styles.simpleStatsCard}>
            <View style={styles.simpleStatsContent}>
              <View style={[styles.simpleStatsIcon, { backgroundColor: "#FF9800" }]}>
                <MaterialCommunityIcons name="certificate" size={28} color="#fff" />
              </View>
              <View style={styles.simpleStatsTextContainer}>
                <Text style={styles.simpleStatsNumber}>{totalCertificate}</Text>
                <Text style={styles.simpleStatsTitle}>Certificates</Text>
              </View>
            </View>
          </Surface>
        </View>

        {/* Certificate Status Chart */}
        <View style={styles.chartsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <MaterialIcons name="insert-chart" size={22} color="#374785" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Certificate Status</Text>
            </View>
          </View>

          <Surface style={styles.chartCard}>
            <View style={styles.chartCardHeader}>
              <Text style={styles.chartTitle}>Certificate Completion Status</Text>
            </View>

            <View style={styles.pieChartContainer}>
              <PieChart
                data={[
                  {
                    name: "Signed",
                    population: mockData.certificates.signed,
                    color: "#4CAF50",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14,
                  },
                  {
                    name: "Pending",
                    population: mockData.certificates.pending,
                    color: "#FF9800",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 14,
                  },
                ]}
                width={width - 64}
                height={220}
                chartConfig={{
                  backgroundColor: "#fff",
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>

            <View style={styles.certificateStatusSummary}>
              <View style={styles.statusItem}>
                <View style={[styles.statusDot, { backgroundColor: "#4CAF50" }]} />
                <Text style={styles.statusLabel}>Signed:</Text>
                <Text style={styles.statusValue}>{mockData.certificates.signed.toLocaleString()}</Text>
                <Text style={styles.statusPercent}>
                  ({Math.round((mockData.certificates.signed / mockData.certificates.total) * 100)}%)
                </Text>
              </View>

              <View style={styles.statusItem}>
                <View style={[styles.statusDot, { backgroundColor: "#FF9800" }]} />
                <Text style={styles.statusLabel}>Pending:</Text>
                <Text style={styles.statusValue}>{mockData.certificates.pending.toLocaleString()}</Text>
                <Text style={styles.statusPercent}>
                  ({Math.round((mockData.certificates.pending / mockData.certificates.total) * 100)}%)
                </Text>
              </View>
            </View>
          </Surface>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <MaterialIcons name="flash-on" size={22} color="#374785" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>
          </View>

          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveModal("student")}>
              <LinearGradient
                colors={["#1976D2", "#1565C0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
              >
                <MaterialIcons name="person-add" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Add Student</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveModal("teacher")}>
              <LinearGradient
                colors={["#4CAF50", "#388E3C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
              >
                <MaterialIcons name="person-add" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Add Teacher</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveModal("company")}>
              <LinearGradient
                colors={["#9C27B0", "#7B1FA2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
              >
                <MaterialIcons name="business" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Add Company</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveModal("certificate")}>
              <LinearGradient
                colors={["#FF9800", "#F57C00"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
              >
                <MaterialCommunityIcons name="certificate" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Issue Certificate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={() => setActiveModal("profile")}>
              <LinearGradient
                colors={["#607D8B", "#455A64"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
              >
                <MaterialIcons name="settings" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionCard} onPress={() => router.push("/(tabs)/teachers")}>
              <LinearGradient
                colors={["#374785", "#24306e"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionGradient}
              >
                <MaterialIcons name="people" size={24} color="#fff" />
              </LinearGradient>
              <Text style={styles.quickActionText}>Manage Users</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </AnimatedScrollView>

      {/* Modals */}
      <StudentModal
        visible={activeModal === "student"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleStudentSubmit}
      />

      <TeacherModal
        visible={activeModal === "teacher"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleTeacherSubmit}
      />

      <CompanyModal
        visible={activeModal === "company"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCompanySubmit}
      />

      <CertificateModal
        visible={activeModal === "certificate"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCertificateSubmit}
      />

      <ProfileModal
        visible={activeModal === "profile"}
        onClose={() => setActiveModal(null)}
        onSubmit={handleProfileSubmit}
        onLogout={handleLogout}
        initialData={profileInitialData}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loadingIndicator: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  headerContainer: {
    width: "100%",
    overflow: "hidden",
  },
  headerBackground: {
    flex: 1,
    width: "100%",
  },
  headerBackgroundImage: {
    opacity: 0.9,
  },
  headerGradient: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  compactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 10,
  },
  compactHeaderTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  compactHeaderActions: {
    flexDirection: "row",
  },
  headerContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 16,
    fontWeight: "500",
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userRole: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  searchBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  searchBarBlur: {
    padding: 15,
    paddingTop: Platform.OS === "ios" ? 50 : 15,
  },
  searchBar: {
    elevation: 0,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  simpleStatsCard: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  simpleStatsContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  simpleStatsIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  simpleStatsTextContainer: {
    flex: 1,
  },
  simpleStatsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  simpleStatsTitle: {
    fontSize: 14,
    color: "#666",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(55, 71, 133, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seeAllText: {
    color: "#374785",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  chartsSection: {
    marginBottom: 20,
  },
  chartCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
  },
  chartCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  pieChartContainer: {
    alignItems: "center",
  },
  certificateStatusSummary: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 8,
    width: 70,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  statusPercent: {
    fontSize: 14,
    color: "#666",
  },
  activitySection: {
    marginBottom: 20,
  },
  activityCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    padding: 16,
    backgroundColor: "#fff",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(55, 71, 133, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityAction: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  activityName: {
    fontSize: 12,
    color: "#666",
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
  },
  activityDivider: {
    backgroundColor: "#eee",
  },
  quickActionsSection: {
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    marginBottom: 12,
  },
  quickActionGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 5,
    overflow: "hidden",
  },
  fabGradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomPadding: {
    height: 80,
  },
})

