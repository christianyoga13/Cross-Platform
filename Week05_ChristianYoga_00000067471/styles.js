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
  }
});

export default styles;
