import axios from "axios";
import api from "../api";
import { StudentOfCertificateResponse, CertificateType } from "@/types";

export const getAllStudentsOfCertificate = async (
    certificateType : CertificateType | null
): Promise<StudentOfCertificateResponse[]> => {
  try {
    const response = await api.get(`/certificate/studentByType/${certificateType?.id}`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching students of certificate:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch certificates"
      );
    }
    return [];
  }
};
