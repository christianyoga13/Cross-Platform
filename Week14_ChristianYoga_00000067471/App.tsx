import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Image,
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
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// Redux Slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { successCount: 0, failedCount: 0 },
  reducers: {
    incrementSuccess: (state) => {
      state.successCount += 1;
    },
    incrementFailed: (state) => {
      state.failedCount += 1;
    },
  },
});

const { incrementSuccess, incrementFailed } = counterSlice.actions;
const store = configureStore({ reducer: { counter: counterSlice.reducer } });

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function App() {
  const dispatch = useDispatch();
  const successCount = useSelector((state: { counter: { successCount: number } }) => state.counter.successCount);
  const failedCount = useSelector((state: { counter: { failedCount: number } }) => state.counter.failedCount);
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

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
      savePushTokenToFirestore(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  const savePushTokenToFirestore = async (token) => {
    try {
      await addDoc(collection(db, "pushTokens"), {
        token: token,
        timestamp: serverTimestamp(),
      });
      dispatch(incrementSuccess());
    } catch (error) {
      dispatch(incrementFailed());
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
        const uri = result.assets[0].uri;
        setImageUri(uri);
      }
    } catch (error) {
      console.error("Error opening camera:", error);
    }
  };

  const fetchGeolocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch geolocation."
        );
        dispatch(incrementFailed());
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      dispatch(incrementSuccess());
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to fetch location. Please try again.");
      dispatch(incrementFailed());
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

      dispatch(incrementSuccess());
      sendNotificationToAllDevices();
    } catch (error) {
      dispatch(incrementFailed());
      console.error("Error saving to Firebase:", error);
    }
  };

  const showLocalNotification = (title, body) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: "default",
      },
      trigger: null,
    });
  };

  const sendNotificationToAllDevices = async () => {
    try {
      const snapshot = await getDocs(collection(db, "pushTokens"));
      const tokens = snapshot.docs.map((doc) => doc.data().token);

      const messages = tokens.map((token) => ({
        to: token,
        sound: "default",
        title: "Operation Summary",
        body: `Success: ${successCount}, Failed: ${failedCount}`,
      }));

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });

      showLocalNotification(
        "Operation Summary",
        `Success: ${successCount}, Failed: ${failedCount}`
      );

      console.log("Notifications sent:", response.status);
    } catch (error) {
      console.error("Error sending notifications:", error);
      showLocalNotification("Error", "Failed to send notifications.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Modified Week 12</Text>
      <Button title="Open Camera" onPress={openCamera} />
      <Button title="Fetch Geolocation" onPress={fetchGeolocation} />
      <Button title="Save to Firebase" onPress={saveToFirebase} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {location && (
        <View>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}
      <Text>Success Count: {successCount}</Text>
      <Text>Failed Count: {failedCount}</Text>
    </ScrollView>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
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
});
