import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ name, setName }) => {
    const handleChangeMyName = (value) => {
      setName(value);
    };
  
    console.log(name);
    return (
      <View>
        <Text>Name</Text>
        <TextInput
          placeholder="Input your name"
          value={name}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
          }}
          onChangeText={handleChangeMyName}
        />
      </View>
    );
  };

const NumberInput = ({ nim, setNim }) => {
    const handleChangeMyNim = (value) => {
        setNim(value);
    };

    console.log(nim);

    return (
        <View>
            <Text>NIM</Text>
            <TextInput
                placeholder="Input your NIM"
                value={nim}
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 8,
                }}
                onChangeText={handleChangeMyNim}
                keyboardType="numeric"
            />
        </View>
    );
};

export { Input, NumberInput };
