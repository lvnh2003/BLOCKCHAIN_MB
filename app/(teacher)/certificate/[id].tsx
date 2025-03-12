"use client"

import { useEffect, useState } from "react"
import { View, StyleSheet, ScrollView, Image } from "react-native"
import { Text, Card, Button, Chip, Divider, DataTable, ActivityIndicator } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useLocalSearchParams, useRouter } from "expo-router"
import type { Certificate } from "@/types"

// Mock student data for the certificate
interface Student {
  id: string
  name: string
  score: number
  grade: string
}

export default function CertificateDetailScreen() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [students, setStudents] = useState<Student[]>([])

  // Fetch certificate and student data
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
        issueDate: id === "1" ? "2024-03-10" : id === "2" ? "2024-03-15" : id === "3" ? "2024-03-20" : "2024-03-25",
        status: id === "2" ? "signed" : "pending",
        imageUrl:
          id === "1"
            ? "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            : id === "2"
              ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      }

      // Mock student data
      const studentData: Student[] = [
        { id: "1", name: "John Doe", score: 92, grade: "A" },
        { id: "2", name: "Jane Smith", score: 88, grade: "B+" },
        { id: "3", name: "Michael Johnson", score: 95, grade: "A+" },
        { id: "4", name: "Emily Davis", score: 78, grade: "C+" },
        { id: "5", name: "Robert Wilson", score: 85, grade: "B" },
      ]

      setCertificate(certificateData)
      setStudents(studentData)
      setLoading(false)
    }, 1000)
  }, [id])

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
            <Image source={{ uri: certificate?.imageUrl }} style={styles.certificateImage} resizeMode="cover" />
            <View style={styles.certificateHeader}>
              <Text style={styles.certificateName}>{certificate?.name}</Text>
              <Chip
                icon={certificate?.status === "signed" ? "check" : "clock"}
                style={[styles.statusChip, certificate?.status === "signed" ? styles.signedChip : styles.pendingChip]}
              >
                {certificate?.status === "signed" ? "Signed" : "Pending"}
              </Chip>
            </View>
            <Text style={styles.issueDate}>Issue Date: {certificate?.issueDate}</Text>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>Certificate Description</Text>
            <Text style={styles.description}>
              This certificate validates the successful completion of the {certificate?.name} course. The course covers
              comprehensive knowledge and practical skills in the subject area. Students have demonstrated proficiency
              through assessments and practical projects.
            </Text>
          </Card.Content>
        </Card>

        {/* Student Information */}
        <Card style={styles.studentsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Student Performance</Text>
            <Text style={styles.subtitle}>Students who received this certificate</Text>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Student Name</DataTable.Title>
                <DataTable.Title numeric>Score</DataTable.Title>
                <DataTable.Title numeric>Grade</DataTable.Title>
              </DataTable.Header>

              {students.map((student) => (
                <DataTable.Row key={student.id}>
                  <DataTable.Cell>{student.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{student.score}</DataTable.Cell>
                  <DataTable.Cell numeric>{student.grade}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>

            <View style={styles.statsContainer}>
              <Card style={styles.statsCard}>
                <Card.Content>
                  <Text style={styles.statsNumber}>
                    {students.reduce((sum, student) => sum + student.score, 0) / students.length}
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
          {certificate?.status === "pending" && (
            <Button mode="contained" icon="pencil" style={styles.actionButton} onPress={() => {
                router.push('/qr-scanner')
            }}>
              Sign Certificate
            </Button>
          )}
          <Button mode="outlined" icon="share-variant" style={styles.actionButton} onPress={() => {}}>
            Share Certificate
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
    marginBottom: 16,
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
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
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
})

