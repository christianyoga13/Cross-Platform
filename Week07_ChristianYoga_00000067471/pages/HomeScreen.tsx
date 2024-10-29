import React from 'react';
import styles from '../styles';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Navigation List</Text>
            <Button
                title="Email"
                onPress={() => navigation.navigate('Email')}
            />
            <Button
                title="UserList"
                onPress={() => navigation.navigate('User')}
            />
        </View>
    );
};

export default HomeScreen;