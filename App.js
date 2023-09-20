import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() { //exportando uma função padrão
  const [player1, setPlayer1 ] = useState("");
  const [player2, setPlayer2 ] = useState("");


  const handleClick = (event) =>{
    alert("click")
  }

  return (//metódo para retornar código JSX
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Nome: {player1}</Text>
      <TextInput  placeholder='player 1' style={styles.input} onChangeText={setPlayer1} />

      <Text>Nome: {player2}</Text>
      <TextInput  placeholder='player 2' style={styles.input} onChangeText={setPlayer2} />

      <Button title="botão" onPress={handleClick}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { //criando uma classe e estilizando
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: "80%",
    height: 20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1
  },
});
