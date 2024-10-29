import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/home';
import SplashScreen from './pages/splash';
import React, { useEffect, useState } from 'react';
import TopUp from './pages/pulsapaket';
import Confirm from './pages/confirm';
import Pin from './pages/pin';
import Success from './pages/success';
import Payment from './pages/payment';
import History from './pages/riwayat';
import Profile from './pages/profile';
import Notification from './pages/notification';
import "./i18n ";
import { AppProvider } from './pages/AppContext';
import { ThemeProvider } from './pages/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
        <SplashScreen />
      </Animated.View>
    );
  }
  return (
    <ThemeProvider>
      <AppProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="TopUp" component={TopUp} options={{animation: 'slide_from_right'}}/>
              <Stack.Screen name="Confirm" component={Confirm} options={{animation: 'slide_from_right'}}/>
              <Stack.Screen name="Pin" component={Pin} options={{animation: 'fade'}}/>
              <Stack.Screen name="Success" component={Success} options={{animation: 'fade'}}/>
              <Stack.Screen name="Payment" component={Payment} options={{animation: 'fade'}}/>
              <Stack.Screen name="History" component={History} options={{animation: 'fade'}}/>
              <Stack.Screen name="Profile" component={Profile} options={{animation: 'fade'}}/>
              <Stack.Screen name="Notification" component={Notification} options={{animation: 'fade'}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
