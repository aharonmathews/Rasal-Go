import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './app/pages/LoginScreen'; // Assuming LoginScreen.js is in the same directory
import LocationTracker from './app/pages/LocationTracker'; // Assuming DetectionScreen.js is in the same directory
import CreateAccount from './app/pages/CreateAccount';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">

        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LocationTracker" component={LocationTracker} options={{ headerShown: false }}  />
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
