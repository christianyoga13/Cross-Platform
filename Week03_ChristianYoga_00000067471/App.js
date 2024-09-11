import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from "react";
import Counter from "./component/Counter.tsx";
import Form from "./component/Form.tsx";

export default function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [final, setFinal] = useState(0)
  
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleSubmit = () => {
    setSubmitted(name);
    setFinal(count);
    setName('');
  }

  return (
    <View style={styles.container}>
      {submitted ? (
      <Text>Halo nama ku, {submitted}!<br />Umur ku {final} tahun</Text>
      ) : null}
      <Counter 
        value={count} 
        handleDecrement={handleDecrement} 
        handleIncrement={handleIncrement}
        handleSubmit = {handleSubmit}
      />
      <Form
        name = {name}
        setName = {setName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
