import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert,TouchableOpacity, Animated, PanResponder } from 'react-native';
import { useRealm } from '@realm/react';
import CardFormat from '../CardFormat/page';
import Icons from 'react-native-vector-icons/Ionicons';

const Cards = ({ navigation, route }) => {
  const realm = useRealm();
  const allTasks = realm.objects('Task').filtered('title = "Personal Task"');

  const [data, setData] = useState([...allTasks]);

  useEffect(() => {
    if (!data.length) {
      // Show an alert when there are no cards available
      setData([...allTasks]);
    } 
  }, [data]);
  
  const swipe = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      swipe.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: { x: 500 * dx, y: dy },
          useNativeDriver: true,
          duration: 500
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5
        }).start();
      }
    },
  });

  const removeCard = useCallback(() => {
    setData(prevState => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe, setData]);

  const handleSelection = useCallback((direction) => {
    Animated.timing(swipe, {
      toValue: { x: 500 * direction, y: 0 },
      useNativeDriver: true,
      duration: 500,
    }).start(removeCard);
  }, [removeCard]);

  return (
    <View style={styles.container} >
      {data.length === 0 ? (
        <View style={styles.noCardsContainer}>
          <Text style={styles.noCardsText}>No cards available</Text>
        </View>
      ) : (
        <View style={styles.CardsBox}>
          {data.map((task, index) => {
            let isFirst = index === 0;
            let dragHandlers = isFirst ? panResponder.panHandlers : {};
            return (
              <CardFormat
                key={task.taskID}
                data={task}
                isFirst={isFirst}
                swipe={swipe}
                {...dragHandlers}
              />
            );
          }).reverse()}
        </View>
      )}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleSelection(-1)}>
          <Icons name="close-outline" size={35} color="#2F4F4F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Tasks')}>
          <Icons name="add-outline" size={35} color="#2F4F4F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => handleSelection(1)}>
          <Icons name="heart-outline" size={35} color="#2F4F4F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCardsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4F4F',
  },
 
  bottomButtons: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cards;
