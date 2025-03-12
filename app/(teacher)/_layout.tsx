import React from 'react';
import { Tabs } from 'expo-router';
import { AuthGuard } from '../../components/AuthGuard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function TeacherLayout() {
  const { user } = useAuth();

  if (user?.role !== 'teacher') {
    return null;
  }

  return (
    <AuthGuard>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="qr-scanner"
          options={{
            title: 'QR Scanner',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}