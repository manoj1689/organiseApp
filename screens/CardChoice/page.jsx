import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function CardChoice({type}) {
  return (
    <View>
      <Text
        style={{
          color: type == 'Like' ? 'green' : 'red',
          fontSize: 30,
          fontWeight: '600',
        }}>
        {type}
      </Text>
    </View>
  );
}
