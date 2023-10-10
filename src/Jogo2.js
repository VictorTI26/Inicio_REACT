import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Jogo2(props) {
  const [palavraOculta, setPalavraOculta] = useState('REACTNATIVE');
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [erros, setErros] = useState(0);
  const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const onPressLetra = (letra) => {
    if (!desabilitarBotoes && !letrasAdivinhadas.includes(letra)) {
      const novasLetrasAdivinhadas = [...letrasAdivinhadas, letra];
      let novosErros = erros;

      if (!palavraOculta.includes(letra)) {
        novosErros++;
      }

      setLetrasAdivinhadas(novasLetrasAdivinhadas);
      setErros(novosErros);

      if (novosErros >= 6) {
        setDesabilitarBotoes(true);
        Alert.alert('Você perdeu!');
      }
    }
  };

  const resetGame = () => {
    setPalavraOculta('REACTNATIVE');
    setLetrasAdivinhadas([]);
    setErros(0);
    setDesabilitarBotoes(false);
  };

  const palavraExibida = palavraOculta
    .split('')
    .map((letra) => (letrasAdivinhadas.includes(letra) ? letra : '_'))
    .join(' ');

  return (
    <View style={styles.container}>
      <Text style={styles.textoGrande}>{palavraExibida}</Text>
      <Text style={styles.textoPequeno}>Erros: {erros} / 6</Text>
      <View style={styles.teclado}>
      {letras.split('').map((letra) => (
          <Button
            key={letra}
            title={letra}
            onPress={() => onPressLetra(letra)}
            disabled={desabilitarBotoes}
          />
        ))}
      </View>
      {erros >= 6 && (
        <TouchableOpacity style={styles.botao} onPress={resetGame}>
          <Text style={styles.botaoTexto}>Reiniciar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.botao} onPress={() => props.changeScreen("home")}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoGrande: {
    fontSize: 24,
  },
  textoPequeno: {
    fontSize: 20,
  },
  teclado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  botao: {
    backgroundColor: 'gray',
    color: 'white',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  botaoTexto: {
    color: 'black',
    fontSize: 18,
  },
});
