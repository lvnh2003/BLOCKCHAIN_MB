import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CertificateImageProps {
  issueDate?: string;
  recipientName: string;
  description?: string;
}

export default function CertificateImage({ 
  issueDate, 
  recipientName,
  description = "Congratulations, for your great performance shown during this month.\nWe really appreciate with your contributions."
}: CertificateImageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.borderDecoration}>
        <LinearGradient
          colors={['#800000', '#4a0404']}
          style={styles.leftBorder}
        />
        <LinearGradient
          colors={['#DAA520', '#FFD700']}
          style={styles.leftBorderAccent}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>CERTIFICATE</Text>
            <Text style={styles.subtitle}>OF ACHIEVEMENT</Text>
          </View>
          <Image 
            source={require('../assets/images/medal.png')}
            style={styles.medal}
          />
        </View>

        <Text style={styles.presentedText}>This is a format of certificate</Text>
        
        <Text style={styles.recipientName}>{recipientName}</Text>
        <View style={styles.signatureSection}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureName}>JULIANA SILVA</Text>
          <Text style={styles.signatureTitle}>GENERAL MANAGER</Text>
        </View>

        <Text style={styles.dateText}>{issueDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1.4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    position: 'relative',
  },
  borderDecoration: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 60,
  },
  leftBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 40,
  },
  leftBorderAccent: {
    position: 'absolute',
    left: 40,
    top: 0,
    bottom: 0,
    width: 2,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingLeft: 80,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  medal: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
  },
  presentedText: {
    fontSize: 14,
    color: '#666666',
  },
  recipientName: {
    fontSize: 36,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'serif',
  },
  signatureSection: {
    alignItems: 'center',
  },
  signatureLine: {
    width: 200,
    height: 1,
    backgroundColor: '#000000',
  },
  signatureName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  signatureTitle: {
    fontSize: 12,
    color: '#666666',
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});