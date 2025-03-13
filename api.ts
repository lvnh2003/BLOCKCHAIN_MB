import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "./config";
// Khởi tạo Axios instance
const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
