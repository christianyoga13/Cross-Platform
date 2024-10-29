import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import CustomNavbar from './navbar';
import { useTheme } from './ThemeContext';
import styles from './styles/profile';

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation(); 
  const [language, setLanguage] = useState(i18n.language); 

  const changeLanguage = () => {
    const newLanguage = language === 'id' ? 'en' : 'id'; 
    i18n.changeLanguage(newLanguage); 
    setLanguage(newLanguage); 
  };

  const { isDarkMode, toggleTheme } = useTheme();
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <Text style={[styles.profileName, themeStyles.text]}>Christian Yoga</Text>
        <Text style={[styles.profileId, themeStyles.text]}>00000067471</Text>
        <Text style={[styles.profileDob, themeStyles.text]}>(13 April 2004)</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionItem} onPress={changeLanguage}>
          <Text style={[styles.optionLabel, themeStyles.text]}>{t('changeLanguage')}</Text> 
          <Text style={[styles.optionValue, themeStyles.text]}>
            {language === 'id' ? t('indonesian') : t('english')}
          </Text> 
        </TouchableOpacity>

        <View style={styles.optionItem}>
          <Text style={[styles.optionLabel, themeStyles.text]}>{t('darkMode')}</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isDarkMode ? '#ffffff' : '#000336'} 
            value={isDarkMode} 
            onValueChange={toggleTheme} /> 
        
        </View>
      </View>

      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, themeStyles.text]}>{t('version')} 1.2024.09.05</Text> 
      </View>

      <View style={styles.navbarContainer}>
        <CustomNavbar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const lightStyles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  text: { color: '#000' },
});

const darkStyles = StyleSheet.create({
  container: { backgroundColor: '#31363F' },
  text: { color: '#fff' },
});

export default Profile;
