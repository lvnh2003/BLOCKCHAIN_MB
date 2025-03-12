import React from "react";
import { Stack } from "expo-router";
import { AuthGuard } from "../../components/AuthGuard";
import { useAuth } from "../../context/AuthContext";

export default function TeacherLayout() {
  const { user } = useAuth();

  if (user?.role !== "TEACHER") {
    return null;
  }

  return (
    <AuthGuard>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="certificate/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthGuard>
  );
}