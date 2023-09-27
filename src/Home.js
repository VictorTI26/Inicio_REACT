import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Home( { //exportando uma função padrão
    mudarNomeJogadores,
    changeScreen,
}){
  const [player1, setPlayer1 ] = useState("");
  const [player2, setPlayer2 ] = useState("");

  const handleClick = () =>{
    if (mudarNomeJogadores) {
        mudarNomeJogadores(player1, player2)
        changeScreen("jogo")
    }
  }

  return (//metódo para retornar código JSX
    <View style={styles.container}>
      <TextInput  placeholder='Nome player 1' value={player1} onChangeText={setPlayer1} />
      <Text>O nome do jogador 1 é : {player1}</Text>
      <TextInput  placeholder='Nome player 2' value={player2} onChangeText={setPlayer2} />
      <Text>O nome do jogador 2 é : {player2}</Text>

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
