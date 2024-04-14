import {View, Text, StyleSheet, Dimensions, Animated, ScrollView} from 'react-native';
import React, {useCallback} from 'react';
import CardChoice from '../CardChoice/page';
const {height, width} = Dimensions.get('window');
export default function CardFormat({data, isFirst, swipe, ...rest}) {
  const {
    title,
    summary,
    description,
    type,
    status,
    priority,
    createdAt,
    updatedAt,
  } = data;
  const rotate=swipe.x.interpolate({
    inputRange:[-100,0,100],
    outputRange:['-8deg','0deg','8deg']
  })
const likeOpacity=swipe.x.interpolate({
  inputRange:[10,100],
  outputRange:[0,1],
  extrapolate:'clamp'
})
const nopeOpacity=swipe.x.interpolate({
  inputRange:[-100,-10],
  outputRange:[1,0],
  extrapolate:'clamp'
})
  const cardSelection = useCallback(() => {
    return (
      <>
         <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            opacity:likeOpacity,
        
            transform: [{rotate: '-30deg'}],
          }}>
          <CardChoice type={'Like'} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            opacity: nopeOpacity,
            transform: [{rotate: '30deg'}],
          }}>
          <CardChoice type={'Nope'} />
        </Animated.View>
     
      </>
    );
  }, []);

  return (
    <>
    <View>
      <Animated.View
      style={[
        {
          width: width - 20,
          height: height - 600,
          alignSelf: 'center',
          position: 'absolute',
          top: 30,
        },
        isFirst && {transform: [...swipe.getTranslateTransform(),{rotate:rotate}]},
      ]}
      {...rest}>
      <View style={[styles.card]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.summary}>{summary}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.details}>
          Status: {status} | Priority: {priority} | Type: {type}
        </Text>
        {/* <Text style={styles.details}>
          Created At: {createdAt} | Updated At: {updatedAt}
        </Text> */}
      </View>

      {isFirst && cardSelection()}
    </Animated.View>

    </View>
    </>
  );
}

const styles = StyleSheet.create({

  card: {
    width: '90%',
    backgroundColor: '#FFF8DC',
    padding: 40,
   margin:'auto',
    borderRadius: 10,
    position: 'relative',
    //position:'absolute',
    elevation: 1, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow (iOS)
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:10,
    marginBottom: 15,

  },
  summary: {
    fontSize: 16,
    marginTop:10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginTop:10,
    marginBottom: 15,
  },
  details: {
    fontSize: 14,
    color: '#6c757d',
    marginTop:10,
    marginBottom: 15,
  },
});
