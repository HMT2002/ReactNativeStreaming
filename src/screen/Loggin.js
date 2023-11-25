import React, { useState } from "react";
import { ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,} from 'react-native';
  import CustomBox from "react-native-customized-box";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [getEmailId, setEmailId] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [getDisabled, setDisabled] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
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
      <StatusBar barStyle="light-content" />
      <Image
        style={styles.myLogo}
        source={{
          uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
        }}
      />
      <Text style={styles.header}>react-native-login-register-ui</Text>
      <Image
        style={styles.loginImage}
        source={{
          uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/login.png",
        }}
      />
      {getError ? (
        <View style={styles.errorCard}>
          <TouchableOpacity
            style={styles.cross}
            onPress={() => {
              setError(false);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
          </TouchableOpacity>
          <Text style={styles.errorCardText}>{throwError}</Text>
        </View>
      ) : null}
      <CustomBox
        placeholder={"Email"}
        boxColor={"dodgerblue"}
        focusColor={"#e65c40"}
        keyboardType="email-address"
        boxStyle={{ borderRadius: 40, borderWidth: 2 }}
        inputStyle={{
          fontWeight: "bold",
          color: "#30302e",
          paddingLeft: 20,
          borderRadius: 40,
        }}
        labelConfig={{
          text: "Email",
          style: {
            color: "#0e0e21",
            fontWeight: "bold",
          },
        }}
        requiredConfig={{
          text: <Text>{emailError}</Text>,
        }}
        values={getEmailId}
        onChangeText={(value) => {
          setEmailId(value);
          setError(false);
          setEmailError("");
        }}
      />
      <CustomBox
        placeholder={"Password"}
        toggle={true}
        boxColor={"dodgerblue"}
        focusColor={"#e65c40"}
        boxStyle={{ borderRadius: 40, borderWidth: 2 }}
        inputStyle={{
          fontWeight: "bold",
          color: "#30302e",
          paddingLeft: 20,
          borderRadius: 40,
        }}
        labelConfig={{
          text: "Password",
          style: {
            color: "#0e0e21",
            fontWeight: "bold",
          },
        }}
        requiredConfig={{
          text: <Text>{passwordError}</Text>,
        }}
        values={getPassword}
        onChangeText={(value) => {
          setPassword(value);
          setError(false);
          setPasswordError("");
        }}
      />
      {/* ForgotPassword */}
      <TouchableOpacity
        style={styles.forgotBtn}
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        <Text style={styles.forgotBtnText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
        disabled={getDisabled}
      >
        <Text style={styles.loginBtnText}>LogIn</Text>
        {loading && loading ? (
          <ActivityIndicator style={styles.indicator} color={"white"} />
        ) : null}
      </TouchableOpacity>

      {/* Register Button */}
      <View style={styles.createAccount}>
        <Text style={styles.createAccountText}>
          {`Don't have an Account? `}
        </Text>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={moveToRegister}
        >
          <Text style={styles.registerBtnText}>Register for Free!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorCard: {
    width: 300,
    height: 50,
    backgroundColor: "#de3138",
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 40,
  },
  errorCardText: {
    paddingLeft: 15,
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
  },
  cross: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    left: 250,
    position: "relative",
  },
  loginImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 25,
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: "dodgerblue",
    width: 300,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginBtnText: {
    color: "white",
    fontSize: 22,
  },
  forgotBtn: {
    marginTop: -20,
    width: 280,
    height: 20,
    justifyContent: "center",
  },
  forgotBtnText: {
    color: "#c29700",
    fontSize: 12,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
  createAccount: {
    marginTop: 10,
    width: 280,
    height: 20,
    flexDirection: "row",
  },
  createAccountText: {
    color: "grey",
  },
  registerBtn: {},
  registerBtnText: {
    color: "#e65c40",
    textDecorationLine: "underline",
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    top: 10,
    marginBottom: 10,
  },
});
export default LoginScreen;
