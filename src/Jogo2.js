import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Jogo2(props) {
  const [palavraOculta, setPalavraOculta] = useState('REACTNATIVE');
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [erros, setErros] = useState(0);

  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const onPressLetra = (letra) => {
    if (!letrasAdivinhadas.includes(letra)) {
      const novasLetrasAdivinhadas = [...letrasAdivinhadas, letra];
      let novosErros = erros;

      if (!palavraOculta.includes(letra)) {
        novosErros++;
      }

      setLetrasAdivinhadas(novasLetrasAdivinhadas);
      setErros(novosErros);
    }
  };

  const palavraExibida = palavraOculta
    .split('')
    .map((letra) => (letrasAdivinhadas.includes(letra) ? letra : '_'))
    .join(' ');

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{palavraExibida}</Text>
      <Text style={{ fontSize: 20 }}>Erros: {erros}</Text>
      <View style={styles.teclado}>
        {letras.split('').map((letra) => (
          <Button key={letra} title={letra} onPress={() => onPressLetra(letra)} />
        ))}
      </View>
      <TouchableOpacity style={styles.botao} onPress={handleRestart}>
        <Text style={{ color: 'white', fontSize: 18 }}>Reiniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => props.changeScreen("home")}>
        <Text style={{ color: 'white', fontSize: 18 }}>Voltar</Text>
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
  teclado: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  botao: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
});
