import axios from "axios";
import api from "../api";
import { Certificate } from "@/types";

export const getCertificateById = async (certificateId : string | null): Promise<Certificate> => {
  try {

    const response = await api.get(`/certificate/${certificateId}`);

    return response.data;
  } catch (error) {
    console.error("Error get certificates:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch certificate"
      );
    }
    throw new Error("Failed to fetch certificate");
  }
};
