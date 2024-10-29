import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userBalance: {
    fontSize: 14,
    color: '#999999',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedItem: {
    backgroundColor: '#F7F7F7',
  },
  itemIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
  },
  bottomContainer: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  bottomItem: {
    alignItems: 'center',
  },
  bottomIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  bottomTitle: {
    fontSize: 12,
  },
  card: {
    margin: 8,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  selectedCard: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;