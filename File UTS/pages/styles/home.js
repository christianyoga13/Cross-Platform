import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  logo: {
    backgroundColor: 'transparent',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topTitle: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: '700',
      color: '#fff',
  },
  content: {
    flex: 1,
  },
  card: {
    margin: 16,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 3,
  },
  cardContent: {
    paddingBottom: 14,
  },
  backgroundCards: {
    backgroundColor: '#1C3D72',
    height: 210,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  year: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  actionItem: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  actionLabel: {
    fontSize: 10,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerVertical: {
    height: '100%',
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  bottom: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-around',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  card1: {
    margin: 16,
    borderRadius: 10,
  },
  cardContent1: {
    padding: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  iconLabel: {
    marginTop: 8,
    fontSize: 10,
    color: '#555',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 150,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  titleSub: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  lastTransaction: {
    marginTop: 10,
    marginBottom: 50, 
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: Platform.OS === 'ios' ? 80 : 60,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: '#000',
  },
  qrIcon: {
    width: 30,
    height: 30,
    marginBottom: 2,
  },
  moreButton: {
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1C3D72',
    borderRadius: 5,
    marginHorizontal: 16,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewMore: {
    color: '#1C3D72',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  navbarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 80 : 60,
    borderTopColor: '#ccc',
  },
});

export default styles;