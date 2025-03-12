// app/(app)/certificates/index.tsx
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Avatar, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Certificate } from '../../../types';
import { Ionicons } from '@expo/vector-icons';

const certificatesData: Certificate[] = [
  {
    id: '1',
    name: 'Advanced UI/UX Design',
    progress: 0.75,
    icon: '🎨',
    issueDate: '2024-03-10',
    imageUrl: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Master the art of creating intuitive and beautiful user interfaces.',
  },
  {
    id: '2',
    name: 'Full Stack Web Development',
    progress: 0.50,
    icon: '💻',
    issueDate: '2024-04-15',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive training in both front-end and back-end web technologies.',
  },
  {
    id: '3',
    name: 'Data Science Fundamentals',
    progress: 0.25,
    icon: '📊',
    issueDate: '2024-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Learn the basics of data analysis, machine learning, and statistical modeling.',
  },
];

export default function Certificates() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Certificate }) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => router.push(`/certificates/${item.id}`)}
    >
      <ImageBackground 
        source={{ uri: item.imageUrl }} 
        style={styles.cardBackground}
        imageStyle={styles.cardImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
          style={styles.cardContent}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Certificates</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={certificatesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#3498db',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterButton: {
    padding: 5,
  },
  list: {
    padding: 10,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
  },
  cardBackground: {
    height: 200,
  },
  cardImage: {
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardIssuer: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    height: 20,
    width: 100,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2ecc71',
  },
  progressText: {
    position: 'absolute',
    right: 5,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});