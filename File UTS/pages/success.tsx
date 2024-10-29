import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppContext } from './AppContext';
import styles from './styles/success';

const Success = ({ navigation }) => {
  const context = useContext(AppContext);
  const [isWaiting, setIsWaiting] = useState(true); 
  const [showCloseButton, setShowCloseButton] = useState(false); 

  if (!context) {
    return <Text>Error: Context not found</Text>;
  }

  const { transactionHistory } = context;
  const latestTransaction = transactionHistory.length > 0 ? transactionHistory[0] : null;

  if (!latestTransaction) {
    return <Text>Tidak ada transaksi terbaru.</Text>;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaiting(false); 
      setShowCloseButton(true); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
      {isWaiting ? (
        <>
          <FontAwesome5 name="hourglass-half" size={80} color="white" style={styles.icon} />
          <Text style={styles.title}>Sedang Memproses...</Text>
          <ActivityIndicator size="large" color="#fff" />
        </>
      ) : (
        <>
          <FontAwesome5 name="check-circle" size={80} color="white" style={styles.icon} />
          <Text style={styles.title}>Pembelian Berhasil!</Text>
          <Text style={styles.amountText}>Pembayaran sebesar</Text>
          <Text style={styles.amount}>{latestTransaction.amount}</Text>
          <Text style={styles.date}>{latestTransaction.date}</Text>
          <Text style={styles.balanceText}>
            Saldo kamu sekarang Rp {latestTransaction.remainingBalance}.
          </Text>
        </>
      )}

      {showCloseButton && (
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.closeButtonText}>Tutup</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Success;
