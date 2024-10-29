import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Button, Card, Avatar, Appbar, Title, Paragraph, IconButton } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

const carouselItems = [
  {
    title: "Item 1",
    text: "Text 1",
  },
  {
    title: "Item 2",
    text: "Text 2",
  },
  {
    title: "Item 3",
    text: "Text 3",
  },
];

const renderItem = ({ item, index }) => {
  return (
    <View style={styles.carouselItem}>
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselText}>{item.text}</Text>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Avatar.Image 
          size={40} 
          source={require('../assets/Union.png')} 
          style={{ backgroundColor: 'transparent' }} 
        />
        <Appbar.Content title="All-U-Need" />
      </Appbar.Header>

      <View style={styles.content}>
        <ScrollView>
          <View style={styles.backgroundCards}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.userName}>Farion Tekkry</Text>
                <Text style={styles.year}>2021</Text>
              </Card.Content>
              <View style={styles.divider} />
              <View style={styles.actionContainer}>
                <View style={styles.actionItem}>
                  <IconButton icon="arrow-up-circle" size={24} />
                  <Text style={styles.actionLabel}>Transfer</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View style={styles.actionItem}>
                  <IconButton icon="arrow-down-circle" size={24} />
                  <Text style={styles.actionLabel}>Tarik Tunai</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View style={styles.actionItem}>
                  <IconButton icon="menu" size={24} />
                  <Text style={styles.actionLabel}>More</Text>
                </View>
              </View>
              <View style={styles.divider} />
            </Card>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', paddingLeft: 25, paddingRight: 25 }}> 
              <View style={{ alignItems: 'center' }}>
                <Avatar.Icon size={56} icon="cellphone" style={[styles.iconBackground]} />
                <Text style={{ marginTop: 8 }}>Pulsa/Data</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Avatar.Icon size={56} icon="flash" style={[styles.iconBackground]} />
                <Text style={{ marginTop: 8 }}>Listrik</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Avatar.Icon size={56} icon="shield" style={[styles.iconBackground]} />
                <Text style={{ marginTop: 8 }}>BPJS</Text>
              </View>
            </View>
          </View>

          <Carousel
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
          />
        </ScrollView>
      </View>

      <Appbar style={styles.bottom}>
        <Appbar.Action icon="home" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="bell" onPress={() => {}} />
        <Appbar.Action icon="account" onPress={() => {}} />
        <Appbar.Action icon="cog" onPress={() => {}} />
      </Appbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  card: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 3,
  },
  cardContent: {
    paddingBottom: 14,
  },
  backgroundCards: {
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  year: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  actionItem: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  actionLabel: {
    fontSize: 12,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerVertical: {
    height: '100%',
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  bottom: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  card1: {
    margin: 16,
    borderRadius: 10,
  },
  cardContent1: {
    padding: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 150,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  carouselTitle: {
    fontSize: 20,
  },
  carouselText: {
    fontSize: 15,
  },
});

export default App;
