import React, { useEffect } from 'react';
import { Stack, Slot, useRouter } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Tạo một component riêng để xử lý điều hướng sau khi đã mount
function AuthRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'teacher') {
        router.replace('/(teacher)');
      } else {
        router.replace('/(tabs)');
      }
    } else {
      router.replace('/(auth)/login');
    }
  }, [user, router]);

  return null;
}

function RootLayoutNav() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
      </Stack>
      <AuthRedirect />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <RootLayoutNav />
      </PaperProvider>
    </AuthProvider>
  );
}