import React, { ReactNode } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}