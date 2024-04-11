
import {View, Text} from 'react-native';
import {RealmProvider} from '@realm/react';
import {Profile, Task} from './models/schema';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './auth/Login';
import SignUp from './auth/signUp';
import Home from './screens/Home/page';
import Activity from './screens/Home/Activity/page';
import Filter from './screens/Home/Filter/page';
import Personal from './screens/Tasks/Personal/page';
import Calendar from './screens/Tasks/Calender/page';
import Jira from './screens/Tasks/Jira/page';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <RealmProvider
        schema={[Profile, Task]}
        schemaVersion={2}
        deleteRealmIfMigrationNeeded>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: true}}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{title: 'Login Page',headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{title: 'SignUp Page'}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: 'Home Page',headerShown: false}}
            />
            <Stack.Screen
              name="Activity"
              component={Activity}
              options={{title: 'Activity Page',headerShown: true}}
            />
              <Stack.Screen
              name="Filter"
              component={Filter}
              options={{title: 'Filter Page',headerShown: true}}
            />
               <Stack.Screen
              name="Personal"
              component={Personal}
              options={{title: 'Personal Page',headerShown: true}}
            />
                <Stack.Screen
              name="Calender"
              component={Calendar}
              options={{title: 'Calender Page',headerShown: true}}
            />
                <Stack.Screen
              name="Jira"
              component={Jira}
              options={{title: 'Jira Page',headerShown: true}}
            />
          
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </>
  );
}
