import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';
import {useRealm} from '@realm/react';

const SignUp = ({navigation}) => {
  const realm = useRealm();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = (userId, name, mail, passwordHash, createdAt) => {
    realm.write(() => {
      const newUser = realm.create('User', {
        userID: userId,
        username: name,
        email: mail,
        passwordHash: passwordHash,
        createdAt: createdAt,
      });
      console.log('Created user:', newUser);
      navigation.navigate('Login');
    });
  };

  // Handler for creating user
  const handleCreateUser = () => {
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      alert('Please fill in all fields');
      return;
    }
    // Generate a unique ID for the user, e.g., using a timestamp
    const userId = Date.now();
    const createdAt = new Date();
    createUser(userId, username, email, password, createdAt);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email..."
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password..."
        secureTextEntry
      />
      <Button title="Create User" onPress={handleCreateUser} />
      <View style={styles.bottomTextContainer}>
        <Text
          style={styles.bottomText}
          onPress={() => navigation.navigate('Login')}>
          Already Have an Account?
        </Text>
      </View>
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
  bottomTextContainer: {
    marginTop: 20,
  },
  bottomText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
export default SignUp;
