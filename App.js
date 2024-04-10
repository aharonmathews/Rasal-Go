import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import LocationTracker from './logic/LocationTracker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LocationTracker" component={LocationTracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
