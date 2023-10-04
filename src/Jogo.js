import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Jogo(props) {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [X, setX] = useState(true);
  const [vencedor, setVencedor] = useState(null);

  const { player1, player2 } = props;

  useEffect(() => {
    if (vencedor) {
      Alert.alert(`Vencedor: ${vencedor}`, `Parabéns, ${vencedor === 'X' ? player1 : player2}`);
    }
  }, [vencedor, player1, player2]);

  const handleClick = (index) => {
    if (vencedor || tabuleiro[index]) {
      return;
    }

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = X ? 'X' : 'O';
    setTabuleiro(novoTabuleiro);
    setX(!X);
    verifVencedor(novoTabuleiro);
  };

  const verifVencedor = (tabuleiro) => {
    const combVence = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinacao of combVence) {
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
    setX(true);
    setVencedor(null);
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        style={[styles.quadrado, { backgroundColor: tabuleiro[index] ? 'gray' : 'white' }]}
        onPress={() => handleClick(index)}
        disabled={tabuleiro[index] || vencedor}
      >
        <Text style={{ fontSize: 36 }}>{tabuleiro[index]}</Text>
      </TouchableOpacity>
    );
  };

  const renderStatus = () => {
    if (vencedor) {
      return `Vencedor: ${vencedor}`;
    } else {
      return `Vez do jogador: ${X ? 'X' : 'O'}`;
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
    padding: 10,
  },
  quadrado: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  botao: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 50,
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
});
