import { User } from "@/types";
import api from "../api";

export const createUser = async (name: string,code: string, role: string) => {
  try {
    
    const response = await api.post(`/users`,{
        image: null,
        code: code,
        name: name,
        dateOfBirth: "2003-10-20",
        role: role,
        password: "password"
    });
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
