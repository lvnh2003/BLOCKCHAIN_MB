import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "../types";
import axios from "axios";
import api from "@/utils/api";
import Toast from "react-native-toast-message";
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  update: (filePath: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const login = async (userData: User): Promise<boolean> => {
    try {
      const response = await api.post("/auth/sign-in", {
        code: userData.code,
        password: userData.password,
      });

      const userResponse = await api.get(`/users/code/${userData.code}`);
      console.log("userResponse", userResponse.data);
      setUser(userResponse.data);

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: error.response?.data?.message || "Please try again.",
          position: "top",
          visibilityTime: 4000,
        });
      }

      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const update = (filePath: string) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, image: filePath };
      }
      return prevUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, update }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
