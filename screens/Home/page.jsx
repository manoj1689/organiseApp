import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'; // Import getFocusedRouteNameFromRoute
import Icons from 'react-native-vector-icons/Ionicons';
import Likes from '../Likes/page';
import Profile from '../Profile/page';
import Tasks from '../Tasks/page';
import Cards from '../Cards/page';
const Tab = createBottomTabNavigator();

export default function Home({ navigation, route }) {
  let userInfo = route.params.userInfo;
  console.log('userInfo', userInfo);

  // Get the name of the focused tab

  const getTabBarTasks = (route) => {
   
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Tasks') {
   
      return true;
    }
    else{
      return false;
    }
  } 
  const getTabBarLikes = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Likes') {
    
      return true;
      
    }
    else{
      return false;
    }
  }
   const getTabBarProfile = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Profile') {
     
      return true;
    }
    else{
      return false;
    }
  }
   

  return (
    <>
    <View style={styles.homeHeader}>
  <Text style={styles.text}>Organize</Text>
  {/* Always render the default top header icons */}
  {!(getTabBarTasks(route) || getTabBarLikes(route) || getTabBarProfile(route)) && (
  <View style={styles.topHeaderIcons}>
    <Icons name="notifications" size={35} color="#2F4F4F" onPress={()=>navigation.navigate('Activity')} />
    <Icons name="options" size={35} color="#2F4F4F" onPress={()=>navigation.navigate('Filter')}/>
  </View>
)}

  {/* Conditionally render top header icons based on the visibility of other tabs */}
  {(getTabBarTasks(route) || getTabBarLikes(route) || getTabBarProfile(route)) && (
    <View style={styles.topHeaderIcons}>
      {getTabBarTasks(route) && <Icons name="options" size={35} color="#2F4F4F" />}
      {getTabBarLikes(route) && <Icons name="shield" size={35} color="#2F4F4F" />}
      {getTabBarProfile(route) && (
        <>
          <Icons name="shield" size={35} color="#2F4F4F" />
          <Icons name="settings" size={35} color="#2F4F4F" />
        </>
      )}
    </View>
  )}
</View>

   
      <Tab.Navigator
        initialRouteName="Cards"
        activeColor="#708090"
        barStyle={{ backgroundColor: 'tomato' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Cards') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Tasks') {
              iconName = focused ? 'albums' : 'albums-outline';
            } else if (route.name === 'Likes') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Icons name={iconName} size={28} color={'#708090'} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Cards" component={Cards}  />
        <Tab.Screen name="Tasks" component={Tasks} />
        <Tab.Screen name="Likes" component={Likes} />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ userInfo: userInfo }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    height: 80,
    backgroundColor: '#708090',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  topHeaderIcons: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-around',
  },
  Cards: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
