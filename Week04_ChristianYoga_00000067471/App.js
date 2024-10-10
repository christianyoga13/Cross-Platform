import { ScrollView, View, StyleSheet } from 'react-native';
import userData from './data.json';
import styles from './styles';
import { Avatar, Card, Title, Paragraph, Button, Divider } from 'react-native-paper';

export default function App() {
  return (
    <ScrollView style={{ padding: 10 }}>
      {userData.map((user) => (
        <Card key={user.name} style={styles.card} mode="elevated">
          <Card.Cover source={{ uri: user.photo_url }} style={styles.coverImage} />
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarSection}>
              <Avatar.Image size={48} source={{ uri: user.photo_url }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Title style={styles.name}>{user.name}</Title>
                <Paragraph style={styles.email}>{user.email}</Paragraph>
              </View>
            </View>
            <Divider style={styles.divider} />
            <Paragraph style={styles.bio}>{user.bio}</Paragraph>
            <Button mode="contained" style={styles.button}>
              Follow
            </Button>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
