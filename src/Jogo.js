import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Jogo(props) {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [vezDoX, setVezDoX] = useState(true);
  const [vencedor, setVencedor] = useState(null);

  const handleClick = (index) => {
    if (vencedor || tabuleiro[index]) {
      return;
    }

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = vezDoX ? 'X' : 'O';
    setTabuleiro(novoTabuleiro);
    setVezDoX(!vezDoX);
    verificarVencedor(novoTabuleiro);
  };

  const verificarVencedor = (tabuleiro) => {
    const combinacoesVencedoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinacao of combinacoesVencedoras) {
      const [a, b, c] = combinacao;
      if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
        setVencedor(tabuleiro[a]);
        return;
      }
    }

    if (!tabuleiro.includes(null)) {
      setVencedor('Empate');
    }
  };

  const handleRestart = () => {
    setTabuleiro(Array(9).fill(null));
    setVezDoX(true);
    setVencedor(null);
  };

  const renderSquare = (index) => {
    return (
      <Button
        title={tabuleiro[index]}
        onPress={() => handleClick(index)}
        style={styles.quadrado}
        disabled={tabuleiro[index] || vencedor}
      />
    );
  };

  const renderStatus = () => {
    if (vencedor) {
      return `Vencedor: ${vencedor}`;
    } else {
      return `Vez do jogador: ${vezDoX ? 'X' : 'O'}`;
    }
  };

  return (
    <View style={styles.containerJogo}>
      <Text style={styles.status}>{renderStatus()}</Text>
      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.linha}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.linha}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Button title="Reiniciar" onPress={handleRestart} />
      <Button title="Voltar" onPress={() => props.changeScreen("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerJogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabuleiro: {
    flexDirection: 'column',
  },
  linha: {
    flexDirection: 'row',
  },
  quadrado: {
    width: 100,
    height: 100,
    fontSize: 36,
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
});