import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import React from 'react';
const { height, width } = Dimensions.get('window')
export default function CardFormat({ data, isFirst, swipe, ...rest }) {
  const { title, summary, description, type, status, priority, createdAt, updatedAt } = data;

  return (
    <Animated.View style={[{ width: width - 20, height: height - 600, alignSelf: "center", position: 'absolute', top: 30 }, isFirst && { transform: [...swipe.getTranslateTransform()] }]}{...rest}>
      <View style={[styles.card]} >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{summary}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.details}>
          Status: {status} | Priority: {priority} | Type: {type}
        </Text>
        {/* <Text style={styles.details}>
          Created At: {createdAt} | Updated At: {updatedAt}
        </Text> */}
      </View>

    </Animated.View>


  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    backgroundColor: '#D7EFF9',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    position: 'relative',
    //position:'absolute',
    elevation: 2, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#6c757d',
  },

});
