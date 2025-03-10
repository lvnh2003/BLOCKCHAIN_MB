import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = () => {
    login({ username });
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.rK-TfNtpfCytlAOkl-4bBAHaHa?rs=1&pid=ImgDetMain' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUserName}
            keyboardType="name-phone-pad"
          />
          <TouchableOpacity style={styles.inputIcon}>
            <Ionicons name="person" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.inputIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>I forgot my password</Text>
        </TouchableOpacity>
        
        <View style={styles.tryServicesContainer}>
          <Text style={styles.tryServicesText}>Wanna try our services? </Text>
          <TouchableOpacity>
            <Text style={styles.hereText}>here you are</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  inputIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#09f',
    borderRadius: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#4ad',
    fontSize: 16,
  },
  tryServicesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryServicesText: {
    fontSize: 16,
  },
  hereText: {
    color: '#4ad',
    fontSize: 16,
  },
});

