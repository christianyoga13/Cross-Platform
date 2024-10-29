import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    header: {
      paddingVertical: 20,
      paddingHorizontal: 0,  // Pastikan padding horizontal diatur ke 0
      backgroundColor: '#1C3D72',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',  
    },
    title: {
      fontSize: 24,
      paddingVertical: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    paymentInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f2f2f2',
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      marginTop: 20,
    },
    icon: {
      marginRight: 15,
    },
    paymentDetails: {
      flex: 1,
    },
    operatorType: {
      fontSize: 16,
      color: '#1C3D72',
      fontWeight: 'bold',
    },
    operator: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    phoneNumber: {
      fontSize: 14,
      color: '#666',
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    paymentMethod: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      elevation: 2,
    },
    paymentMethodDetails: {
      flex: 1,
      marginLeft: 10,
    },
    walletText: {
      fontSize: 16,
      color: '#333',
    },
    walletBalance: {
      fontSize: 14,
      color: '#666',
    },
    methodPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    detailLabel: {
      fontSize: 14,
      color: '#666',
    },
    detailValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    totalValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    confirmButton: {
      backgroundColor: '#1C3D72',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 'auto',
    },
    confirmButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});
 
export default styles;