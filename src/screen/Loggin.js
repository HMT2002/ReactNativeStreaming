import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const handleLogin = () => {
        // Perform login logic here
    console.log("hihi");
        // Navigate to the home screen
        navigation.navigate('Home');

    
      };
      const moveToRegister = () => {
        // Perform login logic here
    
        // Navigate to the home screen
        navigation.navigate('Register');
    
      };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}> Login</Text>
      <View style={styles.inputContainer}>
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={moveToRegister} />
      <TouchableOpacity style={styles.forgotPasswordButton}  >
        <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
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
  loginButton: {
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordButton: {
    marginBottom: 20,
  },
  forgotPasswordButtonText: {
    color: '#aaa',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
