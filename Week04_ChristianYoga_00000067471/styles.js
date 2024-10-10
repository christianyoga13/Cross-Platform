import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:  5,
    display: "flex",
  },
  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    width: 325,
    gap: 8,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 999,
  },
  boldText: {
    fontWeight: "bold",
  },
  description: {
    width: "fit-content",
    display: "flex",
    gap: 2,
  },
  userList: {
    display: "flex",
    gap: 8,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
  },
  coverImage: {
    height: 200,
  },
  cardContent: {
    paddingVertical: 10,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, 
  },
  avatar: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
    maxWidth: '80%', 
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap',  
    maxWidth: '100%',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  bio: {
    marginVertical: 10,
    color: '#777',
  },
  divider: {
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
  },
});

export default styles;
