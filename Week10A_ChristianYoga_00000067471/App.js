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
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";

export default function App() {
  const [uri, setUri] = useState("");
  const [locationHistory, setLocationHistory] = useState([]);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");

      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
      }
    })();
  }, []);

  const openImagePicker = async () => {
    if (!hasMediaLibraryPermission) {
      Alert.alert("Permission Denied", "App requires gallery permission.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUri(result.uri || result.assets?.[0]?.uri);
    } else {
      console.log("User cancelled image picker");
    }
  };

  const handleCameraLaunch = async () => {
    if (!hasCameraPermission) {
      Alert.alert("Permission Denied", "App requires camera permission.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUri(result.uri || result.assets?.[0]?.uri);
    } else {
      console.log("User cancelled camera");
    }
  };

  const saveImageFile = async () => {
    if (!uri) {
      Alert.alert("No Image", "Please select or capture an image first.");
      return;
    }

    try {
      const base64Image = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileContent = JSON.stringify(
        { image: base64Image, uri: uri },
        null,
        2
      );

      const fileName = "imageData.json";
      const fileUri = FileSystem.documentDirectory + fileName;

      await FileSystem.writeAsStringAsync(fileUri, fileContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (hasMediaLibraryPermission) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        let album = await MediaLibrary.getAlbumAsync("Pictures");

        if (!album) {
          await MediaLibrary.createAlbumAsync("Pictures", asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }

        Alert.alert(
          "Success",
          `Photo saved to Pictures album.\nFile JSON created at: ${fileUri}`
        );
      } else {
        Alert.alert(
          "Permission Denied",
          "Cannot save photo to gallery without permission."
        );
      }
    } catch (error) {
      console.log("Error creating file with image: ", error);
      Alert.alert("Failed", "An error occurred while creating the file.");
    }
  };

  const getGeolocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocationHistory((prev) => [
        ...prev,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to fetch location.");
    }
  };

  const saveLocationToFile = async () => {
    if (locationHistory.length === 0) {
      Alert.alert("No Data", "No geolocation data to save.");
      return;
    }
  
    try {
      // Format isi file
      const fileContent = locationHistory
        .map(
          (loc) =>
            `Timestamp: ${loc.timestamp}\nLatitude: ${loc.latitude}\nLongitude: ${loc.longitude}\n\n`
        )
        .join("");
  
      const fileName = "GeolocationHistory.txt";
      const downloadUri = `${FileSystem.cacheDirectory}${fileName}`; 
  
      await FileSystem.writeAsStringAsync(downloadUri, fileContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });
  
      const downloadsPath =
        `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.copyAsync({
        from: downloadUri,
        to: downloadsPath,
      });
  
      Alert.alert("Success", `File successfully saved to ${downloadsPath}`);
      console.log("File saved at:", downloadsPath);
    } catch (error) {
      console.error("Error saving location to file:", error);
      Alert.alert("Error", `Failed to save geolocation data: ${error.message}`);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Christian Yoga Shandy Kurniadi - 00000067471
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Open Gallery" onPress={openImagePicker} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Create Image File" onPress={saveImageFile} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Get Geolocation" onPress={getGeolocation} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save Location History" onPress={saveLocationToFile} />
      </View>
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <Text style={styles.infoText}>No image selected.</Text>
      )}
      <View style={styles.locationList}>
        {locationHistory.map((loc, index) => (
          <Text key={index} style={styles.locationText}>
            {index + 1}. Lat: {loc.latitude}, Lon: {loc.longitude}
          </Text>
        ))}
      </View>
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
    fontSize: 12,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationList: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 10,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
  },
});
