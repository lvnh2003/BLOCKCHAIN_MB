import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Avatar.Image 
              size={80} 
              source={{ uri: 'https://i.pravatar.cc/300' }} 
              style={styles.avatar}
            />
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>Admin</Text>
          </View>
        </LinearGradient>

        <View style={styles.statsContainer}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text style={styles.statsNumber}>12</Text>
              <Text style={styles.statsLabel}>Courses</Text>
            </Card.Content>
          </Card>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text style={styles.statsNumber}>5</Text>
              <Text style={styles.statsLabel}>Certificates</Text>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Courses</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['UI/UX Design', 'Web Development', 'Data Science'].map((course, index) => (
              <Card key={index} style={styles.courseCard}>
                <Card.Cover source={{ uri: `https://picsum.photos/300/200?random=${index}` }} />
                <Card.Content>
                  <Text style={styles.courseTitle}>{course}</Text>
                  <Text style={styles.courseProgress}>Progress: 60%</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionContainer}>
            {[
              { icon: 'book', label: 'My Courses' },
              { icon: 'person', label: 'Profile' },
              { icon: 'calendar', label: 'Schedule' },
              { icon: 'settings', label: 'Settings' },
            ].map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionButton} onPress={()=>{
                logout();
              }}>
                <Ionicons name={action.icon} size={24} color="#4c669f" />
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom:30
  },
  avatar: {
    marginBottom: 10,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 16,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -40,
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
    color: '#4c669f',
  },
  statsLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  courseCard: {
    width: 200,
    marginRight: 15,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  courseProgress: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: {
    marginTop: 5,
    color: '#333',
  },
});