import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet,View} from 'react-native';
import Home from './src/Home'
import Jogo from './src/Jogo'
import Jogo2 from './src/Jogo2'
import Jogo3 from './src/Jogo3'

export default function App() { //exportando uma função padrão
  const [player1, setPlayer1 ] = useState("");
  const [player2, setPlayer2 ] = useState("");
  const [screen, setScreen ] = useState("home");

const checkScreen = (screenName) => screenName === screen;

const setJogadores = (nome1, nome2) => {
  setPlayer1 (nome1);
  setPlayer2 (nome2);
}

const changeScreen = (newScreen) => setScreen(newScreen);

  return (//metódo para retornar código JSX
    <View style={styles.container}>
      <StatusBar style="auto" />
      {checkScreen("home") &&  (
      <Home 
          mudarNomeJogadores={setJogadores} 
          changeScreen={changeScreen} 
          />
        )}
      {checkScreen("jogo") &&  (<Jogo changeScreen={changeScreen} player1={player1} player2={player2} />)}
      {checkScreen("jogo2") &&  (<Jogo2 changeScreen={changeScreen} player1={player1} player2={player2}/>)}
      {checkScreen("jogo3") &&  (<Jogo3 changeScreen={changeScreen} player1={player1} player2={player2}/>)}
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