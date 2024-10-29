import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';
import styles from './styles/pulsapaket';

const validPrefixes = ['081', '082', '083', '084', '085', '086', '087', '088', '089'];

const pulsaOptions = [
  { id: '1', amount: '5.000', price: 'Rp 6.500', type: 'Pulsa' },
  { id: '2', amount: '10.000', price: 'Rp 11.500', type: 'Pulsa' },
  { id: '3', amount: '25.000', price: 'Rp 26.500', type: 'Pulsa' },
  { id: '4', amount: '50.000', price: 'Rp 51.500', type: 'Pulsa' },
  { id: '5', amount: '100.000', price: 'Rp 101.500', type: 'Pulsa'  },
];

const paketDataOptions = [
  { id: '1', package: '1GB', price: 'Rp 10.000', type: 'Paket Data' },
  { id: '2', package: '3GB', price: 'Rp 25.000', type: 'Paket Data' },
  { id: '3', package: '5GB', price: 'Rp 40.000', type: 'Paket Data' },
  { id: '4', package: '10GB', price: 'Rp 75.000', type: 'Paket Data' },
  { id: '5', package: '20GB', price: 'Rp 150.000', type: 'Paket Data' },
];

const listrikOptions = [
  { id: '1', amount: '20.000', price: 'Rp 22.000', type: 'Listrik' },
  { id: '2', amount: '50.000', price: 'Rp 52.000', type: 'Listrik' },
  { id: '3', amount: '100.000', price: 'Rp 102.000', type: 'Listrik' },
  { id: '4', amount: '200.000', price: 'Rp 202.000', type: 'Listrik' },
  { id: '5', amount: '500.000', price: 'Rp 502.000', type: 'Listrik' },
];

const bpjsOptions = [
  { id: '1', months: '1 bulan', price: 'Rp 50.000', type: 'BPJS' },
  { id: '2', months: '3 bulan', price: 'Rp 150.000', type: 'BPJS' },
  { id: '3', months: '6 bulan', price: 'Rp 300.000', type: 'BPJS' },
  { id: '4', months: '12 bulan', price: 'Rp 600.000', type: 'BPJS' },
];

const getValidationSchema = (transactionType: string) => {
  switch (transactionType) {
    case 'pulsa':
    case 'paketdata':
      return Yup.object().shape({
        number: Yup.string()
          .matches(/^08[0-9]{8,11}$/, "Nomor telepon harus dimulai dengan '08' dan terdiri dari 10 - 13 digit")
          .test('is-valid-prefix', 'Prefix nomor telepon tidak valid', value => {
            if (!value) return false;
            const prefix = value.slice(0, 3);
            return validPrefixes.includes(prefix);
          })
          .required('Nomor telepon diperlukan'),
      });
    case 'listrik':
      return Yup.object().shape({
        number: Yup.string()
          .matches(/^[1-9][0-9]{11}$/, "Nomor ID pelanggan tidak valid, harus terdiri dari 12 digit dan tidak boleh diawali dengan angka 0")
          .required('Nomor ID pelanggan diperlukan'),
      });
    case 'bpjs':
      return Yup.object().shape({
        number: Yup.string()
          .matches(/^0[0-9]{12}$/, "Nomor BPJS harus berjumlah 13 digit dan dimulai dengan angka 0")
          .required('Nomor BPJS diperlukan'),
      });
    default:
      return Yup.object().shape({});
  }
};
type RootStackParamList = {
  PulsaPaket: { type: string };
  Confirm: { number: string; price: string; operator: string, type: string };
};

type PulsaPaketRouteProp = RouteProp<RootStackParamList, 'PulsaPaket'>;
type PulsaPaketNavigationProp = StackNavigationProp<RootStackParamList, 'PulsaPaket'>;

interface PulsaPaketProps {
  route: PulsaPaketRouteProp;
}

