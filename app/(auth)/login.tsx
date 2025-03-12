import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title, SegmentedButtons } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    login({ username, role });
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.rK-TfNtpfCytlAOkl-4bBAHaHa?rs=1&pid=ImgDetMain' }}
            style={styles.logo}
            resizeMode="contain"
          />
      <Title style={styles.title}>Student Management System</Title>
      
      <SegmentedButtons
        value={role}
        onValueChange={(value) => setRole(value as 'student' | 'teacher')}
        buttons={[
          { value: 'student', label: 'Student' },
          { value: 'teacher', label: 'Teacher' },
        ]}
        style={styles.segmentedButtons}
      />
      
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});