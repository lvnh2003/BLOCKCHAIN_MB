// app/(teacher)/certificate/[id].tsx
"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { Text, Card, Button, Chip, Divider, DataTable, ActivityIndicator, Dialog, Portal } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, useRouter } from "expo-router"
import type { CertificateResponeTeacher, Student, StudentOfCertificateResponse } from "@/types"
import { formatTimestamp } from "@/utils/formatTime"
import { getAllStudentsOfCertificate } from "@/utils/teacher/getAllStudentOfCertificate"



export default function CertificateDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [students, setStudents] = useState<StudentOfCertificateResponse[]>([])
  const [signDialogVisible, setSignDialogVisible] = useState(false)
  const params = useLocalSearchParams();
  const certificateData: CertificateResponeTeacher = JSON.parse(params.certificateData as string);


  // Fetch certificate and student data
  useEffect(() => {
    // Simulate API call
    const fetchData =  async () => {
      const studentData: StudentOfCertificateResponse[]  =  await getAllStudentsOfCertificate(certificateData.certificateType);
      setStudents(studentData)
      setLoading(false)
    }
    fetchData()
  }, [id])

  // Xử lý ký chứng chỉ cho học sinh
  const handleSignForStudent = () => {
    router.push('/qr-scanner');
    setSignDialogVisible(false)
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
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
        {/* Certificate Information */}
        <Card style={styles.certificateCard}>
          <Card.Content>
            <Image source={{ uri: 'https://pngimg.com/uploads/gold_medal/gold_medal_PNG60.png' }} style={styles.certificateImage} resizeMode="contain" />
            {/* <Image source={{ uri: certificateData.certificate.imageUrl }} style={styles.certificateImage} resizeMode="cover" /> */}
            <View style={styles.certificateHeader}>
              <Text style={styles.certificateName}>{certificateData.certificateType.name}</Text>
            </View>
            <Text style={styles.issueDate}>Issue Date: {formatTimestamp(certificateData.certificate.createdAt)}</Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>Certificate Description</Text>
            <Text style={styles.description}>
              This certificate validates the successful completion of the {certificateData.certificateType.name} course. The course covers
              comprehensive knowledge and practical skills in the subject area. Students have demonstrated proficiency
              through assessments and practical projects.
            </Text>
          </Card.Content>
        </Card>

        {/* Student Information */}
        <Card style={styles.studentsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Student Performance</Text>
            <View style={styles.studentStatsRow}>
              <Text style={styles.subtitle}>Students who received this certificate</Text>
            </View>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Student Name</DataTable.Title>
                <DataTable.Title numeric>Score</DataTable.Title>
                <DataTable.Title numeric>Status</DataTable.Title>
              </DataTable.Header>

              {students.map((student) => (
                <DataTable.Row key={student.id}>
                  <DataTable.Cell>{student.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{student.score}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Chip
                      style={[
                        styles.miniStatusChip,
                        student.certificate.status === "SIGNED" ? styles.miniSignedChip : styles.miniPendingChip
                      ]}
                    >
                      {null}
                    </Chip>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>

            <View style={styles.statsContainer}>
              <Card style={styles.statsCard}>
                <Card.Content>
                  <Text style={styles.statsNumber}>
                    {(students.reduce((sum, student) => sum + student.score, 0) / students.length).toFixed(1)}
                  </Text>
                  <Text style={styles.statsLabel}>Average Score</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statsCard}>
                <Card.Content>
                  <Text style={styles.statsNumber}>{Math.max(...students.map((student) => student.score))}</Text>
                  <Text style={styles.statsLabel}>Highest Score</Text>
                </Card.Content>
              </Card>
              <Card style={styles.statsCard}>
                <Card.Content>
                  <Text style={styles.statsNumber}>{students.length}</Text>
                  <Text style={styles.statsLabel}>Total Students</Text>
                </Card.Content>
              </Card>
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button mode="outlined" icon="share-variant" style={styles.actionButton} onPress={() => {}}>
            Share Certificate
          </Button>
          <Button 
            mode="contained" 
            icon="qrcode-scan" 
            style={styles.actionButton} 
            onPress={() => router.push('/qr-scanner')}
          >
            Scan QR Code To Sign
          </Button>
        </View>
      </ScrollView>

      {/* Hộp thoại xác nhận ký chứng chỉ cho học sinh */}
      <Portal>
        <Dialog visible={signDialogVisible} onDismiss={() => setSignDialogVisible(false)}>
          <Dialog.Title>Sign Certificate</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>
              Are you sure you want to sign the certificate for:
            </Text>
            {/* <Text style={styles.dialogStudentName}>{selectedStudent?.name}</Text> */}
            <Text style={styles.dialogCourseInfo}>
              Course: {certificateData?.certificateType.name}
            </Text>
            <Text style={styles.dialogWarning}>
              This action cannot be undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSignDialogVisible(false)}>Cancel</Button>
            <Button onPress={handleSignForStudent} mode="contained">Sign</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    backgroundColor: "#3498db",
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
  certificateCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  certificateImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  certificateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  certificateName: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  statusChip: {
    height: 28,
  },
  pendingChip: {
    backgroundColor: "#f39c12",
  },
  signedChip: {
    backgroundColor: "#2ecc71",
  },
  issueDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
  studentsCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  studentStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  studentStatusContainer: {
    flexDirection: "row",
    gap: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  miniStatusChip: {
    height: 24,
    paddingHorizontal: 4,
  },
  miniSignedChip: {
    backgroundColor: "#2ecc71",
    height: 24,
  },
  miniPendingChip: {
    backgroundColor: "#f39c12",
    height: 24,
  },
  signButton: {
    backgroundColor: "#3498db",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  signedIndicator: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  statsCard: {
    width: "31%",
    elevation: 2,
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3498db",
  },
  statsLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
  },
  actionButtons: {
    marginBottom: 30,
  },
  actionButton: {
    marginBottom: 12,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 12,
  },
  dialogStudentName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  dialogCourseInfo: {
    fontSize: 14,
    marginBottom: 8,
  },
  dialogScoreInfo: {
    fontSize: 14,
    marginBottom: 16,
  },
  dialogWarning: {
    fontSize: 14,
    color: "#e74c3c",
    fontStyle: "italic",
  },
})