import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, Button, Chip } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Certificate } from '../../../types';
import CertificateImage from '@/components/CertificateImage';
import { getCertificateById } from '@/utils/student/getCertificateById';


export default function CertificateDetail() {
  const router = useRouter();
  const params = useLocalSearchParams()
  useEffect(() => {
     const fetchReturnValue = async () => {
       const certificateData: any =  await getCertificateById(Array.isArray(params?.id) ? params.id[0] : params?.id);
       console.log(certificateData);
     };
     fetchReturnValue();
   }, []);
    
   const certificate: Certificate = JSON.parse(params.certificate as string)

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
            <Button 
              icon="arrow-left" 
              mode="text" 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              Back
            </Button>
            <Text style={styles.headerTitle}>{certificate.name}</Text>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This is the format of certificate</Text>
            <CertificateImage
                          issueDate={"2025-03-10"}
                          description={certificate.description}
                          recipientName={certificate.name}          
              />
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    color: '#fff'
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