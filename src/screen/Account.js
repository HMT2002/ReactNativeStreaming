import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../imagePoster/user/userAvatar.jpg')}
        style={styles.profileImage}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>Movie enthusiast | React Native developer</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoText}>New York, USA</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>johndoe@example.com</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Website:</Text>
        <Text style={styles.infoText}>www.johndoe.com</Text>
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
