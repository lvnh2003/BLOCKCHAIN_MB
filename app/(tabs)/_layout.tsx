import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthGuard } from '@/components/AuthGuard';

export default function AppLayout() {
  return (
    <AuthGuard>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="teachers/index"
          options={{
            title: 'Teachers',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="certificates"
          options={{
            title: "Certificates",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="certificate" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}