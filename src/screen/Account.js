
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Picker, TextInput } from 'react-native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const ProfileScreen = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('30');
  const [email, setEmail] = useState('johndoe@example.com');
  const [language, setLanguage] = useState('English');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [datas, setData] = useState([]);
  const [userData, setUser] = useState({});
  const [flagSrc, setFlagSrc] = useState(require('../assets/engflag.png'));
  const { t } = useTranslation();

  useEffect(() => {

    axios
      .get(`http://${ip}:9000/api/v1/info`)
      .then(function (response) {
        setData(response.data.data);

        console.log("data:" + response.data.data.length);
      })
      .catch(function (error) {
        console.log("homescreen" + error);
      });
    const retrieveUserData = async () => {
      try {
        const Data = await AsyncStorage.getItem('userData');
        if (Data !== null) {
          const parsedUserData = JSON.parse(Data);
          setUser(parsedUserData);
          console.log('Retrieved user data: ');
          // You can use the user data as needed
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving user data: ', error);
      }
    };

    retrieveUserData();
  }, []);
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // You can add logic here to save the updated profile information
  };
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../imagePoster/user/userAvatar.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.label}>Name:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      ) : (
        <Text style={styles.text}>{name}</Text>
      )}
      <Text style={styles.label}>Age:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={(text) => {
            if (parseInt(text) > 6 || text === '') {
              setAge(text);
            }
          }}
          keyboardType="numeric"
        />
      ) : (
        <Text style={styles.text}>{age}</Text>
      )}
      <Text style={styles.label}>Email:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      ) : (
        <Text style={styles.text}>{email}</Text>
      )}
      <Text style={styles.label}>Language:</Text>
      <TouchableOpacity onPress={toggleLanguage}>
        <Text style={styles.languageText}>{language === 'en' ? 'English' : 'Vietnamese'}</Text>
      </TouchableOpacity>
      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    width: 200,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;



