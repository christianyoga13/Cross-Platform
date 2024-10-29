import React from 'react';
import { ScrollView, View, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme, Card, Paragraph, Avatar, IconButton } from 'react-native-paper';
import data from '../data.json';
import styles from "../styles.js";
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac4',
  },
};

const UserList= ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {data.map((user, index) => (
        <Animated.View
          key={user.name} 
          entering={FadeInUp.delay(index * 100)} 
          style={[styles.userList, { width: width - 20, marginBottom: 10 }]}
        >
          <TouchableOpacity
            style={[styles.card, { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 10, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, width: '100%' }]}
            onPress={() => navigation.navigate('Profile', { 
              userName: user.name, 
              userPhoto: user.photo_url, 
              userEmail: user.email 
            })}
          >
            <Avatar.Image source={{ uri: user.photo_url }} size={50} />
            <View style={{ marginLeft: 10 }}>
              <Text style={[styles.boldText, { fontSize: 18 }]}>{user.name}</Text>
              <Text>{user.email}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

export default UserList;