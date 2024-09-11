import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

interface IForm {
    name: string;
    setName: (name: string) => void;
}

const Form = ({
    name,
    setName,
}: IForm) => {
    return (
        <View>
            <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        textAlign: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
        marginTop: 20,
    },
});

export default Form;
