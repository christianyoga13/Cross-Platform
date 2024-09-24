import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  description: {
    marginTop: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default styles;
