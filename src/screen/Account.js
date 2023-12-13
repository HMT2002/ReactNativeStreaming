import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('JohnDoe@gmail.com');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');

  const handleSaveChanges = async () => {
    try {
      // Gọi API để cập nhật thông tin người dùng
      const response = await fetch('https://example.com/api/updateUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Đặt token xác thực nếu cần
          // 'Authorization': 'Bearer your_access_token',
        },
        body: JSON.stringify({
          username,
          email,
          address,
          phoneNumber,
          password,
          dob,
          gender,
        }),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        setDob(selectedDate.toDateString());
      }
    } catch (error) {
      console.warn('Cannot open date picker', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Image
        source={require('../imagePoster/user/userAvatar.jpg')}
        style={styles.profileImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.name}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.infoText}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.infoText}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.infoText}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.infoText}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Button title="Pick Date" onPress={showDatePicker} />
        <Text>{dob}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
});

export default ProfileScreen;
