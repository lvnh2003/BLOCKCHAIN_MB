import React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

interface AppBarProps {
  title: string;
}

export function AppBar({ title }: AppBarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
      <Appbar.Action icon="logout" onPress={handleLogout} />
    </Appbar.Header>
  );
}