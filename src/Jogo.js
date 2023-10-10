import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Jogo(props) {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [X, setX] = useState(true);
  const [vencedor, setVencedor] = useState(null);

  const { player1, player2 } = props;

  useEffect(() => {
    if (vencedor) {
      alert(`Vencedor: ${vencedor} Parabéns, ${vencedor === 'X' ? player1 : player2}`);
    }
  }, [vencedor, player1, player2]);

  const click = (index) => {
    if (vencedor || tabuleiro[index]) {
      return;
    }

    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[index] = X ? 'X' : 'O';
    setTabuleiro(novoTabuleiro);
    setX(!X);
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

  const restart = () => {
    setTabuleiro(Array(9).fill(null));
    setX(true);
    setVencedor(null);
  };

  const renderQuadrado = (index) => {
    return (
      <TouchableOpacity
        style={[
          styles.quadrado,
          { backgroundColor: tabuleiro[index] ? 'gray' : 'white' },
        ]}
        onPress={() => click(index)}
        disabled={tabuleiro[index] || vencedor}
      >
        <Text style={styles.quadradoText}>{tabuleiro[index]}</Text>
      </TouchableOpacity>
    );
  };

  const renderStatus = () => {
    if (vencedor) {
      return `Vencedor: ${vencedor}`;
    } else {
      return `Vez do jogador: ${X ? player1 : player2}`;
    }
  };

  return (
    <View style={styles.containerJogo}>
      <Text style={styles.status}>{renderStatus()}</Text>
      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          {renderQuadrado(0)}
          {renderQuadrado(1)}
          {renderQuadrado(2)}
        </View>
        <View style={styles.linha}>
          {renderQuadrado(3)}
          {renderQuadrado(4)}
          {renderQuadrado(5)}
        </View>
        <View style={styles.linha}>
          {renderQuadrado(6)}
          {renderQuadrado(7)}
          {renderQuadrado(8)}
        </View>
      </View>
      <TouchableOpacity title="Reiniciar" style={styles.botao} onPress={restart}>
        <Text style={styles.botaoText}>Reiniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity title="Voltar" style={styles.botao} onPress={() => props.changeScreen("home")}>
        <Text style={styles.botaoText}>Voltar</Text>
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
  quadradoText: {
    fontSize: 36,
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: 'grey',
    color: 'white',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  botaoText: {
    color: 'black',
    fontSize: 18,
  },
});
