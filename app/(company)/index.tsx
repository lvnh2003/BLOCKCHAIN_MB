import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  StatusBar,
  Dimensions,
  Modal,
  Platform
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Certificate, Student } from "@/types";

// Sample data for certificates with students
const certificatesData = [
  { 
    id: '1', 
    name: 'Web Development', 
    issuer: 'Tech Academy',
    date: 'June 2023',
    icon: 'https://via.placeholder.com/60',
    color: '#4CAF50',
    students: [
      { 
        id: '101', 
        name: 'John Doe', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '15 Jan 2023',
        score: '95/100',
        email: 'john.doe@example.com',
        role: 'STUDENT'
      },
      { 
        id: '102', 
        name: 'Jane Smith', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '20 Feb 2023',
        score: '92/100',
        email: 'jane.smith@example.com',
        role: 'STUDENT'
      },
      { 
        id: '103', 
        name: 'Mike Johnson', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '5 Mar 2023',
        score: '88/100',
        email: 'mike.johnson@example.com',
        role: 'STUDENT'
      },
      { 
        id: '104', 
        name: 'Sarah Williams', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '12 Apr 2023',
        score: '97/100',
        email: 'sarah.williams@example.com',
        role: 'STUDENT'
      },
    ],
    category: 'Programming'
  },
  { 
    id: '2', 
    name: 'Data Science', 
    issuer: 'Data Institute',
    date: 'August 2023',
    icon: 'https://via.placeholder.com/60',
    color: '#2196F3',
    students: [
      { 
        id: '201', 
        name: 'Robert Brown', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '10 May 2023',
        score: '91/100',
        email: 'robert.brown@example.com',
        role: 'STUDENT'
      },
      { 
        id: '202', 
        name: 'Emily Davis', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '15 Jun 2023',
        score: '89/100',
        email: 'emily.davis@example.com',
        role: 'STUDENT'
      },
    ],
    category: 'Data'
  },
  { 
    id: '3', 
    name: 'Mobile App Development', 
    issuer: 'App Academy',
    date: 'July 2023',
    icon: 'https://via.placeholder.com/60',
    color: '#FF9800',
    students: [
      { 
        id: '301', 
        name: 'David Wilson', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '20 Jul 2023',
        score: '94/100',
        email: 'david.wilson@example.com',
        role: 'STUDENT'
      },
      { 
        id: '302', 
        name: 'Lisa Martinez', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '25 Aug 2023',
        score: '90/100',
        email: 'lisa.martinez@example.com',
        role: 'STUDENT'
      },
      { 
        id: '303', 
        name: 'James Taylor', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '30 Sep 2023',
        score: '86/100',
        email: 'james.taylor@example.com',
        role: 'STUDENT'
      },
    ],
    category: 'Programming'
  },
  { 
    id: '4', 
    name: 'UI/UX Design', 
    issuer: 'Design School',
    date: 'September 2023',
    icon: 'https://via.placeholder.com/60',
    color: '#E91E63',
    students: [
      { 
        id: '401', 
        name: 'Patricia Anderson', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '5 Oct 2023',
        score: '98/100',
        email: 'patricia.anderson@example.com',
        role: 'STUDENT'
      },
      { 
        id: '402', 
        name: 'Thomas Jackson', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '10 Nov 2023',
        score: '93/100',
        email: 'thomas.jackson@example.com',
        role: 'STUDENT'
      },
    ],
    category: 'Design'
  },
  { 
    id: '5', 
    name: 'Cloud Computing', 
    issuer: 'Cloud Institute',
    date: 'May 2023',
    icon: 'https://via.placeholder.com/60',
    color: '#673AB7',
    students: [
      { 
        id: '501', 
        name: 'Jennifer White', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '15 Dec 2023',
        score: '87/100',
        email: 'jennifer.white@example.com',
        role: 'STUDENT'
      },
      { 
        id: '502', 
        name: 'Michael Brown', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '20 Jan 2024',
        score: '92/100',
        email: 'michael.brown@example.com',
        role: 'STUDENT'
      },
    ],
    category: 'Infrastructure'
  },
  { 
    id: '6', 
    name: 'Digital Marketing', 
    issuer: 'Marketing Academy',
    date: 'October 2023',
    icon: 'https://via.placeholder.com/60',
    color: '#009688',
    students: [
      { 
        id: '601', 
        name: 'Elizabeth Lee', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '25 Feb 2024',
        score: '96/100',
        email: 'elizabeth.lee@example.com',
        role: 'STUDENT'
      },
      { 
        id: '602', 
        name: 'William Garcia', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '1 Mar 2024',
        score: '89/100',
        email: 'william.garcia@example.com',
        role: 'STUDENT'
      },
      { 
        id: '603', 
        name: 'Olivia Miller', 
        avatar: 'https://via.placeholder.com/50', 
        achievementDate: '5 Apr 2024',
        score: '91/100',
        email: 'olivia.miller@example.com',
        role: 'STUDENT'
      },
    ],
    category: 'Marketing'
  },
];