const PulsaPaket: React.FC<PulsaPaketProps> = ({ route }) => {
  const { type: rawType } = route.params; 
  const normalizedType = rawType.toLowerCase(); 
  const [selectedItem, setSelectedItem] = useState<any>(null); 
  const [tab, setTab] = useState<string>(normalizedType === 'paketdata' ? 'paketdata' : 'pulsa'); 
  const navigation = useNavigation<PulsaPaketNavigationProp>(); 

  useEffect(() => {
    console.log('Type:', rawType);
    console.log('Normalized Type:', normalizedType);
    console.log('Tab:', tab);
  }, [rawType, normalizedType, tab]);

  const handleSelection = (item: any) => {
    setSelectedItem(item);
  };

  const getRightIcon = () => {
    if (normalizedType === 'listrik') {
      return <MaterialCommunityIcons name="flash" size={24} color="grey" />;
    } else if (normalizedType === 'bpjs') {
      return <FontAwesome5 name="id-card" size={24} color="grey" />;
    } else {
      return <Icon name="contacts" size={24} color="grey" />;
    }
  };

  const renderOptions = () => {
    if (normalizedType === 'pulsa' || normalizedType === 'paketdata') {
      if (tab === 'pulsa') {
        return pulsaOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.infoBox, selectedItem?.id === item.id && styles.selectedInfoBox]}
            onPress={() => handleSelection(item)}
          >
            <Text style={styles.infoText}>{item.amount}</Text>
            <Text style={styles.infoPrice}>{item.price}</Text>
          </TouchableOpacity>
        ));
      } else if (tab === 'paketdata') {
        return paketDataOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.infoBox, selectedItem?.id === item.id && styles.selectedInfoBox]}
            onPress={() => handleSelection(item)}
          >
            <Text style={styles.infoText}>{item.package}</Text>
            <Text style={styles.infoPrice}>{item.price}</Text>
          </TouchableOpacity>
        ));
      }
    } else {
      switch (normalizedType) {
        case 'listrik':
          return listrikOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.infoBox, selectedItem?.id === item.id && styles.selectedInfoBox]}
              onPress={() => handleSelection(item)}
            >
              <Text style={styles.infoText}>{item.amount}</Text>
              <Text style={styles.infoPrice}>{item.price}</Text>
            </TouchableOpacity>
          ));
        case 'bpjs':
          return bpjsOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.infoBox, selectedItem?.id === item.id && styles.selectedInfoBox]}
              onPress={() => handleSelection(item)}
            >
              <Text style={styles.infoText}>{item.months}</Text>
              <Text style={styles.infoPrice}>{item.price}</Text>
            </TouchableOpacity>
          ));
        default:
          return null;
      }
    }
  };

  
  const { isDarkMode, toggleTheme } = useTheme();
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <ScrollView contentContainerStyle={[styles.container, themeStyles.container]}>
      <TouchableOpacity style={[styles.backButton, themeStyles.container]} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={isDarkMode ? "white" : "black"} />
      </TouchableOpacity>

      <Text style={[styles.title, themeStyles.text]}>
        Transaksi {normalizedType.charAt(0).toUpperCase() + normalizedType.slice(1)}
      </Text>

      <Formik
        initialValues={{ number: '' }}
        validationSchema={getValidationSchema(normalizedType)}
        onSubmit={(values) => {
          console.log('Submitting form with:', {
            number: values.number,
            price: selectedItem ? selectedItem.price : 'Rp 0',
            operator: selectedItem ? selectedItem.amount || selectedItem.package || selectedItem.months : 'Operator',
          });
        
          navigation.navigate('Confirm', {
            number: values.number,
            price: selectedItem ? selectedItem.price : 'Rp 0',
            operator: selectedItem ? selectedItem.amount || selectedItem.package || selectedItem.months : 'Operator',
            type: selectedItem.type,
          });
        }}
      >


        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
            <Input
              placeholder={`Masukkan No ${
                normalizedType === 'pulsa' || normalizedType === 'paketdata'
                  ? 'Ponsel'
                  : normalizedType === 'listrik'
                  ? 'ID Pelanggan'
                  : 'BPJS'
              }`}
              label={`Nomor ${
                normalizedType === 'pulsa' || normalizedType === 'paketdata'
                  ? 'Ponsel'
                  : normalizedType === 'listrik'
                  ? 'ID Pelanggan Listrik'
                  : 'BPJS'
              }`}
              onChangeText={handleChange('number')}
              onBlur={handleBlur('number')}
              value={values.number}
              errorMessage={touched.number && errors.number ? errors.number : undefined}
              keyboardType="number-pad"
              containerStyle={[styles.inputContainer, themeStyles.inputContainer]}
              inputStyle={[themeStyles.inputText]}
              placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
              rightIcon={getRightIcon()} 
            />


            {(normalizedType === 'pulsa' || normalizedType === 'paketdata') && (
              <View style={[styles.tabContainer, themeStyles.container]}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    tab === 'pulsa' && [styles.activeTab, themeStyles.activeTab]
                  ]}
                  onPress={() => setTab('pulsa')}
                >
                  <Text style={[
                    styles.tabText,
                    tab === 'pulsa' ? [styles.activeTabText, themeStyles.activeTabText] : themeStyles.text
                  ]}>
                    Isi Pulsa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    tab === 'paketdata' && [styles.activeTab, themeStyles.activeTab]
                  ]}
                  onPress={() => setTab('paketdata')}
                >
                  <Text style={[
                    styles.tabText,
                    tab === 'paketdata' ? [styles.activeTabText, themeStyles.activeTabText] : themeStyles.text
                  ]}>
                    Paket Data
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={[styles.infoContainer, themeStyles.container]}>
              {renderOptions()}
            </View>

            <Button
              title="Submit"
              buttonStyle={[styles.submitButton]}
              onPress={() => handleSubmit()}
              disabled={!selectedItem || !values.number || !!errors.number}
            />
            </>
        )}
      </Formik>
    </ScrollView>
  );
};

const lightStyles = StyleSheet.create({
  container1: { backgroundColor: '#f8f8f8' },
  container: { backgroundColor: '#fff' },
  text: { color: '#000' },
  card: { backgroundColor: '#f9f9f9' },
  text1: { color: '#888' },
  button: { color: "#888" },
  activeTab: { backgroundColor: '#1C3D72' },
  activeTabText: { color: '#fff' },
  inputContainer: { borderColor: '#ddd' },
  inputText: { color: '#000' },
});

const darkStyles = StyleSheet.create({
  container1: { backgroundColor: '#31363F' },
  container: { backgroundColor: '#1A1A19' },
  text: { color: '#fff' },
  card: { backgroundColor: '#1e1e1e' },
  text1: { color: '#f8f8f8' },
  button: { color: "#f8f8f8" },
  activeTab: { backgroundColor: '#555' },
  activeTabText: { color: '#fff' },
  inputContainer: { borderColor: '#555' },
  inputText: { color: '#fff' },
});

export default PulsaPaket;
