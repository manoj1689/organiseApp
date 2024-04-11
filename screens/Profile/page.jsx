import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function Profile({ route, navigation }) {
  // Extract userInfo from route.params
  const { userInfo } = route.params;

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.navigate('Login'); // Navigate back to the Login screen after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {userInfo.email}</Text>
      <Text style={styles.text}>Username: {userInfo.name}</Text>
      <Image source={{ uri: userInfo.photo }} style={styles.image} />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Profile;
