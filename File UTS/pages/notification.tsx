import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform } from 'react-native';
import CustomNavbar from './navbar';
import { AppContext } from './AppContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeContext';
import styles from './styles/notification';

const Notification = ({ navigation }) => {
  const { transactionHistory } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const { t } = useTranslation(); 
  const { isDarkMode, toggleTheme } = useTheme();
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const generateFakeNotification = () => {
    const fakePromos = [
      'Promo diskon 50% untuk topup pulsa!',
      'Dapatkan cashback 20% setiap transaksi BPJS!',
      'Promo khusus untuk pembayaran listrik!',
    ];

    const randomPromo = fakePromos[Math.floor(Math.random() * fakePromos.length)];

    return {
      id: Date.now().toString(),
      message: randomPromo,
      date: new Date().toLocaleString(),
    };
  };

  const addNotification = (newNotification) => {
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = generateFakeNotification();
      addNotification(newNotification);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    transactionHistory.forEach((transaction) => {
      addNotification({
        id: transaction.id.toString(),
        message: `Transaksi berhasil: ${transaction.type} sebesar ${transaction.amount}`,
        date: transaction.date,
      });
    });
  }, [transactionHistory]);

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, themeStyles.container1]}>
      <Text style={[styles.title, themeStyles.text]}>{t('notification')}</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.noNotificationContainer}>
          <Text style={[styles.noNotificationText, themeStyles.text1]}>Belum ada notifikasi.</Text>
        </View>
      )}
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
  text1: { color: '#888' },
});

const darkStyles = StyleSheet.create({
  container1: { backgroundColor: '#31363F' },
  container: { backgroundColor: '#1A1A19' },
  text: { color: '#fff' },
  card: { backgroundColor: '#1e1e1e' },
  text1: { color: '#f8f8f8' },
});

export default Notification;
