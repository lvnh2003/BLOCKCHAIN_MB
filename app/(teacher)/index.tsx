"use client"

import { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  ImageBackground,
  Animated,
  Platform,
} from "react-native"
import { Text, Button, Avatar, Searchbar, ActivityIndicator, Surface, IconButton, Divider } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useAuth } from "../../context/AuthContext"
import type { CertificateResponeTeacher } from "@/types"
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather, AntDesign } from "@expo/vector-icons"
import { formatTimestamp } from "@/utils/formatTime"
import { getAllCertificatesOfTeacher } from "@/utils/teacher/getAllCertificatesOFTeacher"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { BlurView } from "expo-blur"

const { width, height } = Dimensions.get("window")
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

export default function TeacherDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [certificatesData, setCertificatesData] = useState<CertificateResponeTeacher[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const scrollY = new Animated.Value(0)

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

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      const mockCertificates: CertificateResponeTeacher[] = await getAllCertificatesOfTeacher(user)
      setCertificatesData(mockCertificates)
    } catch (error) {
      console.error("Error fetching certificates:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [user])

  const onRefresh = () => {
    setRefreshing(true)
    fetchCertificates()
  }

  const filteredCertificates = certificatesData?.filter((cert) =>
    cert.certificateType?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Số lượng chứng chỉ đã ký
  const signedCount = certificatesData?.filter((cert) => cert.certificate.status === "SIGNED").length
  const pendingCount = certificatesData?.filter((cert) => cert.certificate.status === "PENDING").length
  // Xem chi tiết chứng chỉ - Navigate to certificate detail page
  const handleViewCertificate = (certificateData: CertificateResponeTeacher) => {
    router.push({
      pathname: "/certificate/[id]",
      params: { id: certificateData.certificate.id, certificateData: JSON.stringify(certificateData) },
    })
  }

  // Get random certificate image
  const getCertificateImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    ]
    return images[index % images.length]
  }

  // Get random gradient colors for certificates
  const getRandomGradient = (index: number) => {
    const gradients = [
      ["#1a237e", "#283593"],
      ["#0d47a1", "#1565c0"],
      ["#01579b", "#0277bd"],
      ["#006064", "#00838f"],
      ["#004d40", "#00695c"],
      ["#1b5e20", "#2e7d32"],
    ]
    return gradients[index % gradients.length]
  }

  // Toggle search bar
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar)
    if (showSearchBar) {
      setSearchQuery("")
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="light" />

      {/* Animated Header */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          }}
          style={styles.headerBackground}
          imageStyle={styles.headerBackgroundImage}
        >
          <LinearGradient colors={["rgba(25, 118, 210, 0.8)", "rgba(13, 71, 161, 0.95)"]} style={styles.headerGradient}>
            {/* Compact Header Title (visible on scroll) */}
            <Animated.View style={[styles.compactHeader, { opacity: headerTitleOpacity }]}>
              <Text style={styles.compactHeaderTitle}>Teacher Dashboard</Text>
              <View style={styles.compactHeaderActions}>
                <IconButton
                  icon="magnify"
                  iconColor="#fff"
                  size={24}
                  onPress={toggleSearchBar}
                  style={styles.headerActionButton}
                />
                <IconButton
                  icon="logout"
                  iconColor="#fff"
                  size={24}
                  onPress={() => router.replace("/login")}
                  style={styles.headerActionButton}
                />
              </View>
            </Animated.View>

            {/* Full Header Content (fades on scroll) */}
            <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={styles.welcomeText}>Welcome back,</Text>
                  <Text style={styles.userName}>{user?.name || "Teacher"}</Text>
                  <Text style={styles.userRole}>Certification Manager</Text>
                </View>
                <View style={styles.headerActions}>
                  <TouchableOpacity style={styles.headerActionButton} onPress={toggleSearchBar}>
                    <Feather name="search" size={22} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerActionButton} onPress={() => router.replace("/login")}>
                    <Feather name="log-out" size={22} color="#fff" />
                  </TouchableOpacity>
                  <Avatar.Image size={50} source={{ uri: "https://i.pravatar.cc/300" }} style={styles.avatar} />
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
              placeholder="Search certificates..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              iconColor="#1976D2"
              inputStyle={{ color: "#333" }}
              placeholderTextColor="#888"
              onIconPress={toggleSearchBar}
              icon="arrow-left"
            />
          </BlurView>
        </View>
      )}

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Surface style={styles.statsCard}>
          <LinearGradient colors={["#ffffff", "#f5f5f5"]} style={styles.statsCardGradient}>
            <View style={styles.statsCardContent}>
              <View style={[styles.statsIconContainer, styles.signedIconContainer]}>
                <MaterialIcons name="verified" size={24} color="#fff" />
              </View>
              <View style={styles.statsTextContainer}>
                <Text style={[styles.statsNumber, styles.signedNumber]}>{pendingCount}</Text>
                <Text style={styles.statsLabel}>Pending</Text>
              </View>
            </View>
          </LinearGradient>
        </Surface>

        <Surface style={styles.statsCard}>
          <LinearGradient colors={["#ffffff", "#f5f5f5"]} style={styles.statsCardGradient}>
            <View style={styles.statsCardContent}>
              <View style={[styles.statsIconContainer, styles.totalIconContainer]}>
                <MaterialCommunityIcons name="certificate" size={24} color="#fff" />
              </View>
              <View style={styles.statsTextContainer}>
                <Text style={[styles.statsNumber, styles.totalNumber]}>{signedCount}</Text>
                <Text style={styles.statsLabel}>Signed</Text>
              </View>
            </View>
          </LinearGradient>
        </Surface>

        <Surface style={styles.statsCard}>
          <LinearGradient colors={["#ffffff", "#f5f5f5"]} style={styles.statsCardGradient}>
            <View style={styles.statsCardContent}>
              <View style={[styles.statsIconContainer, styles.courseIconContainer]}>
                <MaterialIcons name="school" size={24} color="#fff" />
              </View>
              <View style={styles.statsTextContainer}>
                <Text style={[styles.statsNumber, styles.courseNumber]}>{certificatesData?.length || 0}</Text>
                <Text style={styles.statsLabel}>Courses</Text>
              </View>
            </View>
          </LinearGradient>
        </Surface>
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <MaterialCommunityIcons name="certificate" size={22} color="#1976D2" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Certificates to Manage</Text>
        </View>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <AntDesign name="arrowright" size={16} color="#1976D2" />
        </TouchableOpacity>
      </View>

      {/* Certificate List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976D2" />
          <Text style={styles.loadingText}>Loading certificates...</Text>
        </View>
      ) : (
        <AnimatedScrollView
          style={styles.certificateList}
          contentContainerStyle={styles.certificateListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#1976D2"]} />}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        >
          {filteredCertificates?.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/6134/6134065.png" }}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>No Certificates Found</Text>
              <Text style={styles.emptyText}>
                You don't have any certificates to manage yet or your search didn't match any certificates.
              </Text>
              <Button mode="contained" style={styles.emptyButton} onPress={() => setSearchQuery("")} icon="refresh">
                Clear Search
              </Button>
            </View>
          ) : (
            filteredCertificates?.map((certificateData, index) => (
              <TouchableOpacity
                key={certificateData.certificate.id}
                onPress={() => handleViewCertificate(certificateData)}
                activeOpacity={0.9}
                style={styles.certificateCardContainer}
              >
                <Surface style={styles.certificateCard}>
                  <LinearGradient
                    colors={getRandomGradient(index) as [string, string]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.certificateCardHeader}
                  >
                    <Image
                      source={{ uri: getCertificateImage(index) }}
                      style={styles.certificateBackgroundImage}
                      blurRadius={3}
                    />
                    <View style={styles.certificateHeaderOverlay}>
                      <View style={styles.certificateHeaderContent}>
                        <View>
                          <Text style={styles.certificateHeaderTitle} numberOfLines={1}>
                            {certificateData.certificateType.name}
                          </Text>
                          <View style={styles.certificateHeaderMeta}>
                            <Ionicons name="calendar-outline" size={14} color="rgba(255,255,255,0.8)" />
                            <Text style={styles.certificateHeaderDate}>
                              {formatTimestamp(certificateData.certificate.createdAt)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>

                  <View style={styles.certificateCardBody}>
                    <Divider style={styles.cardDivider} />

                    <View style={styles.certificateActions}>
                      <View style={styles.certificateMetrics}>
                        <View style={styles.metricItem}>
                          <Feather name="clock" size={16} color="#666" />
                          <Text style={styles.metricText}>2 days ago</Text>
                        </View>
                      </View>

                      <Button
                        mode="contained"
                        icon="eye"
                        style={styles.viewButton}
                        labelStyle={styles.viewButtonLabel}
                        onPress={() => handleViewCertificate(certificateData)}
                      >
                        View Details
                      </Button>
                    </View>
                  </View>
                </Surface>
              </TouchableOpacity>
            ))
          )}

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </AnimatedScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
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
    paddingTop: 50,
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statsCard: {
    width: "31%",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  statsCardGradient: {
    borderRadius: 16,
    overflow: "hidden",
  },
  statsCardContent: {
    alignItems: "center",
    padding: 15,
  },
  statsIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  signedIconContainer: {
    backgroundColor: "#4CAF50",
  },
  totalIconContainer: {
    backgroundColor: "#1976D2",
  },
  courseIconContainer: {
    backgroundColor: "#9C27B0",
  },
  statsTextContainer: {
    alignItems: "center",
  },
  statsNumber: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  signedNumber: {
    color: "#4CAF50",
  },
  totalNumber: {
    color: "#1976D2",
  },
  courseNumber: {
    color: "#9C27B0",
  },
  statsLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
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
    backgroundColor: "rgba(25, 118, 210, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seeAllText: {
    color: "#1976D2",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  certificateList: {
    flex: 1,
  },
  certificateListContent: {
    paddingHorizontal: 20,
  },
  certificateCardContainer: {
    marginBottom: 20,
  },
  certificateCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
  },
  certificateCardHeader: {
    height: 120,
    position: "relative",
  },
  certificateBackgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  certificateHeaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 16,
    justifyContent: "center",
  },
  certificateHeaderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  certificateHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    width: width - 80,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  certificateHeaderMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  certificateHeaderDate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    marginLeft: 4,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  certificateCardBody: {
    padding: 16,
    backgroundColor: "#fff",
  },
  certificateInfo: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
    marginRight: 4,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  cardDivider: {
    marginVertical: 12,
    backgroundColor: "#f0f0f0",
    height: 1,
  },
  certificateActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  certificateMetrics: {
    flexDirection: "column",
    gap: 6,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metricText: {
    fontSize: 12,
    color: "#666",
  },
  viewButton: {
    backgroundColor: "#1976D2",
    borderRadius: 8,
    elevation: 0,
  },
  viewButtonLabel: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 20,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: "#1976D2",
    borderRadius: 8,
  },
  bottomPadding: {
    height: 80,
  },
})

