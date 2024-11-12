import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [uri, setUri] = useState("");
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
      console.log("Media Library Permission:", mediaLibraryStatus.status);

      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      console.log("Camera Permission:", cameraStatus.status);
    })();
  }, []);

  const openImagePicker = async () => {
    if (!hasMediaLibraryPermission) {
      Alert.alert("Izin Ditolak", "App membutuhkan izin galeri untuk mengakses gambar.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image picked URI:", result.uri);  
      setUri(result.uri || result.assets?.[0]?.uri); 
    } else {
      console.log("User cancelled image picker");
    }
  };

  const handleCameraLaunch = async () => {
    if (!hasCameraPermission) {
      Alert.alert("Izin Ditolak", "App membutuhkan izin kamera untuk mengambil gambar.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Image captured URI:", result.uri);  
      setUri(result.uri || result.assets?.[0]?.uri); 
    } else {
      console.log("User cancelled camera");
    }
  };

  const saveFile = async () => {
    if (!uri) {
      Alert.alert("Tidak Ada Gambar", "Silakan pilih atau ambil gambar terlebih dahulu.");
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

        Alert.alert("Sukses", `Foto berhasil disimpan di album Pictures.\nFile JSON dibuat di: ${fileUri}`);
      } else {
        Alert.alert("Izin Ditolak", "Tidak dapat menyimpan foto ke galeri karena izin tidak diberikan.");
      }
    } catch (error) {
      console.log("Error creating file with image: ", error);
      Alert.alert("Gagal", "Terjadi kesalahan saat membuat file dengan gambar.");
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
        <Button title="Create File" onPress={saveFile} />
      </View>
      {uri ? (
        <>
          <Image source={{ uri }} style={styles.image} />
        </>
      ) : null}
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
});
