import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { AppContext } from './AppContext';
import { useTheme } from './ThemeContext';
import styles from './styles/confirm';
import { useTranslation } from 'react-i18next';

const Confirm = ({ navigation, route }) => {
  const { t } = useTranslation(); 
  const { price, operator, number, type } = route.params; 
  const { user, updateBalance, addTransaction } = useContext(AppContext); 
  
  const { isDarkMode, toggleTheme } = useTheme();
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const handleConfirm = () => {
    const transactionAmount = parseInt(price.replace(/\D/g, '')); 
    const remainingBalance = user.balance - transactionAmount; 
  
    if (remainingBalance >= 0) {
      const newTransaction = {
        id: Math.random(), 
        amount: price,
        remainingBalance: remainingBalance.toLocaleString('id-ID'),
        date: new Date().toLocaleString(),
        type: operator,
        option: type,
      };
  
      addTransaction(newTransaction);
      updateBalance(remainingBalance);
  
      navigation.navigate('Pin', { transaction: newTransaction });
    } else {
      Alert.alert('Saldo Tidak Cukup', 'Saldo Anda tidak mencukupi untuk melakukan transaksi ini.');
    }
  };

  console.log('operator:', operator);
  console.log('price:', price);
  console.log('number:', number);
  console.log('type:', type);

  return (
    <SafeAreaView style={[themeStyles.container, {flex: 1}]}>
      <View style={[styles.container, themeStyles.container]}>
        <View style={styles.header}>
          <Text style={styles.title}>Konfirmasi Pembelian</Text>
        </View>
        <View style={[styles.paymentInfo, {marginHorizontal: 10}]}>
          <FontAwesome name="mobile-phone" size={60} color="black" style={styles.icon} />
          <View style={styles.paymentDetails}>
            <Text style={styles.operatorType}>{type}</Text>
            <Text style={styles.operator}>{operator || 'Unknown operator'}</Text>
            <Text style={styles.phoneNumber}>{number}</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>

        <View style={[styles.section, {marginHorizontal: 10}]}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Metode Pembayaran</Text>
          <View style={styles.paymentMethod}>
            <FontAwesome name="money" size={40} color="black" />
            <View style={styles.paymentMethodDetails}>
              <Text style={styles.walletText}>Saldo saya</Text>
              <Text style={styles.walletBalance}>Rp {user.balance.toLocaleString('id-ID')}</Text>
            </View>
            <Text style={styles.methodPrice}>{price}</Text>
          </View>
        </View>

        <View style={[styles.section, {marginHorizontal: 10}]}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>{t('transactionDetails')}</Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, themeStyles.text1]}>{t('priceV')}</Text>
            <Text style={[styles.detailValue, themeStyles.text]}>{price}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, themeStyles.text1]}>{t('transactionFee')}</Text>
            <Text style={[styles.detailValue, themeStyles.text]}>Rp 0</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.totalLabel, themeStyles.text1]}>Total Pembayaran</Text>
            <Text style={[styles.totalValue, themeStyles.text]}>{price}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.confirmButton, {marginHorizontal: 10}]} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Konfirmasi</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



const lightStyles = StyleSheet.create({
  container: { backgroundColor: '#f8f8f8' },
  text: { color: '#000' },
  text1: { color: '#666' },
});

const darkStyles = StyleSheet.create({
  container: { backgroundColor: '#31363F' },
  text: { color: '#fff' },
  text1: { color: '#f8f8f8' },
});

export default Confirm;
