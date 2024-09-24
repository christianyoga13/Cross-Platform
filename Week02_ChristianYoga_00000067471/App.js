import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import data from './data.json';

export default function App() {
  return (
    <ScrollView>
      {data.map((item, index) => (
        <View key={index} style={styles.container}>
          <Image source={{ uri: item.photo_url }} style={styles.gambar}/>
          <Text >{item.name}</Text>
          <Text style={styles.tulis}>{item.email}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gambar: {
    width: 125,
    height: 150, 
    marginTop: 10
  },
  tulis: {
    paddingBottom: 10
  }
});
