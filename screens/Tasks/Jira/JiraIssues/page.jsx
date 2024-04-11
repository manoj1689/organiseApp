import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Animated, PanResponder } from 'react-native';
import { useRealm } from '@realm/react';
import CardFormat from '../../../CardFormat/page';

const JiraIssues = ({ navigation, route }) => {
  const realm = useRealm();
  const projectName = route.params.Project;
  const myTasks = realm.objects('Task').filtered(`title = "${projectName}"`); // Filter tasks by project name

  const [data, setData] = useState([...myTasks]);
useEffect(()=>{
  if(!data.length){
    setData([...myTasks])
  }
},[data])
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

    }
  });

  const removeCard = useCallback(() => {
    setData(prevState => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe, setData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.map((task, index) => {
        let isFirst = index === 0;
        let dragHandlers = isFirst ? panResponder.panHandlers : {}
        return <CardFormat key={task.taskID} data={task} isFirst={isFirst} swipe={swipe} {...dragHandlers} />
      }).reverse()}
      <Button title='Back To Home' onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
});

export default JiraIssues;
