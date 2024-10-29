import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomNavbar from './navbar';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Payment = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        Alert.alert('QR Code Scanned', `Data: ${data}`);
        // Lanjutkan dengan logika setelah data QR code dipindai
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Halaman Pembayaran</Text>

                <View style={styles.cameraContainer}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    >
                        <View style={styles.gridOverlay}>
                            <View style={styles.gridRow}>
                                <View style={styles.gridCell} />
                                <View style={styles.gridCell} />
                                <View style={styles.gridCell} />
                            </View>
                            <View style={styles.gridRow}>
                                <View style={styles.gridCell} />
                                <View style={styles.gridCell} />
                                <View style={styles.gridCell} />
                            </View>
                            <View style={styles.gridRow}>
                                <View style={styles.gridCell} />
                                <View style={styles.gridCell} />
                                <View style={styles.gridCell} />
                            </View>
                        </View>
                    </BarCodeScanner>
                </View>

                <View style={styles.qrisContainer}>
                    <Image source={require('../assets/qris.png')} style={styles.qrisLogo} />
                </View>

                {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
            </View>
            <View style={styles.navbarContainer}>
              <CustomNavbar navigation={navigation} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 10,
    },
    cameraContainer: {
        flex: 4,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginVertical: 20,
    },
    gridOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    gridRow: {
        flexDirection: 'row',
    },
    gridCell: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#fff',
    },
    qrisContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 80,
    },
    qrisLogo: {
        width: 160,
        height: 60,
    },
    navbarContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: Platform.OS === 'ios' ? 80 : 60,
      backgroundColor: '#fff',
    },
});

export default Payment;
