import React, {useState} from 'react';
import {Button, View, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/calendar.events.readonly'],
  webClientId:
    '1080341211749-72ni9088cu6o1lknabs95m1sm8iqpc2v.apps.googleusercontent.com',
});

async function onGoogleButtonPress(setUserDetails) {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the user's ID token
    const {idToken, user} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
    console.log('Signed in with Google!');
    setUserDetails(user);
    const Token = await GoogleSignin.getTokens();
    const calAccess = Token.accessToken;
    const response = await axios.get(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${calAccess}`,
        },
      },
    );
    console.log('Calendar Events:', response.data.items); // Assuming the events are in the `items` array

    // Fetch calendar events
  } catch (error) {
    // Handle error gracefully
    console.error('Google Sign-In Error:', error);
  }
}

function GoogleSignIn() {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress(setUserDetails)}
      />
      {userDetails && (
        <View style={{marginTop: 20}}>
          <Text>Email: {userDetails.email}</Text>
          <Text>Username: {userDetails.name}</Text>
        </View>
      )}
    </View>
  );
}

export default GoogleSignIn;
