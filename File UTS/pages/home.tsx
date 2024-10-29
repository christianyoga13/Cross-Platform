import React, { useRef, useState, useContext } from 'react';
import { View, Text, ScrollView, Dimensions, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Avatar, Title, Paragraph, IconButton } from 'react-native-paper';
import styles from './styles/home';
import CustomNavbar from './navbar';
import { AppContext } from './AppContext'; 
import { useTranslation } from 'react-i18next'; 
import { useTheme } from './ThemeContext';

const carouselItems = [
  { id: '1', illustration: "https://via.placeholder.com/350x150/FFB6C1/000000?text=Promo+1" },
  { id: '2', illustration: "https://via.placeholder.com/350x150/87CEFA/000000?text=Promo+2" },
  { id: '3', illustration: "https://via.placeholder.com/350x150/32CD32/000000?text=Promo+3" },
];

const Home = ({ navigation }) => {
  const { t } = useTranslation(); 
  const { transactionHistory } = useContext(AppContext); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const widthWindows = Dimensions.get('window').width;
  const { isDarkMode } = useTheme();
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / widthWindows);
    setCurrentIndex(index);
  };

  const goToSlide = (index) => {
    scrollViewRef.current.scrollTo({ x: index * widthWindows, animated: true });
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container1]}>
      <ScrollView>
        <View style={{ backgroundColor: '#1C3D72', paddingTop: 20, paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image
            size={40}
            source={require('../assets/Union.png')}
            style={styles.logo}
          />
          <Text style={styles.topTitle}> All-U-Need </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.backgroundCards}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text style={styles.userName}>Farion Tekkry</Text>
                <Text style={styles.year}>2021</Text>
              </Card.Content>
              <View style={styles.divider} />
              <View style={styles.actionContainer}>
                <View style={styles.actionItem}>
                  <IconButton icon="arrow-up-circle" size={24} iconColor='#3498DB' />
                  <Text style={styles.actionLabel}>{t('transfer')}</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View style={styles.actionItem}>
                  <IconButton icon="arrow-down-circle" size={24} iconColor='#3498DB' />
                  <Text style={styles.actionLabel}>{t('withdraw')}</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View style={styles.actionItem}>
                  <IconButton icon="menu" size={24} iconColor='#3498DB' />
                  <Text style={styles.actionLabel}>{t('more')}</Text>
                </View>
              </View>
            </Card>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', paddingLeft: 25, paddingRight: 25 }}>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('TopUp', { type: 'pulsa' })}>
                <Avatar.Icon size={48} icon="cellphone" style={styles.iconBackground} color='#000' />
                <Text style={[styles.iconLabel, themeStyles.text]}>{t('pulsaData')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('TopUp', { type: 'listrik' })}>
                <Avatar.Icon size={48} icon="flash" style={styles.iconBackground} color='#fffb05' />
                <Text style={[styles.iconLabel, themeStyles.text]}>{t('electricity')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('TopUp', { type: 'bpjs' })}>
                <Avatar.Icon size={48} icon="shield" style={[styles.iconBackground]} color='#00923a' />
                <Text style={[styles.iconLabel, themeStyles.text]}>{t('bpjs')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            ref={scrollViewRef}
            style={styles.scrollView}
          >
            {carouselItems.map((item, index) => (
              <View key={index} style={[styles.slide, { width: widthWindows }]}>
                <Image source={{ uri: item.illustration }} style={styles.image} />
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotsContainer}>
            {carouselItems.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, { backgroundColor: currentIndex === index ? '#333' : '#bbb' }]}
                onPress={() => goToSlide(index)}
              />
            ))}
          </View>

          <View style={styles.lastTransaction}>
            <Title style={[styles.titleSub, themeStyles.text]}>{t('recentTransactions')}</Title>
            {transactionHistory.slice(0, 3).map((transaction, index) => (
              <Card key={index} style={[styles.card, { marginBottom: 5 }]}>
                <Card.Content>
                  <Title style={{fontWeight: 'bold', color:'blue'}}>{t(transaction.option)} - {transaction.type}</Title>
                  <Paragraph>{t('transactionDetails')} - {transaction.date}</Paragraph>
                  <Text>{t('amount')}: {transaction.amount}</Text>
                </Card.Content>
              </Card>
            ))}
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={[styles.viewMore, themeStyles.text1]}>{t('viewMore')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navbarWrapper}>
        <CustomNavbar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const lightStyles = StyleSheet.create({
  container1: { backgroundColor: '#f8f8f8' },
  container: { backgroundColor: '#fff' },
  text: { color: '#000' },
  card: { backgroundColor: '#f9f9f9' },
  text1: { color: '#1C3D72' },
});

const darkStyles = StyleSheet.create({
  container1: { backgroundColor: '#31363F' },
  container: { backgroundColor: '#1A1A19' },
  text: { color: '#fff' },
  card: { backgroundColor: '#1e1e1e' },
  text1: { color: '#3498DB' },
});

export default Home;
