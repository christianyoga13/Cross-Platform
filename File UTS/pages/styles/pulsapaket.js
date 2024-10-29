import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#f8f8f8',
      padding: 20,
      paddingTop: 70, 
    },
    backButton: {
      position: 'absolute',
      top: 75,
      left: 10,
      zIndex: 1,
      padding: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      marginTop: 10,
    },
    inputContainer: {
      marginBottom: 20,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
    },
    tabButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: '#1C3D72',
      borderRadius: 8,
    },
    tabText: {
      color: '#000',
      fontWeight: 'bold',
    },
    activeTabText: {
      color: '#fff',
    },
    infoContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    infoBox: {
      width: '48%',
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 15,
      alignItems: 'center',
      elevation: 2, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.1, 
      shadowRadius: 4, 
    },
    selectedInfoBox: {
      borderColor: '#1C3D72',
      borderWidth: 2,
    },
    infoText: {
      fontSize: 16,
      color: '#333',
    },
    infoPrice: {
      fontSize: 14,
      color: '#000',
      fontWeight: 'bold',
      marginTop: 5,
    },
    submitButton: {
      backgroundColor: '#1C3D72',
      borderRadius: 5,
      marginTop: 20,
      paddingVertical: 15,
    },
});

export default styles;