// app/(student)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, ImageBackground, RefreshControl } from 'react-native';
import { Text, Card, Searchbar, Chip, Avatar, Button, ActivityIndicator, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Certificate } from '@/types';
import { getAllCertificates } from '@/utils/student/getAllCertificates';
import { formatTimestamp } from '@/utils/formatTime';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch student certificates
  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const mockCertificates: Certificate[] = await getAllCertificates(user);
      // const signedCertificates = mockCertificates.filter(cert => cert.status === "SIGNED");
      setCertificates(mockCertificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [user]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCertificates();
  };

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

  // Get random gradient colors for certificates
  const getRandomGradient = (index: number) => {
    const gradients = [
      ['#4CAF50', '#8BC34A'],
      ['#2196F3', '#03A9F4'],
      ['#9C27B0', '#E040FB'],
      ['#FF9800', '#FFEB3B'],
      ['#F44336', '#FF9800'],
      ['#009688', '#4CAF50'],
    ];
    return gradients[index % gradients.length];
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      {/* Header Section */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Student'}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={logout}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <Avatar.Image 
              size={50} 
              source={{ uri: "https://i.pravatar.cc/300" }} 
              style={styles.avatar}
            />
          </View>
        </View>
        
        <View style={styles.searchBarContainer}>
          <Searchbar
            placeholder="Search certificates..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            iconColor="#4CAF50"
            inputStyle={{ color: '#333' }}
            placeholderTextColor="#888"
          />
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statsCard}>
          <Card.Content style={styles.statsCardContent}>
            <View style={styles.statsIconContainer}>
              <MaterialCommunityIcons name="certificate" size={24} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.statsNumber}>{certificates.length}</Text>
              <Text style={styles.statsLabel}>Certificates</Text>
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.statsCard}>
          <Card.Content style={styles.statsCardContent}>
            <View style={styles.statsIconContainer}>
              <FontAwesome5 name="medal" size={22} color="#FF9800" />
            </View>
            <View>
              <Text style={styles.statsNumber}>
                {certificates.filter(c => c.certificateType?.name.includes('Advanced')).length}
              </Text>
              <Text style={styles.statsLabel}>Advanced</Text>
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.statsCard}>
          <Card.Content style={styles.statsCardContent}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="school" size={24} color="#2196F3" />
            </View>
            <View>
              <Text style={styles.statsNumber}>
                {new Set(certificates.map(c => c.certificateType?.name.split(' ')[0])).size}
              </Text>
              <Text style={styles.statsLabel}>Subjects</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <MaterialCommunityIcons name="certificate" size={22} color="#4CAF50" style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>My Certificates</Text>
        </View>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Certificate List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading your certificates...</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.certificateList}
          contentContainerStyle={styles.certificateListContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />
          }
        >
          {filteredCertificates.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png' }} 
                style={styles.emptyImage} 
              />
              <Text style={styles.emptyTitle}>No Certificates Found</Text>
              <Text style={styles.emptyText}>
                You don't have any certificates yet. Complete your courses to earn certificates.
              </Text>
              <Button 
                mode="contained" 
                style={styles.emptyButton}
                onPress={() => setSearchQuery('')}
                icon="refresh"
              >
                Clear Search
              </Button>
            </View>
          ) : (
            <>
              {filteredCertificates.map((certificate, index) => (
                <TouchableOpacity 
                  key={certificate.id} 
                  onPress={() => handleViewCertificate(certificate)}
                  activeOpacity={0.9}
                  style={styles.certificateCardContainer}
                >
                  <Card style={styles.certificateCard}>
                    <LinearGradient
                      colors={getRandomGradient(index) as [string, string]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.certificateCardHeader}
                    >
                      <Image 
                        source={{ uri: certificate.imageUrl ?? 'https://www.pngall.com/wp-content/uploads/2017/03/Gold-Medal-PNG-Image.png' }} 
                        style={styles.certificateHeaderImage} 
                      />
                      <View style={styles.certificateTypeContainer}>
                        <Text style={styles.certificateType} numberOfLines={1}>
                          {certificate.certificateType?.name.split(' ')[0]}
                        </Text>
                      </View>
                    </LinearGradient>
                    
                    <Card.Content style={styles.certificateCardContent}>
                      <Text style={styles.certificateName} numberOfLines={2} ellipsizeMode="tail">
                        {certificate.certificateType?.name}
                      </Text>
                      
                      <View style={styles.certificateMetaContainer}>
                        <View style={styles.certificateMetaItem}>
                          <Ionicons name="calendar-outline" size={16} color="#666" />
                          <Text style={styles.certificateMetaText}>
                            {formatTimestamp(certificate.createdAt)}
                          </Text>
                        </View>
                        
                        <Divider style={styles.metaDivider} />
                        
                        <View style={styles.certificateMetaItem}>
                          <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                          <Text style={styles.certificateMetaText}>Verified</Text>
                        </View>
                      </View>
                      
                      <Button 
                        mode="outlined" 
                        style={styles.viewButton}
                        labelStyle={styles.viewButtonLabel}
                        icon="eye"
                      >
                        View Certificate
                      </Button>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </>
          )}
          
          {/* Bottom padding */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  searchBarContainer: {
    marginTop: 10,
    marginBottom: -30,
  },
  searchBar: {
    elevation: 4,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  statsCard: {
    width: '31%',
    borderRadius: 16,
    elevation: 4,
  },
  statsCardContent: {
    alignItems: 'center',
    padding: 12,
  },
  statsIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  statsLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  certificateList: {
    flex: 1,
  },
  certificateListContent: {
    paddingHorizontal: 20,
  },
  certificateCardContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  certificateCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  certificateCardHeader: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  certificateHeaderImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  certificateTypeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  certificateType: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  certificateCardContent: {
    paddingVertical: 16,
  },
  certificateName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  certificateMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  certificateMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateMetaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  metaDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  viewButton: {
    borderColor: '#4CAF50',
    borderRadius: 8,
  },
  viewButtonLabel: {
    color: '#4CAF50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  bottomPadding: {
    height: 40,
  },
});