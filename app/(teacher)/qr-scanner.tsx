import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";
import { useEffect, useRef, useState } from "react";
import { signCertificate } from "@/utils/teacher/signCertificate";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";

const { width, height } = Dimensions.get("window");

const outer = rrect(rect(0, 0, width, height), 0, 0);
const innerDimension = 300;

const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  50,
  50
);

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const { user } = useAuth();
  const router = useRouter(); // Dùng để thoát màn hình
  const [cameraActive, setCameraActive] = useState(true); // Trạng thái camera

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Xử lý khi quét QR
  const handleBarcodeScanned = async ({ data }: { data: string }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      try {
        await signCertificate(user, data);
        setCameraActive(false); // Ẩn camera sau khi ký thành công
        Toast.show({
          type: "success",
          text1: "Certificate signed successfully!",
        });

        setTimeout(() => {
          router.back(); // Thoát khỏi màn hình sau 1.5 giây
        }, 1500);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Signing failed!",
        });
        qrLock.current = false; // Mở khóa để thử lại nếu có lỗi
      }
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "QR Scanner",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" && <StatusBar hidden />}

      {/* Hiển thị Camera nếu cameraActive */}
      {cameraActive && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
        />
      )}

      {/* Hiển thị vùng quét QR */}
      {cameraActive && (
        <Canvas
          style={
            Platform.OS === "android"
              ? { flex: 1 }
              : StyleSheet.absoluteFillObject
          }
        >
          <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
        </Canvas>
      )}

      {/* Hiển thị Toast */}
      <Toast />
    </SafeAreaView>
  );
}
