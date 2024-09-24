import React from 'react';
import { ScrollView, View } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme, Card, Paragraph, Avatar, IconButton } from 'react-native-paper';
import data from './data.json';
import styles from "./styles.js";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac4',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ScrollView style={styles.scrollContainer}>
        {data.map((item, index) => {
          return (
            <Card key={index} style={styles.card}>
              <Card.Title
                title={item.name}
                subtitle={item.email}
                left={(props) => <Avatar.Image {...props} source={{ uri: item.photo_url }} />}
              />
              <Card.Cover source={{ uri: item.photo_url }} />
              <Card.Content>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <View>
                  <IconButton icon="chat" onPress={() => console.log('Chat pressed')} />
                  <IconButton icon="heart" onPress={() => console.log('Love pressed')} />
                </View>
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
    </PaperProvider>
  );
}
