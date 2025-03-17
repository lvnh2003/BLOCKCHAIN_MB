import React, { useEffect } from "react";
import { Stack, Slot, useRouter } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { AuthProvider, useAuth } from "../context/AuthContext";

// Tạo một component riêng để xử lý điều hướng sau khi đã mount
function AuthRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "TEACHER") {
        router.replace("/(teacher)");
      } else if (user.role === "STUDENT") {
        router.replace("/(student)");
      } else if (user.role === "MASTER") {
        router.replace("/(tabs)");
      } else if (user.role === "COMPANY") {
        router.replace("/(company)");
      } else if (user.role === "COMPANY") {
        router.replace("/(company)");
      }
    } else {
      router.replace("/(auth)/login");
    }
  }, [user, router]);

  return null;
}

function RootLayoutNav() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(teacher)" options={{ headerShown: false }} />
        <Stack.Screen name="(student)" options={{ headerShown: false }} />
        <Stack.Screen name="(company)" options={{ headerShown: false }} />
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
