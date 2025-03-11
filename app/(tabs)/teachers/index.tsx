import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Text, Searchbar, FAB, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Teacher } from '../../../types';

const teachersData: Teacher[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    teacherId: 'S001',
    major: 'Computer Science',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    teacherId: 'S002',
    major: 'Business Administration',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  // Add more teachers...
];

export default function teachers() {
  const [searchQuery, setSearchQuery] = useState('');

  const renderItem = ({ item }: { item: Teacher }) => (
    <Card style={styles.studentCard}>
      <Card.Content style={styles.cardContent}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentId}>ID: {item.teacherId}</Text>
          <Text style={styles.studentMajor}>{item.major}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#666" />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Teacher Management</Text>
        <Searchbar
          placeholder="Search teachers"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <FlatList
        data={teachersData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Add teacher')}
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
    backgroundColor: '#4c669f',
    padding: 20,
    paddingTop: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  searchBar: {
    elevation: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  list: {
    padding: 15,
  },
  studentCard: {
    marginBottom: 15,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentId: {
    fontSize: 14,
    color: '#666',
  },
  studentMajor: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  moreButton: {
    padding: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#4c669f',
  },
});