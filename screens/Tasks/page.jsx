import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Tasks({ navigation }) {


  return (
    <View style={styles.container}>
      <Text>Tasks Page</Text>
      <View style={styles.tasksList}>
        <TouchableOpacity onPress={() => navigation.navigate('Personal')} style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/tasks.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Calender')} style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/calender.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Jira')} style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/jira.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasksList: {
    flexDirection: 'row',
    marginTop: 20,
  },
  logoContainer: {
    marginHorizontal: 10,
    marginBottom: 20, // Adjust this value to change the distance between images
  },
  logo: {
    height: 100,
    width: 100,
  },
});
