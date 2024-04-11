import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { encode } from 'base-64';
import { useRealm } from '@realm/react';

const JiraFetch = ({ navigation }) => {
  const realm=useRealm();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const encodeCredentialsToBase64 = (username, password) => {
    const credentials = `${username}:${password}`;
    return encode(credentials);
  };

  const fetchIssues = async () => {
    try {
      const authHeader = `Basic ${encodeCredentialsToBase64(username, password)}`;
      const response = await fetch('https://workmanojkaushik10.atlassian.net/rest/api/3/search', {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      const data = await response.json();
      //console.log(data.issues)
  
      // Navigate to JiraProjects screen with data
      navigation.navigate('JiraProjects',{ name: "manoj Kaushik", Data: data })
  
    } catch (error) {
      console.error('Error fetching issues:',error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Jira username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Jira password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Fetch Issues" onPress={fetchIssues} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

export default JiraFetch;