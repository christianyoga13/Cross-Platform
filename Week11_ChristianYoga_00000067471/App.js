import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== "granted") {
        Alert.alert("Permission Denied", "Camera permission is required.");
      }

      // Minta izin lokasi
      const locationPermission =
        await Location.requestForegroundPermissionsAsync();
      if (locationPermission.status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch geolocation."
        );
      }
    })();
  }, []);

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Kembali gunakan MediaTypeOptions
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets ? result.assets[0].uri : result.uri; 
        setImageUri(uri);
        console.log("Image URI:", uri);
      } else {
        console.log("Camera cancelled");
      }
    } catch (error) {
      console.error("Error opening camera:", error);
    }
  };

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets ? result.assets[0].uri : result.uri; 
        setImageUri(uri);
        console.log("Image URI:", uri);
      } else {
        console.log("Library picker cancelled");
      }
    } catch (error) {
      console.error("Error opening library picker:", error);
    }
  };

  const fetchGeolocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      console.log("Location:", loc.coords);
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to fetch location.");
    }
  };

  const saveToFirebase = async () => {
    if (!imageUri || !location) {
      Alert.alert("Missing Data", "Please capture an image and fetch location.");
      return;
    }

    try {
      const imageName = `photos/${Date.now()}.jpg`;
      const imageRef = ref(storage, imageName);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      console.log("Image uploaded to Firebase Storage:", imageUrl);

      const docRef = await addDoc(collection(db, "photos"), {
        photo_url: imageUrl,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: serverTimestamp(),
      });

      console.log("Document written with ID:", docRef.id);
      Alert.alert("Success", "Image and location saved to Firebase.");
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      Alert.alert("Error", "Failed to save data to Firebase.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Christian Yoga Shandy Kurniadi - 00000067471
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Open Camera" onPress={openCamera} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Open Gallery" onPress={openImagePicker} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Fetch Geolocation" onPress={fetchGeolocation} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save to Firebase" onPress={saveToFirebase} />
      </View>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
      {location && (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Latitude: {location.latitude}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {location.longitude}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationContainer: {
    marginTop: 20,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
