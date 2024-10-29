import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import CustomNavbar from './navbar';
import { AppContext } from './AppContext';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { useTheme } from './ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const History = ({ navigation }) => {
  const { t } = useTranslation(); 
  const { transactionHistory } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const openModal = (item) => {
    setSelectedTransaction(item);
    setModalVisible(true);
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.transactionCard}>
        <Text style={styles.transactionType}>{item.option}</Text>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionAmount}>{t('amount1')}: {item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, themeStyles.container1]}>
      <View style={styles.content}>
        <Text style={[styles.title, themeStyles.text]}>{t('history1')}</Text>
        {transactionHistory.length > 0 ? (
          <View style={[styles.backgroundFlat, themeStyles.container]}>
            <FlatList
              data={transactionHistory}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
            />
          </View>
        ) : (
          <View style={styles.noHistoryContainer}>
            <Text style={[styles.noHistory, themeStyles.text1]}>Belum ada transaksi.</Text>
          </View>
        )}
      </View>
      <View style={styles.navbarContainer}>
        <CustomNavbar navigation={navigation} />
      </View>

      <Modal
        isVisible={modalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={{ margin: 0 }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detail Transaksi</Text>
            {selectedTransaction && (
              <>
                <Text style={styles.modalText}>ID: {selectedTransaction.id}</Text>
                <Text style={styles.modalText}>Jenis: {selectedTransaction.option}</Text>
                <Text style={styles.modalText}>Harga: {selectedTransaction.type}</Text>
                <Text style={styles.modalText}>Bayar: {selectedTransaction.amount}</Text>
                <Text style={styles.modalText}>Tanggal: {selectedTransaction.date}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 10,
    paddingBottom: 80, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingBottom: 80,
    marginTop: 15,
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: CARD_WIDTH,
    alignSelf: 'center',
  },
  transactionType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1C3D72',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  transactionRemaining: {
    fontSize: 14,
    color: '#666',
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHistory: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#1C3D72',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backgroundFlat: {
    backgroundColor: '#1C3D72',
    borderRadius: 10,
    flex: 1,
  },
});

const lightStyles = StyleSheet.create({
  container1: { backgroundColor: '#f8f8f8' },
  container: { backgroundColor: '#1C3D72' },
  text: { color: '#000' },
  card: { backgroundColor: '#f9f9f9' },
  text1: { color: '#888' },
});

const darkStyles = StyleSheet.create({
  container1: { backgroundColor: '#31363F' },
  container: { backgroundColor: '#E4E0E1' },
  text: { color: '#fff' },
  card: { backgroundColor: '#1e1e1e' },
  text1: { color: '#f8f8f8' },
});

export default History;
