import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updatePost } from '../services/axios';

const Forms = ({ route, navigation }) => {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title || '');
  const [body, setBody] = useState(post.body || '');

  const handleSubmit = async () => {
    try {
      const response = await updatePost(post.id, { title, body });
      navigation.navigate('Home', { updatedPost: response.data });
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        clearButtonMode="while-editing" 
      />
      <Text style={styles.label}>Body</Text>
      <TextInput
        style={[styles.input, styles.bodyInput]}
        value={body}
        onChangeText={setBody}
        clearButtonMode="while-editing"
        multiline
        numberOfLines={10}
      />
      <View style={styles.buttonContainer}>
        <Button title="Update Post" onPress={handleSubmit} />
        <View style={styles.buttonSpacing} />
        <Button title="Go Back" onPress={handleGoBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  bodyInput: {
    height: 200, 
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 24, 
  },
  buttonSpacing: {
    height: 10,
  },
});

export default Forms;
