import axios from "axios";
import api from "../api";
import { CertificateResponeTeacher, User } from "@/types";

export const getAllCertificatesOfTeacher = async (
  user: User | null
): Promise<CertificateResponeTeacher[]> => {
  try {
    const response = await api.get(`/certificate/teacher/${user?.id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch certificates"
      );
    }
    return [];
  }
};
