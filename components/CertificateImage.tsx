// components/CertificateImage.tsx
import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CertificateImageProps {
  issueDate?: string;
  recipientName?: string;
  description?: string;
  style?: any;
}

const { width } = Dimensions.get('window');

export default function CertificateImage({ 
  issueDate, 
  recipientName,
  description = "Congratulations, for your great performance shown during this month.",
  style
}: CertificateImageProps) {
  return (
    <View style={[styles.container, style]}>
      <ImageBackground 
        source={{ uri: 'https://img.freepik.com/free-vector/elegant-white-background-with-shiny-lines_1017-17580.jpg' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Certificate Border */}
        <View style={styles.borderFrame}>
          <LinearGradient
            colors={['#DAA520', '#FFD700', '#DAA520']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.borderGradient}
          />
        </View>
        
        {/* Certificate Content */}
        <View style={styles.content}>
          {/* Header with Logo and Title */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image 
                source={{ uri: 'https://th.bing.com/th/id/OIP.rK-TfNtpfCytlAOkl-4bBAHaHa?rs=1&pid=ImgDetMain' }}
                style={styles.logo}
              />
            </View>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>CERTIFICATE</Text>
              <Text style={styles.subtitle}>OF ACHIEVEMENT</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
          
          {/* Certificate Body */}
          <View style={styles.body}>
            <Text style={styles.presentedText}>THIS CERTIFIES THAT</Text>
            
            <View style={styles.recipientContainer}>
              <Text style={styles.recipientName}>{recipientName || 'Student Name'}</Text>
              <View style={styles.recipientUnderline} />
            </View>
            
            <Text style={styles.descriptionText}>
              {description}
            </Text>
          </View>
          
          {/* Certificate Footer */}
          <View style={styles.footer}>
            <View style={styles.signatureSection}>
              <Image 
                source={{ uri: 'https://www.pngkey.com/png/full/147-1472304_signature-png-transparent-background-signature-png.png' }}
                style={styles.signatureImage}
                resizeMode="contain"
              />
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>University Director</Text>
            </View>
            
            <View style={styles.dateSection}>
              <Text style={styles.dateLabel}>Issue Date:</Text>
              <Text style={styles.dateText}>{issueDate || 'January 1, 2024'}</Text>
            </View>
          </View>
          
          {/* Certificate Seal */}
          <View style={styles.sealContainer}>
            <Image 
              source={{ uri: 'https://www.pngall.com/wp-content/uploads/2017/05/Seal-Gold-Free-Download-PNG.png' }}
              style={styles.sealImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Certificate Corner Decorations */}
          <View style={[styles.cornerDecoration, styles.topLeftCorner]}>
            <MaterialCommunityIcons name="certificate" size={24} color="#DAA520" />
          </View>
          <View style={[styles.cornerDecoration, styles.topRightCorner]}>
            <MaterialCommunityIcons name="certificate" size={24} color="#DAA520" />
          </View>
          <View style={[styles.cornerDecoration, styles.bottomLeftCorner]}>
            <MaterialCommunityIcons name="certificate" size={24} color="#DAA520" />
          </View>
          <View style={[styles.cornerDecoration, styles.bottomRightCorner]}>
            <MaterialCommunityIcons name="certificate" size={24} color="#DAA520" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 1.4,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  borderFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 2,
    borderRadius: 12,
  },
  borderGradient: {
    flex: 1,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    margin: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    marginRight: 15,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800000',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
    letterSpacing: 1,
  },
  titleUnderline: {
    width: 120,
    height: 2,
    backgroundColor: '#DAA520',
    marginTop: 5,
  },
  body: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  presentedText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
    textAlign: 'center',
  },
  recipientContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  recipientName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  recipientUnderline: {
    width: 200,
    height: 1,
    backgroundColor: '#DAA520',
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  signatureSection: {
    alignItems: 'center',
    width: '50%',
  },
  signatureImage: {
    width: 100,
    height: 40,
  },
  signatureLine: {
    width: 120,
    height: 1,
    backgroundColor: '#000000',
  },
  signatureName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    marginTop: 5,
  },
  dateSection: {
    alignItems: 'center',
    width: '50%',
  },
  dateLabel: {
    fontSize: 10,
    color: '#666666',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
  },
  sealContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    opacity: 0.8,
  },
  sealImage: {
    width: '100%',
    height: '100%',
  },
  cornerDecoration: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftCorner: {
    top: 10,
    left: 10,
  },
  topRightCorner: {
    top: 10,
    right: 10,
  },
  bottomLeftCorner: {
    bottom: 10,
    left: 10,
  },
  bottomRightCorner: {
    bottom: 10,
    right: 10,
  },
});