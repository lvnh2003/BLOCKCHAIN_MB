import { useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, RefreshControl } from "react-native"
import { Text, Avatar, Searchbar, ActivityIndicator, Surface, Chip, IconButton, Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { MaterialIcons } from "@expo/vector-icons"
import { User } from '../../../types'
import { getAllUsers } from "@/utils/admin/getAllUsers"
const { width } = Dimensions.get("window")

export default function UsersManagement() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"students" | "teachers" | "companies">("students")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [usersData, setUsersData] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers()
      setUsersData(data)
      setLoading(false)
      filterUsers(data)
    }
    fetchData()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    filterUsers(usersData)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const filterUsers = (users: User[]) => {
    const filtered = users.filter(user => {
      if (activeTab === "students" && user.role !== "STUDENT") return false
      if (activeTab === "teachers" && user.role !== "TEACHER") return false
      if (activeTab === "companies" && user.role !== "COMPANY") return false
      if (!searchQuery) return true
      return (
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
    setFilteredUsers(filtered)
  }

  useEffect(() => {
    filterUsers(usersData)
  }, [activeTab, searchQuery, usersData])

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const renderUserItem = (user: User, index: number) => {
    return (
      <Surface key={user.id} style={styles.userCard}>
        <View style={styles.userCardContent}>
          <View style={styles.userInfo}>
            {user.avatar ? (
              <Avatar.Image size={50} source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <Avatar.Image size={50} source={require("../../../assets/images/avatar.png")} style={styles.avatar} />
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}</Text>
              <View style={styles.userMeta}>
                <Text style={styles.userId}>{user.code}</Text>
                {(activeTab === "students" || activeTab === "teachers") && (
                  <View style={styles.userMetaItem}>
                    <MaterialIcons name="cake" size={14} color="#666" />
                    <Text style={styles.userMetaText}>{formatDate(user.birthdate || "") || "None"}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.userActions}></View>
            <IconButton icon="dots-vertical" size={20} iconColor="#666" onPress={() => {}} style={styles.menuButton} />
          </View>
      </Surface>
    )
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>User Management</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={`Search ${activeTab}...`}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#666"
          inputStyle={{ color: "#333" }}
          placeholderTextColor="#999"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "students" && styles.activeTab]}
          onPress={() => setActiveTab("students")}
        >
          <MaterialIcons
            name="people"
            size={20}
            color={activeTab === "students" ? "#374785" : "#666"}
            style={styles.tabIcon}
          />
          <Text style={[styles.tabText, activeTab === "students" && styles.activeTabText]}>Students</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "teachers" && styles.activeTab]}
          onPress={() => setActiveTab("teachers")}
        >
          <MaterialIcons
            name="school"
            size={20}
            color={activeTab === "teachers" ? "#374785" : "#666"}
            style={styles.tabIcon}
          />
          <Text style={[styles.tabText, activeTab === "teachers" && styles.activeTabText]}>Teachers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "companies" && styles.activeTab]}
          onPress={() => setActiveTab("companies")}
        >
          <MaterialIcons
            name="business"
            size={20}
            color={activeTab === "companies" ? "#374785" : "#666"}
            style={styles.tabIcon}
          />
          <Text style={[styles.tabText, activeTab === "companies" && styles.activeTabText]}>Companies</Text>
        </TouchableOpacity>
      </View>

      {/* User List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#374785" />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.userList}
          contentContainerStyle={styles.userListContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#374785"]} />}
        >
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ({filteredUsers.length})
            </Text>
            <View style={styles.listActions}>
              <Button
                mode="outlined"
                icon="filter-variant"
                onPress={() => {}}
                style={styles.filterButton}
                labelStyle={styles.filterButtonLabel}
              >
                Filter
              </Button>
              <Button
                mode="outlined"
                icon="sort"
                onPress={() => {}}
                style={styles.sortButton}
                labelStyle={styles.sortButtonLabel}
              >
                Sort
              </Button>
            </View>
          </View>

          {filteredUsers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/7486/7486754.png" }}
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>No Users Found</Text>
              <Text style={styles.emptyText}>
                We couldn't find any {activeTab} matching your search criteria. Try adjusting your search.
              </Text>
              <Button
                mode="contained"
                onPress={() => setSearchQuery("")}
                style={styles.clearButton}
                labelStyle={styles.clearButtonLabel}
              >
                Clear Search
              </Button>
            </View>
          ) : (
            filteredUsers.map((user, index) => renderUserItem(user, index))
          )}

          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#374785",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchBar: {
    elevation: 0,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "rgba(55, 71, 133, 0.1)",
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#374785",
    fontWeight: "bold",
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
  userList: {
    flex: 1,
  },
  userListContent: {
    padding: 16,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  listActions: {
    flexDirection: "row",
  },
  filterButton: {
    marginRight: 8,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  filterButtonLabel: {
    fontSize: 12,
    color: "#666",
  },
  sortButton: {
    borderColor: "#ddd",
    borderRadius: 8,
  },
  sortButtonLabel: {
    fontSize: 12,
    color: "#666",
  },
  userCard: {
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    overflow: "hidden",
  },
  userCardContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  userId: {
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },
  userMetaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  userMetaText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  userActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusChip: {
    height: 28,
    borderRadius: 14,
  },
  menuButton: {
    margin: 0,
    marginLeft: 8,
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
  clearButton: {
    backgroundColor: "#374785",
    borderRadius: 8,
  },
  clearButtonLabel: {
    fontSize: 14,
  },
  bottomPadding: {
    height: 40,
  },
})
