import axios from "axios";
import api from "../api";
import { Certificate, User } from "@/types";

export const getAllCertificates = async (user: User | null) : Promise<Certificate[]>=> {
  try {

    const response = await api.get(`/certificate/student/${user?.id}`);

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
