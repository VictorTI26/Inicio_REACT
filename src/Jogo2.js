import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


class Jogo2 extends Component {
  state = {
    palavraOculta: 'REACTNATIVE',
    letrasAdivinhadas: [],
    erros: 0,
  };

  letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  onPressLetra = (letra) => {
    const { letrasAdivinhadas, erros, palavraOculta } = this.state;

    if (!letrasAdivinhadas.includes(letra)) {
      const novasLetrasAdivinhadas = [...letrasAdivinhadas, letra];
      let novosErros = erros;

      if (!palavraOculta.includes(letra)) {
        novosErros++;
      }

      this.setState({
        letrasAdivinhadas: novasLetrasAdivinhadas,
        erros: novosErros,
      });
    }
  };

  render() {
    const { palavraOculta, letrasAdivinhadas, erros } = this.state;
    const palavraExibida = palavraOculta
      .split('')
      .map((letra, index) =>
        letrasAdivinhadas.includes(letra) ? letra : '_'
      )
      .join(' ');

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>{palavraExibida}</Text>
        <Text style={{ fontSize: 20 }}>Erros: {erros}</Text>
        <View style={styles.teclado}>
          {this.letras.split('').map((letra) => (
            <Button
              key={letra}
              title={letra}
              onPress={() => this.onPressLetra(letra)}
            />
          ))}
        </View>
      </View>
    );
  }
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
});

export default Jogo2;
