import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; 
import { useTheme } from './ThemeContext';

const CustomNavbar = ({ navigation }) => {
    const { t } = useTranslation(); 
    const { isDarkMode, toggleTheme } = useTheme();
    const themeStyles = isDarkMode ? darkStyles : lightStyles;

    return (
        <View style={[styles.navbar, themeStyles.container]}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={[styles.navButton, { marginLeft: 5 }]}>
                <FontAwesome5 name="home" size={20} color="#808080" />
                <Text style={styles.navText}>{t('home')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.navButton}>
                <FontAwesome5 name="history" size={20} color="#808080" />
                <Text style={styles.navText}>{t('history')}</Text>
            </TouchableOpacity>

            <View style={styles.qrButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={styles.qrButton}>
                    <FontAwesome5 name="qrcode" size={25} color="white" />
                    <Text style={[styles.navText, {color: 'white'}]}>{t('pay')}</Text> 
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.navButton}>
                <MaterialIcons name="notifications" size={20} color="#808080" />
                <Text style={styles.navText}>{t('notifications')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[styles.navButton, { marginRight: 5 }]}>
                <FontAwesome5 name="user" size={20} color="#808080" />
                <Text style={styles.navText}>{t('profile')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: Platform.OS === 'ios' ? 80 : 60,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 10,
        marginTop: 2,
        color: '#808080',
    },
    qrButtonContainer: {
        position: 'relative',
        top: -5,
        backgroundColor: "#1C3D72",
        padding: 5,
        borderRadius: 50,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    qrButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
});

const lightStyles = StyleSheet.create({
    container1: { backgroundColor: '#f8f8f8' },
    container: { backgroundColor: '#fff' },
    text: { color: '#000' },
    card: { backgroundColor: '#f9f9f9' },
    text1: { color: '#1C3D72' },
  });
  
  const darkStyles = StyleSheet.create({
    container1: { backgroundColor: '#1A1A19' },
    container: { backgroundColor: '#000000' },
    text: { color: '#fff' },
    card: { backgroundColor: '#1e1e1e' },
    text1: { color: '#3498DB' },
  });

export default CustomNavbar;
