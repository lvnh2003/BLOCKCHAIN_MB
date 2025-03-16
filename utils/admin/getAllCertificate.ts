import axios from "axios";
import api from "../api";
import { Certificate } from "@/types";

export const getAllCertificatesAdmin = async () : Promise<Certificate[]>=> {
  try {

    const response = await api.get(`/certificate/type/all`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch certificate"
      );
    }
    return [];
  }
};
