import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { useRealm } from '@realm/react';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
  webClientId: '1080341211749-72ni9088cu6o1lknabs95m1sm8iqpc2v.apps.googleusercontent.com',
});

const Login = ({ navigation }) => {
  const realm = useRealm();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = realm.objects('User').filtered('username = $0', username)[0];

    if (user && user.passwordHash === password) {
      // Password matches
      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to the task page or perform any other action
      navigation.navigate('HomePage');
    } else {
      // Username or password is incorrect
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken, user } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      navigation.navigate('Home', { userInfo: user });
      const Token = await GoogleSignin.getTokens();
      const calAccess = Token.accessToken;
      const response = await axios.get(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          headers: { Authorization: `Bearer ${calAccess}` },
        },
      );
      console.log('Calendar Events:', response.data.items);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.AppLogo}>
        <Text style={styles.organizeText}>Organize</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Don't Have an Account?{' '}
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={styles.registerLink}>
            Register Here
          </Text>
        </Text>
      </View>
      <View style={styles.Terms}>
        <Text style={styles.TermsText}>
          By Tapping 'Sign in' you agree to our Terms. Learn how we process data
          in our Privacy Policy and Cookies Policy.
        </Text>
      </View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
  },
 organizeText:{
  fontSize:25,
  fontWeight:"500",
  color:"grey"
 },
 registerContainer: {
  marginTop: 20,
},
registerText: {
  textAlign: 'center',
},
registerLink: {
  color: '#007bff',
  textDecorationLine: 'underline',
},
AppLogo: {
  marginBottom: 20,
  alignItems: 'center',
},
Terms: {
  marginTop: 20,
  alignItems: 'center',
  marginBottom:50
},
TermsText: {
  fontWeight:"600",

},
});

export default Login;
