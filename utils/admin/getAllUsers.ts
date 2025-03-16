import axios from "axios";
import api from "../api";
import { User } from "@/types";

export const getAllUsers = async () : Promise<User[]>=> {
  try {

    const response = await api.get(`/users/all`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
    return [];
  }
};
