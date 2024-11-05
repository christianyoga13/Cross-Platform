import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Post = ({ post, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(post)}>
      <Text style={styles.title}>{post.name || post.title}</Text> 
      <Text>{post.email || post.body}</Text>  
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Post;
