import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, Button, Chip } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Certificate } from '../../../types';
import CertificateImage from '@/components/CertificateImage';

const certificateData: Certificate = {
  id: '1',
  name: 'Advanced UI/UX Design',
  issueDate: '2024-03-10',
  imageUrl: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  description: 'Master the art of creating intuitive and beautiful user interfaces. This comprehensive course covers everything from user research and wireframing to high-fidelity prototypes and usability testing.',
};

export default function CertificateDetail() {
  const certificate = certificateData; // In a real app, fetch the certificate based on the id

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground 
          source={{ uri: certificate.imageUrl }} 
          style={styles.header}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
            style={styles.headerContent}
          >
            <Text style={styles.headerIcon}>{certificate.icon}</Text>
            <Text style={styles.headerTitle}>{certificate.name}</Text>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Certificate</Text>
            <CertificateImage
                          issueDate={certificate.issueDate}
                          description={certificate.description}
                          recipientName=''          
              />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{certificate.description}</Text>
          </View>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificate Details</Text>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.detailText}>Issued on: {certificate.issueDate}</Text>
            </View>
          </View>

          <Button 
            mode="contained" 
            onPress={() => {/* Add logic to view or download certificate */}}
            style={styles.button}
            icon="download"
          >
            Download Certificate
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 250,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerIssuer: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    margin: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  button: {
    marginTop: 20,
  }
});