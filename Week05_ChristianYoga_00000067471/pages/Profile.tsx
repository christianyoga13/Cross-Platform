import { Button, Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import styles from '../styles';

const Profile = ({ navigation, route }) => {
    const { userName, userPhoto, userEmail } = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Avatar.Image source={{ uri : userPhoto }} />
            <Text>{userName}'s Profile</Text>
            <Text>{userEmail}</Text>
            <Button
                title="Go Back"
                onPress={() => navigation.navigate('User')}
            />
        </View>
    );
};

export default Profile;