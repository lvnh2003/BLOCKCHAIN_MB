import { Stack } from "expo-router";

export default function CertificateLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Certificates" }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
