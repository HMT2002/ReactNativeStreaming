import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const moveToLogin = () => {
        // Perform login logic here
    
        // Navigate to the home screen
        navigation.navigate('Login');
    
      };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Beauty Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={moveToLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#aaa',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
