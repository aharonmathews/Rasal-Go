import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ChoiceScreen = ({ navigation }) => {
  const handleDatabaseTable = () => {
    navigation.navigate('DatabaseTable');
  };

  const handleLocationTracker = () => {
    navigation.navigate('LocationTracker');
  };

  return (

    <View style={styles.container}>
      <Text style={styles.textStyling}>
        Choose from the below options :
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleDatabaseTable}>
        <Text style={styles.buttonText}>Database Table</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLocationTracker}>
        <Text style={styles.buttonText}>Location Tracker</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  textStyling: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChoiceScreen;
