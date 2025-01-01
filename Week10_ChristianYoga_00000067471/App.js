import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    try {
      // Minta izin lokasi
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'You need to grant location permission to use this feature.'
        );
        return;
      }

      // Dapatkan lokasi saat ini
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      console.log('Location:', location);
      setCoords(location.coords);
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error', 'Failed to fetch location.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Geolocation in Bridgeless Mode</Text>
      <Button title="GET GEO LOCATION" onPress={getLocation} />
      {coords ? (
        <View style={styles.coordsContainer}>
          <Text style={styles.coordsText}>Longitude: {coords.longitude}</Text>
          <Text style={styles.coordsText}>Latitude: {coords.latitude}</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>Press the button to fetch your location</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  coordsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  coordsText: {
    fontSize: 16,
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
});
