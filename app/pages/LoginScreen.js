import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'; // Import for Gradient
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../config/firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('LocationTracker');
    } catch (error) {
      console.log(error);
      alert('Sign-in failed ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    navigation.navigate('CreateAccount');
  }

  return (
    <View style={styles.container}>
      
      <Image source={require('../../assets/wallpaper2.png')} style={styles.backgroundImage} />

      
      <View style={styles.contentOverlay}>
        <View style={styles.centeredContent}>
          <Text style={styles.title}>Welcome!</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.fieldLabel}>Username:</Text>
            <TextInput
              placeholder="Enter username"
              value={email}
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.fieldLabel}>Password:</Text>
            <TextInput
              placeholder="Enter password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <Button title='Login' onPress={signIn} style={styles.primaryButton} color="transparent" ></Button>
          <Button title='Create Account' onPress={signUp}  color="transparent" autoCapitalize='false' ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Stretch image to fill container
    position: 'absolute', // Place image behind content
    width: '100%', // Ensure image covers entire width
    height: '100%', // Ensure image covers entire height
  },
  contentOverlay: {
    flex: 1, // Allow content to fill remaining space
    justifyContent: 'center', // Center elements within the overlay
    alignItems: 'center', // Center elements horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
  },
  centeredContent: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff', // White text
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#fff', // White text
    marginBottom: 5,
  },
  textInput: {
    padding: 10,
    backgroundColor: '#fff', // White input background
    borderRadius: 10,
    fontSize: 16,
  },
  primaryButton:{
    
  }
  
  
});

export default LoginScreen;
