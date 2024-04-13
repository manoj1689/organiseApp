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
import CreateTask from './screens/Tasks/Personal/CreateTask/page';
import JiraFetch from './screens/Tasks/Jira/JiraFetch/page';
import JiraProjects from './screens/Tasks/Jira/JiraProjects/page';
import JiraIssues from './screens/Tasks/Jira/JiraIssues/page';
import ReadTask from './screens/Tasks/Personal/ReadTask/page';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
            options={{title: 'Login Page', headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: 'SignUp Page', headerShown: true}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Home Page', headerShown: false}}
          />
          <Stack.Screen
            name="Activity"
            component={Activity}
            options={{title: 'Activity Page', headerShown: true}}
          />
          <Stack.Screen
            name="Filter"
            component={Filter}
            options={{title: 'Filter Page', headerShown: true}}
          />
          <Stack.Screen
            name="Personal"
            component={Personal}
            options={{title: 'Personal Page', headerShown: true}}
          />
          <Stack.Screen
            name="Calender"
            component={Calendar}
            options={{title: 'Calender Page', headerShown: true}}
          />
          <Stack.Screen
            name="CreateTask"
            component={CreateTask}
            options={{title: 'Create Task Page', headerShown: true}}
          />
          <Stack.Screen
            name="ReadTask"
            component={ReadTask}
            options={{title: 'Read Task Page', headerShown: true}}
          />
          <Stack.Screen
            name="JiraFetch"
            component={JiraFetch}
            options={{title: 'Jira Fetch Page', headerShown: true}}
          />
          <Stack.Screen
            name="JiraProjects"
            component={JiraProjects}
            options={{title: 'Jira Projects Page', headerShown: true}}
          />
          
          <Stack.Screen
            name="JiraIssues"
            component={JiraIssues}
            options={{title: 'Jira Issues Page', headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}
