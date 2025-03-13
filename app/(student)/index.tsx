import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, Card, Searchbar, Chip, Avatar, FAB, Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Certificate } from '@/types';
import { getAllCertificates } from '@/utils/student/getAllCertificates';
import { formatTimestamp } from '@/utils/formatTime';


export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch student certificates
  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      try {
        const mockCertificates: Certificate[] = await getAllCertificates(user);
        const signedCertificates = mockCertificates.filter(cert => cert.status === "SIGNED");
        setCertificates(signedCertificates);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCertificates();
  }, [user]); 

  // Filter certificates based on search query
  const filteredCertificates = certificates.filter(
    cert => cert.certificateType?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to certificate detail
  const handleViewCertificate = (certificate: Certificate) => {
    router.push({
      pathname: "/certificate/[id]",
      params: { id: certificate.id, certificate: JSON.stringify(certificate) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Hello,</Text>
            <Text style={styles.userName}>{user?.name || 'Student'}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                  logout();
              }}
            >
              <Ionicons name="log-out-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <Avatar.Image size={50} source={{ uri: "https://i.pravatar.cc/300" }} />
          </View>
        </View>
        <Searchbar
          placeholder="Search certificates..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#fff"
          inputStyle={{ color: '#fff' }}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
        />
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsNumber}>{certificates.length}</Text>
            <Text style={styles.statsLabel}>Certificates</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Certificates</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading certificates...</Text>
        </View>
      ) : (
        <ScrollView style={styles.certificateList}>
          {filteredCertificates.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No certificates found</Text>
            </View>
          ) : (
            filteredCertificates.map((certificate) => (
              <TouchableOpacity 
                key={certificate.id} 
                onPress={() => handleViewCertificate(certificate)}
                activeOpacity={0.7}
              >
                <Card style={styles.certificateCard}>
                  <Card.Content>
                    <View style={styles.cardHeader}>
                      <Image source={{ uri: certificate.imageUrl ?? 'https://www.pngall.com/wp-content/uploads/2017/03/Gold-Medal-PNG-Image.png' }} style={styles.certificateImage} />
                      <View style={styles.certificateInfo}>
                        <Text style={styles.certificateName} numberOfLines={1} ellipsizeMode="tail">
                          {certificate.certificateType?.name}
                        </Text>
                        <Text style={styles.issueDate}>Issued: {formatTimestamp(certificate.createdAt)}</Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// Helper function to get grade style
const getGradeStyle = (grade: string) => {
  if (grade.startsWith('A')) return styles.gradeA;
  if (grade.startsWith('B')) return styles.gradeB;
  if (grade.startsWith('C')) return styles.gradeC;
  return styles.gradeOther;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#4CAF50', // Different color from teacher
    padding: 30,
    paddingTop: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -20,
    marginHorizontal: 20,
  },
  statsCard: {
    width: '30%',
    elevation: 4,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
  statsLabel: {
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  certificateList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  certificateCard: {
    marginBottom: 15,
    elevation: 3,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
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
    justifyContent: 'center',
  },
  certificateName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  issuerName: {
    fontSize: 14,
    color: '#666',
  },
  issueDate: {
    fontSize: 12,
    color: '#888',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  courseChip: {
    backgroundColor: '#E8F5E9',
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  gradeBadge: {
    fontSize: 12,
  },
  gradeA: {
    backgroundColor: '#4CAF50',
  },
  gradeB: {
    backgroundColor: '#8BC34A',
  },
  gradeC: {
    backgroundColor: '#FFC107',
  },
  gradeOther: {
    backgroundColor: '#FF5722',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
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
});
