import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native'; // Import LottieView here

import LoginScreen from './app/pages/LoginScreen';
import DatabaseTable from './app/pages/DatabaseTable';
import CreateAccount from './app/pages/CreateAccount';
import LocationTracker from './app/pages/LocationTracker';

const Stack = createNativeStackNavigator();

const App = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
    }, 3000); // Show animation for 3 seconds
  }, []);

  return (
    <NavigationContainer>
      {showAnimation ? (
        <View style={styles.container}>
          <LottieView
            source={require('./assets/animation/bikeAnimation.json')}
            autoPlay
            loop={false}
            style={[styles.animationContainer, { transform: [{ scaleX: -1 }] }]}
            onAnimationFinish={() => setShowAnimation(false)}
          />
        </View>
      ) : (
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DatabaseTable" component={DatabaseTable} options={{ headerShown: false }} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
          <Stack.Screen name="LocationTracker" component={LocationTracker} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default App;
