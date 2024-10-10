import React from 'react';
import { ScrollView, View, TouchableOpacity, Image, Text } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme, Card, Paragraph, Avatar, IconButton } from 'react-native-paper';
import data from '../data.json';
import styles from "../styles.js";

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
    <ScrollView>
      {data.map((users) => {
        return(
          <View style={styles.userList} key={users.name}>
            <TouchableOpacity
              style={styles.card}
                onPress={() => navigation.navigate('Profile', { userName: users.name, userPhoto: users.photo_url, userEmail: users.email })}
              >
              <Avatar.Image source={{ uri: users.photo_url }} />
              <View>
                <Text style={styles.boldText}>{users.name}</Text>
                <Text>{users.email}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>

  );
};

export default UserList;