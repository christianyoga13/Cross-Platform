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
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { db, storage } from "./firebase"; 
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);

      savePushTokenToFirestore(token);
      return token;
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const savePushTokenToFirestore = async (token) => {
    try {
      await addDoc(collection(db, "pushTokens"), {
        token: token,
        timestamp: serverTimestamp(),
      });
      console.log("Push token saved successfully!");
    } catch (error) {
      console.error("Error saving push token:", error);
    }
  };

  const openCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets ? result.assets[0].uri : result.uri;
        setImageUri(uri);
      }
    } catch (error) {
      console.error("Error opening camera:", error);
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
    } catch (error) {
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

      await addDoc(collection(db, "photos"), {
        photo_url: imageUrl,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: serverTimestamp(),
      });

      await sendNotificationToAllDevices(location);

      Alert.alert("Success", "Image and location saved to Firebase.");
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      Alert.alert("Error", "Failed to save data to Firebase.");
    }
  };

  const sendNotificationToAllDevices = async (location) => {
    try {
      const snapshot = await getDocs(collection(db, "pushTokens"));
      const tokens = snapshot.docs.map((doc) => doc.data().token);

      const messages = tokens.map((token) => ({
        to: token,
        sound: "default",
        title: "Data Saved",
        body: `Location: (${location.latitude}, ${location.longitude})`,
      }));

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });

      const data = await response.json();
      console.log("Notifications sent:", data);
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Christian Yoga Shandy Kurniadi - 00000067471</Text>
      <View style={styles.buttonContainer}>
        <Button title="Open Camera" onPress={openCamera} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Fetch Geolocation" onPress={fetchGeolocation} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save to Firebase" onPress={saveToFirebase} />
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {location && (
        <View style={styles.locationContainer}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  locationContainer: {
    marginVertical: 10,
  },
});
