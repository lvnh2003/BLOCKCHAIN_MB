"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Image, Share, Linking } from "react-native"
import { Text, Card, Button, Chip, Divider, ActivityIndicator } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, useRouter } from "expo-router"
import QRCode from "react-native-qrcode-svg"
import { Certificate } from "@/types"
import CertificateImage from "@/components/CertificateImage"
import { useAuth } from "@/context/AuthContext"

export default function CertificateDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const { user } = useAuth();
  // QR code URL (temporary using google.com)
  const qrCodeUrl = `https://google.com?certificate=${id}`

  // Fetch certificate data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock certificate data
      const certificateData: Certificate = {
        id: id as string,
        name:
          id === "1"
            ? "Advanced UI/UX Design"
            : id === "2"
              ? "Web Development Fundamentals"
              : id === "3"
                ? "Mobile App Development"
                : "Data Science Fundamentals",
        issueDate: id === "1" ? "2024-03-10" : id === "2" ? "2024-02-15" : id === "3" ? "2024-01-20" : "2023-12-05",
        imageUrl:
          id === "1"
            ? "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            : id === "2"
              ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" : '',
        description:
          "This certificate validates the successful completion of the course with demonstrated proficiency in all required skills and knowledge areas.",
      }

      setCertificate(certificateData)
      setLoading(false)
    }, 1000)
  }, [id])

  // Share certificate
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my ${certificate?.name} certificate! Verify it at: ${qrCodeUrl}`,
        url: qrCodeUrl,
      })
    } catch (error) {
      console.error("Error sharing certificate:", error)
    }
  }

  // Open verification link
  const handleVerify = () => {
    Linking.openURL(qrCodeUrl)
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading certificate details...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          icon="arrow-left"
          mode="text"
          onPress={() => router.back()}
          labelStyle={styles.backButtonLabel}
          style={styles.backButton}
        >
          Back
        </Button>
        <Text style={styles.headerTitle}>Certificate Details</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Certificate Image */}
        <Card style={styles.certificateImageCard}>
          <CertificateImage
            issueDate={certificate?.issueDate}
            description={certificate?.description}
            recipientName={user?.name}          
                        />
        </Card>

        {/* Certificate Information */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Text style={styles.certificateName}>{certificate?.name}</Text>
            <Divider style={styles.divider} />

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Issue Date</Text>
                <Text style={styles.detailValue}>{certificate?.issueDate}</Text>
              </View>
            </View>


            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{certificate?.description}</Text>

          </Card.Content>
        </Card>

        {/* QR Code */}
        <Card style={styles.qrCard}>
          <Card.Content style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Certificate Verification</Text>
            <Text style={styles.qrSubtitle}>Scan this QR code to verify the certificate</Text>

            <View style={styles.qrCodeContainer}>
              <QRCode value={qrCodeUrl} size={200} color="#000" backgroundColor="#fff" />
            </View>

            <Button mode="outlined" icon="link" onPress={handleVerify} style={styles.verifyButton}>
              Verify Online
            </Button>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button mode="contained" icon="share-variant" style={styles.shareButton} onPress={handleShare}>
            Share Certificate
          </Button>
          <Button mode="outlined" icon="download" style={styles.downloadButton} onPress={() => {}}>
            Download PDF
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  backButtonLabel: {
    color: "#fff",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  certificateImageCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
    overflow: "hidden",
  },
  certificateImageContainer: {
    padding: 0,
  },
  certificateImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  certificateName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  issuerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  issuerLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  issuerName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  gradeText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginBottom: 16,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  skillChip: {
    margin: 4,
    backgroundColor: "#E8F5E9",
  },
  skillText: {
    color: "#4CAF50",
  },
  qrCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  qrContainer: {
    alignItems: "center",
    padding: 16,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  qrSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  qrCodeContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  verifyButton: {
    marginTop: 8,
  },
  actionButtons: {
    marginBottom: 30,
  },
  shareButton: {
    marginBottom: 12,
    backgroundColor: "#4CAF50",
  },
  downloadButton: {
    marginBottom: 12,
    borderColor: "#4CAF50",
  },
})

