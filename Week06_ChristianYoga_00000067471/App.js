import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, NumberInput } from './Input';
import { Card, Text } from 'react-native-paper';

export default function App() {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Student Info" />
        <Card.Content>
          <Text style={styles.text}>Name and NIM</Text>
          {name && nim ? (
            <Text style={styles.displayText}>{name} - {nim}</Text>
          ) : null}
          <Input name={name} setName={setName} />
          <NumberInput nim={nim} setNim={setNim} />
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  displayText: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: '#777',
  },
  button: {
    marginTop: 20,
    padding: 8,
    backgroundColor: '#4a90e2',
    borderRadius: 8,
  },
});
