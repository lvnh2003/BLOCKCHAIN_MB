import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { EXPO_PUBLIC_API_URL } from '@env';
import axios from 'axios';
import api from '@/api';
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (userData: User) => {
    try {
      const response = await api.post("/auth/sign-in", {
        code : userData.code,
        password : userData.password,
      });
  
      console.log("Login success:", response.data);
      setUser(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("Login failed:", error);
      }
      return null;
    }
   
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};