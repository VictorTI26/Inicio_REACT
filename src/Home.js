import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function Home({ mudarNomeJogadores, changeScreen }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleClick = (screen) => {
    if (mudarNomeJogadores) {
      mudarNomeJogadores(player1, player2);
      changeScreen(screen);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Nome player 1' value={player1} onChangeText={setPlayer1} />
      <Text style={styles.TextNome}>O nome do jogador 1 é : {player1}</Text>
      <TextInput placeholder='Nome player 2' value={player2} onChangeText={setPlayer2} />
      <Text style={styles.TextNome}>O nome do jogador 2 é : {player2}</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleClick('jogo')}>
        <Text style={styles.buttonText}>Jogo da velha</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleClick('jogo2')}>
        <Text style={styles.buttonText}>Jogo da forca</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => handleClick('jogo3')}>
        <Text style={styles.buttonText}>Jogo da memoria</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textNome:{
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});