const { width } = Dimensions.get('window');

const EmployerHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCertificates, setFilteredCertificates] = useState(certificatesData);
  
  // State for student list modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate>();
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    let filtered = certificatesData;
    
    if (searchQuery) {
      filtered = filtered.filter(cert => 
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    
    setFilteredCertificates(filtered);
  }, [searchQuery]);

  // Filter students when search query changes or certificate is selected
  useEffect(() => {
    if (!selectedCertificate) return;
    
    let students = selectedCertificate.students;
    
    if (studentSearchQuery) {
      students = students.filter(student => 
        student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(studentSearchQuery.toLowerCase())
      );
    }
    
    setFilteredStudents(students);
  }, [studentSearchQuery, selectedCertificate]);

  // Handle certificate selection
  const handleCertificatePress = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setFilteredStudents(certificate.students);
    setStudentSearchQuery('');
    setModalVisible(true);
  };

  // Render certificate item
  const renderCertificateItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.certificateCard}
      onPress={() => handleCertificatePress(item)}
    >
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.cardGradient}
      >
        <View style={styles.certificateHeader}>
          <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
            <MaterialCommunityIcons name="certificate" size={28} color={item.color} />
          </View>
          <View style={styles.certificateInfo}>
            <Text style={styles.certificateName}>{item.name}</Text>
            <Text style={styles.certificateIssuer}>{item.issuer}</Text>
            <Text style={styles.certificateDate}>{item.date}</Text>
          </View>
        </View>
        
        <View style={styles.certificateFooter}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.studentsContainer}>
            <MaterialCommunityIcons name="account-group" size={18} color="#6c757d" />
            <Text style={styles.studentsCount}>{item.students.length} Students</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  // Render student item
  const renderStudentItem = ({ item }:{item: Student}) => (
    <TouchableOpacity 
      style={styles.studentCard}
      onPress={() => {
        // Navigate to student profile or show more details
        setModalVisible(false);
        // navigation?.navigate('StudentProfile', { student: item });
      }}
    >
      <Image source={{ uri: item.avatar }} style={styles.studentAvatar} />
      
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentEmail}>{item.email}</Text>
        <View style={styles.studentDetails}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="calendar" size={14} color="#6c757d" />
            <Text style={styles.detailText}>{item.achievementDate}</Text>
          </View>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.detailText}>{item.score}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.studentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="mail" size={18} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="user-plus" size={18} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/40' }} 
              style={styles.logo} 
            />
            <Text style={styles.companyName}>TalentHub</Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.profileButton}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/30' }} 
                style={styles.profileImage} 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.employerName}>Employer Inc.</Text>
        </View>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#6c757d" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search certificates or issuers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6c757d"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color="#6c757d" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Certificates</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {filteredCertificates.length > 0 ? (
          <FlatList
            data={filteredCertificates}
            renderItem={renderCertificateItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.certificatesList}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="certificate-outline" size={60} color="#d1d1d1" />
            <Text style={styles.emptyStateText}>No certificates found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search or filters</Text>
          </View>
        )}
      </View>
    
      
      {/* Students List Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="arrowleft" size={24} color="#333" />
            </TouchableOpacity>
            
            {selectedCertificate && (
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>{selectedCertificate.certificateType?.name}</Text>
              </View>
            )}
            
            <TouchableOpacity style={styles.modalActionButton}>
              <MaterialCommunityIcons name="export-variant" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {/* Certificate Details */}
          {selectedCertificate && (
            <View style={styles.certificateDetailCard}>
              <View style={[styles.certificateIconLarge, { backgroundColor: selectedCertificate.color + '20' }]}>
                <MaterialCommunityIcons name="certificate" size={40} color={selectedCertificate.color} />
              </View>
              
              <View style={styles.certificateDetailInfo}>
                <Text style={styles.certificateDetailName}>{selectedCertificate.certificateType?.name}</Text>
                <Text style={styles.certificateDetailDate}>Created at: {selectedCertificate.createdAt}</Text>
                
                <View style={styles.certificateStats}>
                  <View style={styles.statBadge}>
                    <MaterialCommunityIcons name="account-group" size={16} color="#6c757d" />
                    <Text style={styles.statText}>{selectedCertificate.students.length} Students</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          
          {/* Student Search */}
          <View style={styles.studentSearchContainer}>
            <View style={styles.studentSearchBar}>
              <Feather name="search" size={20} color="#6c757d" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search students by name or email..."
                value={studentSearchQuery}
                onChangeText={setStudentSearchQuery}
                placeholderTextColor="#6c757d"
              />
              {studentSearchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setStudentSearchQuery('')}>
                  <Feather name="x" size={20} color="#6c757d" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          {/* Students List */}
          <View style={styles.studentsListContainer}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Students</Text>
              <Text style={styles.listSubtitle}>
                {filteredStudents.length} of {selectedCertificate?.students.length || 0} students
              </Text>
            </View>
            
            {filteredStudents.length > 0 ? (
              <FlatList
                data={filteredStudents}
                renderItem={renderStudentItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.studentsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="account-search-outline" size={60} color="#d1d1d1" />
                <Text style={styles.emptyStateText}>No students found</Text>
                <Text style={styles.emptyStateSubtext}>Try adjusting your search</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#EF4637",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  profileButton: {
    marginLeft: 5,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: "#EF4637",
  },
  welcomeSection: {
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6c757d",
  },
  employerName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f1f3f5",
    marginRight: 10,
  },
  selectedCategoryItem: {
    backgroundColor: "#EF4637",
  },
  categoryItemText: {
    fontSize: 14,
    color: "#495057",
    fontWeight: "500",
  },
  selectedCategoryItemText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#EF4637",
    fontWeight: "500",
  },
  certificatesList: {
    paddingBottom: 20,
  },
  certificateCard: {
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  cardGradient: {
    padding: 16,
  },
  certificateHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  certificateInfo: {
    flex: 1,
  },
  certificateName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  certificateIssuer: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 2,
  },
  certificateDate: {
    fontSize: 12,
    color: "#adb5bd",
  },
  certificateFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  categoryText: {
    fontSize: 12,
    color: "#495057",
  },
  studentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  studentsCount: {
    fontSize: 12,
    color: "#6c757d",
    marginLeft: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6c757d",
    marginTop: 15,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#adb5bd",
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#6c757d",
  },
  activeNavText: {
    color: "#EF4637",
    fontWeight: "bold",
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  modalTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  modalActionButton: {
    padding: 8,
  },
  certificateDetailCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  certificateIconLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  certificateDetailInfo: {
    flex: 1,
  },
  certificateDetailName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  certificateDetailIssuer: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 2,
  },
  certificateDetailDate: {
    fontSize: 14,
    color: "#adb5bd",
    marginBottom: 8,
  },
  certificateStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f1f3f5",
    borderRadius: 15,
    marginRight: 10,
  },
  statText: {
    fontSize: 12,
    color: "#6c757d",
    marginLeft: 5,
  },
  studentSearchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  studentSearchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  studentsListContainer: {
    flex: 1,
    padding: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  listSubtitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  studentsList: {
    paddingBottom: 20,
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f1f3f5",
  },
  studentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  studentEmail: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
  },
  studentDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: "#6c757d",
    marginLeft: 5,
  },
  studentActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 5,
  },
});

export default EmployerHomePage;