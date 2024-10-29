import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    profileContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
    profileImage: {
      width: 100, 
      height: 100, 
      borderRadius: 50, 
      borderWidth: 1, 
      borderColor: '#ddd', 
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 8,
    },
    profileId: {
      fontSize: 14,
      color: '#888',
    },
    profileDob: {
      fontSize: 12,
      color: '#888',
    },
    optionsContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    optionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    optionLabel: {
      fontSize: 16,
      color: '#000',
    },
    optionValue: {
      fontSize: 16,
      color: '#000',
    },
    versionContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    versionText: {
      fontSize: 12,
      color: '#888',
    },
    navbarContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: Platform.OS === 'ios' ? 80 : 60,
      backgroundColor: '#fff',
    },
});

export default styles;