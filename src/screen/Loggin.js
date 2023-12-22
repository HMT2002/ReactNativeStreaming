import React, {useState, useContext} from 'react';
import Modal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {I18nextProvider, useTranslation} from 'react-i18next';
import {ip, newip} from '@env';
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import CustomBox from 'react-native-customized-box';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
  const [getEmailId, setEmailId] = useState('');
  const [getPassword, setPassword] = useState('');
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState('');
  const [getDisabled, setDisabled] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const {t} = useTranslation();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleLogin = async () => {
    console.log(`http://${ip}:9000/api/v1/users/signin`);
    try {
      const response = await axios.post(
        `http://${ip}:9000/api/v1/users/signin`,
        {
          account: getEmailId,
          password: getPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.data) {
        // Assuming you have obtained user data after login
        const userData = response.data.data;
        console.log(userData);
        // Save the user data to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData))
          .then(() => {
            console.log('User data saved successfully');
            setEmailId('');
            setPassword('');
            setPasswordError('');
            setEmailError('');
            navigation.navigate('Home');
          })
          .catch(error => {
            console.error('Error saving user data: ', error);
          });
      } else {
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };
  const moveToRegister = () => {
    // Perform login logic here

    // Navigate to the home screen
    navigation.navigate('Register');
  };

  const handleEmailChange = value => {
    setEmailId(value);
    setError(false);
    setEmailError('');

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address.');
    }
    // ... rest of the function
  };
  const handlePasswordChange = value => {
    setPassword(value);
    setError(false);
    setPasswordError('');
    // Validate password complexity
    if (
      value.length < 8 ||
      !/[A-Z]/.test(value) ||
      !/[a-z]/.test(value) ||
      !/[!@#$%^&*?.]/.test(value)
    ) {
      setPasswordError(
        ' Password must be at least 8 characters long,\n Contain at least one uppercase letter,\n One special character (!@#$%^&*).',
      );
    } else {
      setPasswordError(
        <Text style={{color: 'green', marginTop: '10'}}>
          Password is valid.
          <FontAwesomeIcon
            style={{color: 'green'}}
            icon={faCheckCircle}></FontAwesomeIcon>
        </Text>,
      );
    }
  };
  return (
    <ImageBackground
      source={require('../assets/bg.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>
          {t('loggin')}
          {ip}
        </Text>

        {/* <Image
        style={styles.myLogo}
        source={require('../assets/logo.jpg')}
      />
     
      <Image
        style={styles.loginImage}
        source={require('../assets/loginbg.jpg')}
      /> */}
        {getError ? (
          <View style={styles.errorCard}>
            <TouchableOpacity
              style={styles.cross}
              onPress={() => {
                setError(false);
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
            <Text style={styles.errorCardText}>{throwError}</Text>
          </View>
        ) : null}
        <CustomBox
          style={{backgroundColor: 'white'}}
          tabIndex={1}
          placeholder={'Email'}
          boxColor={'dodgerblue'}
          focusColor={'#e65c40'}
          keyboardType="email-address"
          boxStyle={{borderRadius: 40, borderWidth: 2}}
          inputStyle={{
            fontWeight: 'bold',
            color: '#30302e',
            paddingLeft: 20,
            borderRadius: 40,
          }}
          labelConfig={{
            text: 'Email',
            style: {
              color: '#0e0e21',
              fontWeight: 'bold',
            },
          }}
          requiredConfig={{
            text: <Text style={{color: 'black'}}>{emailError}</Text>,
          }}
          values={getEmailId}
          onChangeText={value => {
            handleEmailChange(value);
          }}
        />
        <CustomBox
          tabIndex={2}
          placeholder={'Password'}
          toggle={true}
          boxColor={'dodgerblue'}
          focusColor={'#e65c40'}
          boxStyle={{borderRadius: 40, borderWidth: 2}}
          inputStyle={{
            fontWeight: 'bold',
            color: '#30302e',
            paddingLeft: 20,
            borderRadius: 40,
          }}
          labelConfig={{
            text: 'Password',
            style: {
              color: '#0e0e21',
              fontWeight: 'bold',
            },
          }}
          requiredConfig={{
            text: <Text style={{color: 'red'}}>{passwordError}</Text>,
          }}
          values={getPassword}
          onChangeText={value => {
            handlePasswordChange(value);
          }}
        />
        {/* ForgotPassword */}
        <TouchableOpacity
          style={styles.forgotBtn}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.forgotBtnText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={getDisabled}>
          <Text style={styles.loginBtnText}>LogIn</Text>
          {loading && loading ? (
            <ActivityIndicator style={styles.indicator} color={'white'} />
          ) : null}
        </TouchableOpacity>

        <Modal isVisible={showErrorModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../assets/logginfail.png')}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>Login Failed</Text>
              <Text style={styles.modalText}>
                Incorrect username or password. Please try again.
              </Text>
              <Button
                title="Try Again"
                onPress={() => setShowErrorModal(false)}
              />
            </View>
          </View>
        </Modal>
        {/* Register Button */}
        <View style={styles.createAccount}>
          <Text style={styles.createAccountText}>
            {`Don't have an Account? `}
          </Text>
          <TouchableOpacity style={styles.registerBtn} onPress={moveToRegister}>
            <Text style={styles.registerBtnText}>Register for Free!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
    // Other styling properties
  },
  container: {
    alignSelf: 'center',
    marginTop: 200,
    padding: 30,
    paddingTop: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorCard: {
    width: 300,
    height: 50,
    backgroundColor: '#de3138',
    justifyContent: 'center',
    paddingLeft: 15,
    borderRadius: 40,
  },
  errorCardText: {
    paddingLeft: 15,
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    position: 'absolute',
  },
  cross: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    left: 250,
    position: 'relative',
  },
  loginImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#0e0e21',
    textAlign: 'center',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: 'dodgerblue',
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loginBtnText: {
    color: 'white',
    fontSize: 22,
  },
  forgotBtn: {
    marginTop: -20,
    width: 280,
    height: 20,
    justifyContent: 'center',
  },
  forgotBtnText: {
    color: '#c29700',
    fontSize: 12,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
  },
  createAccount: {
    marginTop: 10,
    width: 280,
    height: 20,
    flexDirection: 'row',
  },
  createAccountText: {
    color: 'grey',
  },
  registerBtn: {},
  registerBtnText: {
    color: '#e65c40',
    textDecorationLine: 'underline',
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    top: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
export default LoginScreen;
