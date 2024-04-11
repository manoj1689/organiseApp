
import React from 'react';
import {View, Text, Image} from 'react-native';

function Profile({route}) {
  // Extract userInfo from route.params
  const {userInfo} = route.params;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Email: {userInfo.email}</Text>
      <Text>Username: {userInfo.name}</Text>
      <Image source={{uri: userInfo.photo}} style={{width: 200, height: 200}} />
    </View>
  );
}

export default Profile;
