import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert, Vibration } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const Pin = ({ navigation }) => {
  const [pin, setPin] = useState(''); 
  const [isError, setIsError] = useState(false);

  const handlePinChange = (value) => {
    if (pin.length < 4) {
      setPin(pin + value); 
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1)); 
  };

  const handleSubmitPin = () => {
    if (pin.length === 4) {
      if (pin === '1234') { 
        navigation.navigate('Success');
      } else {
        setIsError(true);
        Vibration.vibrate(); 
        setTimeout(() => setIsError(false), 500); 
        Alert.alert('Error', 'PIN salah, silakan coba lagi.');
        setPin(''); 
      }
    } else {
      Alert.alert('Error', 'Masukkan PIN lengkap (4 digit).');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Masukkan PIN Anda</Text>
      </View>

      <Text style={styles.subtitle}>Masukkan PIN aplikasi Anda.</Text>

      <View style={styles.pinContainer}>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.pinDot,
                { backgroundColor: isError ? 'red' : pin.length > index ? '#0066FF' : '#E0E0E0' }
              ]}
            />
          ))}
      </View>

      <View style={styles.numpadContainer}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0'].map((num, index) => (
          <TouchableOpacity
            key={index}
            style={styles.numpadButton}
            onPress={() => num && handlePinChange(num)}
            disabled={!num}
          >
            {num ? (
              <Text style={styles.numpadText}>{num}</Text>
            ) : (
              <View style={styles.numpadPlaceholder} />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.numpadButton} onPress={handleDelete}>
          <MaterialIcons name="backspace" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: pin.length === 4 ? '#0066FF' : '#B0C4DE' }]}
        onPress={handleSubmitPin}
        disabled={pin.length !== 4}
      >
        <Text style={styles.submitButtonText}>Konfirmasi</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 80,
    marginBottom: 40,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
    width: '60%',
  },
  pinDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  numpadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  numpadButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  numpadText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  numpadPlaceholder: {
    width: '100%',
    height: '100%',
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pin;
