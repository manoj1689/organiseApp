import {View, Text} from 'react-native';
import {RealmProvider} from '@realm/react';
import {Profile, Task} from './models/schema';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GoogleSignIn from './auth/GoogleSignIn';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <Text>App</Text>
      <RealmProvider
        schema={[Profile, Task]}
        schemaVersion={2}
        deleteRealmIfMigrationNeeded>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="GoogleSignIn"
            screenOptions={{headerShown: true}}>
            <Stack.Screen
              name="GoogleSignIn"
              component={GoogleSignIn}
              options={{title: 'Google Sign In'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </>
  );
}
