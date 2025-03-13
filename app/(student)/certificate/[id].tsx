// app/(student)/certificate/[id].tsx
"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Image, Share, Linking, Dimensions, TouchableOpacity } from "react-native"
import { Text, Card, Button, Chip, Divider, ActivityIndicator, IconButton, Surface } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, useRouter } from "expo-router"
import QRCode from "react-native-qrcode-svg"
import { Certificate } from "@/types"
import CertificateImage from "@/components/CertificateImage"
import { useAuth } from "@/context/AuthContext"
import { formatTimestamp } from "@/utils/formatTime"
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import { scanCertificate } from "@/utils/student/scanCertificate"
import { getCertificateById } from "@/utils/student/getCertificateById"

const { width, height } = Dimensions.get('window')

export default function CertificateDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showFullCertificate, setShowFullCertificate] = useState(false)

 
  const params = useLocalSearchParams()
  

  const [returnValue, setReturnValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchReturnValue = async () => {
      const certificateData: any =  await getCertificateById(Array.isArray(params?.id) ? params.id[0] : params?.id);
      console.log(certificateData);
      
      const result = await scanCertificate(certificateData.certId);
      setReturnValue(result);
    };
    fetchReturnValue();
  }, []);
   
  const certificate: Certificate = JSON.parse(params.certificate as string)

  // Share certificate
  const handleShare = async () => {
    try {
      setIsLoading(true)
      await Share.share({
        message: `Check out my ${certificate.certificateType?.name} certificate! Verify it at: ${returnValue}`,
        url: returnValue,
      })
    } catch (error) {
      console.error("Error sharing certificate:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Open verification link
  const handleVerify = () => {
    console.log(returnValue);
    
  }

  // Toggle full certificate view
  const toggleFullCertificate = () => {
    setShowFullCertificate(!showFullCertificate)
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      {/* Header with gradient */}
      <LinearGradient
        colors={['#2E7D32', '#4CAF50']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <IconButton
            icon="arrow-left"
            iconColor="#fff"
            size={24}
            onPress={() => router.back()}
            style={styles.backButton}
          />
          <Text style={styles.headerTitle}>Certificate Details</Text>
          <IconButton
            icon="share-variant"
            iconColor="#fff"
            size={24}
            onPress={handleShare}
            style={styles.shareHeaderButton}
          />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Certificate Preview Card */}
        <Surface style={styles.certificatePreviewCard}>
          <View style={styles.certificateTypeContainer}>
            <MaterialCommunityIcons name="certificate" size={20} color="#4CAF50" />
            <Text style={styles.certificateType}>{certificate.certificateType?.name.split(' ')[0]}</Text>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={toggleFullCertificate}
            style={styles.certificateImageContainer}
          >
            <CertificateImage
              issueDate={certificate?.createdAt ? formatTimestamp(certificate.createdAt) : 'N/A'}
              description={certificate?.description}
              recipientName={user?.name}
            />
            <View style={styles.certificateOverlay}>
              <Text style={styles.tapToViewText}>Tap to {showFullCertificate ? 'minimize' : 'expand'}</Text>
            </View>
          </TouchableOpacity>
          
          {showFullCertificate && (
            <View style={styles.fullCertificateContainer}>
              <View style={styles.fullCertificateImage}>
                <CertificateImage
                  issueDate={certificate?.createdAt ? formatTimestamp(certificate.createdAt) : 'N/A'}
                  description={certificate?.description}
                  recipientName={user?.name}
                />
              </View>
              <IconButton
                icon="close"
                size={24}
                style={styles.closeFullCertificateButton}
                onPress={toggleFullCertificate}
              />
            </View>
          )}
          
          <View style={styles.certificateActions}>
            <Button 
              mode="contained" 
              icon="download" 
              style={styles.downloadButton}
              contentStyle={styles.actionButtonContent}
            >
              Download
            </Button>
            <Button 
              mode="outlined" 
              icon="printer" 
              style={styles.printButton}
              contentStyle={styles.actionButtonContent}
            >
              Print
            </Button>
          </View>
        </Surface>

        {/* Certificate Information Card */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Certificate Information</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <MaterialCommunityIcons name="certificate" size={24} color="#4CAF50" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Certificate Name</Text>
                <Text style={styles.infoValue}>{certificate.certificateType?.name}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="calendar" size={24} color="#FF9800" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Issue Date</Text>
                <Text style={styles.infoValue}>{formatTimestamp(certificate?.createdAt)}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="person" size={24} color="#2196F3" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Recipient</Text>
                <Text style={styles.infoValue}>{user?.name}</Text>
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>
              {certificate?.description || 
                `This certificate is awarded for successfully completing the ${certificate.certificateType?.name} course. 
                The recipient has demonstrated proficiency in all required skills and knowledge areas.`
              }
            </Text>
          </Card.Content>
        </Card>

        {/* Verification Card */}
        <Card style={styles.verificationCard}>
          <LinearGradient
            colors={['#f5f5f5', '#e0f2f1']}
            style={styles.verificationHeader}
          >
            <MaterialCommunityIcons name="shield-check" size={32} color="#4CAF50" />
            <Text style={styles.verificationTitle}>Certificate Verification</Text>
          </LinearGradient>
          
          <Card.Content style={styles.verificationContent}>
            <Text style={styles.verificationSubtitle}>
              Scan this QR code to verify the authenticity of this certificate
            </Text>
            
            <View style={styles.qrCodeWrapper}>
              <View style={styles.qrCodeContainer}>
                <QRCode 
                  value={returnValue} 
                  size={180} 
                  color="#000" 
                  backgroundColor="#fff"
                  logo={{uri: 'https://th.bing.com/th/id/OIP.rK-TfNtpfCytlAOkl-4bBAHaHa?rs=1&pid=ImgDetMain'}}
                  logoSize={40}
                  logoBackgroundColor="#fff"
                />
              </View>
              
              <Text style={styles.certificateId}>
                Certificate ID: {id?.toString().substring(0, 8)}...
              </Text>
            </View>
            
            <Button 
              mode="contained" 
              icon="link-variant" 
              onPress={handleVerify} 
              style={styles.verifyButton}
            >
              Verify Online
            </Button>
          </Card.Content>
        </Card>

        {/* Additional Information */}
        <Card style={styles.additionalInfoCard}>
          <Card.Content>
            <Text style={styles.additionalInfoTitle}>Additional Information</Text>
            
            <View style={styles.additionalInfoItem}>
              <MaterialCommunityIcons name="information" size={20} color="#4CAF50" style={styles.additionalInfoIcon} />
              <Text style={styles.additionalInfoText}>
                This certificate is valid from {formatTimestamp(certificate?.createdAt)} and does not expire.
              </Text>
            </View>
            
            <View style={styles.additionalInfoItem}>
              <MaterialCommunityIcons name="information" size={20} color="#4CAF50" style={styles.additionalInfoIcon} />
              <Text style={styles.additionalInfoText}>
                The certificate has been digitally signed and is stored on a secure blockchain.
              </Text>
            </View>
            
            <View style={styles.additionalInfoItem}>
              <MaterialCommunityIcons name="information" size={20} color="#4CAF50" style={styles.additionalInfoIcon} />
              <Text style={styles.additionalInfoText}>
                For any questions regarding this certificate, please contact support.
              </Text>
            </View>
          </Card.Content>
        </Card>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleShare}>
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={styles.fabGradient}
        >
          <Ionicons name="share-social" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  backButton: {
    margin: 0,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  shareHeaderButton: {
    margin: 0,
  },
  content: {
    padding: 16,
  },
  certificatePreviewCard: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    backgroundColor: "#fff",
  },
  certificateTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  certificateType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginLeft: 8,
  },
  certificateImageContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    position: "relative",
  },
  certificateOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    alignItems: "center",
  },
  tapToViewText: {
    color: "#fff",
    fontSize: 14,
  },
  fullCertificateContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fullCertificateImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  closeFullCertificateButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  certificateActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  downloadButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#4CAF50",
  },
  printButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: "#4CAF50",
  },
  actionButtonContent: {
    height: 40,
  },
  infoCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },
  verificationCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
  },
  verificationHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
    color: "#333",
  },
  verificationContent: {
    alignItems: "center",
    padding: 16,
  },
  verificationSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  qrCodeWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  qrCodeContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  certificateId: {
    fontSize: 14,
    color: "#666",
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#4CAF50",
  },
  additionalInfoCard: {
    marginBottom: 20,
    borderRadius: 16,
    elevation: 4,
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  additionalInfoItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  additionalInfoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  additionalInfoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
  bottomPadding: {
    height: 80,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 28,
    elevation: 5,
    overflow: "hidden",
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
})