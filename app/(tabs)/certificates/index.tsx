import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Certificate } from '../../../types';
import { Ionicons } from '@expo/vector-icons';
import { getAllCertificatesAdmin } from '@/utils/admin/getAllCertificate';

const randomImages = [
  'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
];


export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getAllCertificatesAdmin();
      setCertificates(data);
    }
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Certificate }) => {
    const imageUrl = item.imageUrl || randomImages[Math.floor(Math.random() * randomImages.length)];
    return (
      <TouchableOpacity 
        style={styles.cardContainer}
        onPress={() => {
          router.push({
            pathname: "/certificates/[id]",
            params: { id: item.id, certificate: JSON.stringify(item) },
          });
        }}
      >
        <ImageBackground 
          source={{ uri: imageUrl }} 
          style={styles.cardBackground}
          imageStyle={styles.cardImage}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
            style={styles.cardContent}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Certificates</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={certificates}
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
});
