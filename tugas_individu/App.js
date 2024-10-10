import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import SplashScreen from './pages/splash.tsx';
import Home from './pages/Home.tsx';
import Search from './pages/search.tsx'; 
import SearchNext from './pages/searchnext.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navbar } from './components/navbar.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="search" 
            component={Search} 
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="searchnext"
            component={SearchNext}
            options={{ headerShown: false }}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
