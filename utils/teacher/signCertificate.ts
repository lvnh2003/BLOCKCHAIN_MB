import axios from "axios";
import api from "../api";
import { User } from "@/types";
import Toast from "react-native-toast-message";

export const signCertificate = async (
  user: User | null,
  certificateId: string
) => {
  try {
    const response = await api.post(`/certificate/${user?.id}`, {
      name: "hello",
      code: user?.code,
      subject: "TOEIC",
      certificateId: certificateId,
    });
    console.log("Upload blockchain successfully");
    
    return response.data;
  } catch (error) {
    console.error("Error sign certificate students of certificate:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to sign certificates"
      );
    }
    return [];
  }
};
