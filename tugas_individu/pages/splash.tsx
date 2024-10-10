import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/X_logo_2023_(white).png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    logo: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default SplashScreen;
