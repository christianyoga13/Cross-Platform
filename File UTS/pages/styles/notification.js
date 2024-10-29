import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 10,
    },
    list: {
      paddingBottom: 20,
      marginHorizontal: 20,
    },
    notificationCard: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    notificationMessage: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    notificationDate: {
      fontSize: 12,
      color: '#666',
    },
    noNotificationContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 80,
    },
    noNotificationText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
    },
    navbarWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: Platform.OS === 'ios' ? 80 : 60,
      backgroundColor: '#fff',
    },
});

export default styles;