import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#808080',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    icon: {
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
    },
    amountText: {
      fontSize: 16,
      color: 'white',
      marginBottom: 10,
    },
    amount: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
    },
    date: {
      fontSize: 14,
      color: 'white',
      marginBottom: 30,
    },
    balanceText: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
      marginBottom: 40,
    },
    closeButton: {
      backgroundColor: '#D0D0D0',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginBottom: 10,
    },
    closeButtonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default styles;