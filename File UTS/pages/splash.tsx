import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import styles from './styles/splash';

const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Logo UMN.png')} style={styles.logo} />
        </View>
    );
};

export default SplashScreen;
