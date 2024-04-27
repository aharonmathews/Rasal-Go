import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import haversine from 'haversine';
import * as Location from 'expo-location';

const LocationTracker = () => {
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(0);
  const [tracking, setTracking] = useState(false);
  const [startLocation, setStartLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission is required for tracking.');
        return;
      }
    })();
  }, []);

  const startTracking = () => {
    if (!tracking && startLocation) {
      setTracking(true);
      setLocationError(null);
    } else {
      alert('Tracking', 'Tracking already in progress or no initial location.');
    }
  };

  const stopTracking = () => {
    setTracking(false);
  };

  const calculateDistance = (newLocation) => {
    if (startLocation) {
      const newDistance = haversine(startLocation, newLocation);
      setDistance((prevDistance) => prevDistance + newDistance);
    }
    setStartLocation(newLocation);
  };

  const onLocationChange = (location) => {
    if (tracking) {
      setPath((prevPath) => [...prevPath, location.coords]);
      calculateDistance(location.coords);
    }
  };

  return (
    <View style={styles.container}>
      {locationError ? (
        <Text style={styles.error}>{locationError}</Text>
      ) : (
        <>
          <MapView
            style={styles.map}
            showsUserLocation
            followsUserLocation
            onUserLocationChange={onLocationChange}
          >
            <Polyline coordinates={path} strokeWidth={5} />
            {path.length > 0 && <Marker coordinate={path[path.length - 1]} />}
          </MapView>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>
              Distance Traveled: {distance.toFixed(2)} km
            </Text>
          </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={startTracking} title="Start Tracking" />
        <Button onPress={stopTracking} title="End Tracking" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '70%',
  },
  distanceContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  error: {
    textAlign: 'center',
    marginTop: 10,
    color: 'red',
  },
});

export default LocationTracker;