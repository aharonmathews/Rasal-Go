import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const LocationTracker = () => {
  const [started, setStarted] = useState(false);
  const [distance, setDistance] = useState(0);
  const [multipliedDistance, setMultipliedDistance] = useState(0);
  const [cumulativeDistance, setCumulativeDistance] = useState(0);
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [withinRadius, setWithinRadius] = useState(false);

  let watchId;

  const calculateDistance = (coords1, coords2) => {
    const earthRadius = 6371; // kilometers 
    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;
  
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distance = earthRadius * c; // Calculate distance
  
    return distance;
  };
  
  
  

  useEffect(() => {
    if (initialPosition && currentPosition) {
      const newDistance = calculateDistance(initialPosition.coords, currentPosition.coords);
      setDistance(newDistance);
      setCumulativeDistance(prevCumulativeDistance => prevCumulativeDistance + newDistance);
      setMultipliedDistance(cumulativeDistance * 10);
    }
  }, [initialPosition, currentPosition]);

  useEffect(() => {
    if (initialPosition && currentPosition) {
      const earthRadius = 6371;
      const radius = 0.5;
  
      const initialLat = initialPosition.coords.latitude;
      const initialLon = initialPosition.coords.longitude;
      const currentLat = currentPosition.coords.latitude;
      const currentLon = currentPosition.coords.longitude;
  
      const dLat = (initialLat - currentLat) * Math.PI / 180;
      const dLon = (initialLon - currentLon) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(initialLat * Math.PI / 180) * Math.cos(currentLat * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
  
      setWithinRadius(distance <= radius);
    }
  }, [initialPosition, currentPosition]);
  

  const handleStart = () => {
    setStarted(true);
    Geolocation.getCurrentPosition(
      (position) => {
        setInitialPosition(position);
        setCurrentPosition(position);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    watchId = Geolocation.watchPosition(
      (position) => {
        setCurrentPosition(position);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleStop = () => {
    setStarted(false);
    Geolocation.clearWatch(watchId);
    setDistance(0);
    setMultipliedDistance(0);
    setCumulativeDistance(0);
    setWithinRadius(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.distanceText}>{`Distance Travelled: ${cumulativeDistance.toFixed(2)} kilometers`}</Text>
      <Text style={styles.multipliedDistanceText}>{`PAY: ${multipliedDistance.toFixed(2)}`}</Text>
      {!started ? (
        <Button title="Start Tracking" onPress={handleStart} style={styles.button} />
      ) : (
        <Button title="Stop Tracking" onPress={handleStop} style={styles.button} disabled={!withinRadius} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  distanceText: {
    fontSize: 18,
    marginBottom: 10,
  },
  multipliedDistanceText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'green',
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});

export default LocationTracker;
