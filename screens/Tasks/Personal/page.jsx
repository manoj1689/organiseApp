import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default function Personal({ navigation }) {
  const [numColumns, setNumColumns] = useState(2);

  // Function to set the number of columns based on screen orientation
  const handleLayoutChange = () => {
    const { width } = Dimensions.get('window');
    const isPortrait = width < 500; // Adjust this value as needed
    setNumColumns(isPortrait ? 2 : 4);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleLayoutChange);
    return () => {
      Dimensions.removeEventListener('change', handleLayoutChange);
    };
  }, []);

  const navigateToOtherPage = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksList}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTask')} style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./image/create.png')}
          />
          <Text>create</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReadTask')} style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./image/read.png')}
          />
          <Text>read</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UpdateTask')} style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./image/update.png')}
          />
          <Text>update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DeleteTask')} style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./image/delete.png')}
          />
          <Text>delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tasksList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 100,
  },
  logoContainer: {
    marginHorizontal: 20,
    marginBottom: 20, // Adjust this value to change the distance between images
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  },
  logo: {
    height: 100,
    width: 100,
  },
});
