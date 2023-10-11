import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function Jogo3(props) {
  const [cards, setCards] = useState(gerarCards());
  const [virarCard, setVirarCard] = useState([]);
  const [pares, setPares] = useState([]);


  function gerarCards() {
    const numeros = [...Array(25).keys()].slice(1); 
    const cartas = [...numeros, ...numeros];
    const cartasEmbaralhadas = embaralhar(cartas);
    return cartasEmbaralhadas;
  }

  function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
  }  

  const pressCard = (index) => {
    if (virarCard.includes(index) || virarCard.length === 2) {
      return;
    }

    const newFlippedIndices = [...virarCard, index];
    setVirarCard(newFlippedIndices);
  };

  const handleRestart = () => {
    setCards(gerarCards());
    setVirarCard([]);
    setPares([]);
  };

  useEffect(() => {
    if (virarCard.length === 2) {
      const [index1, index2] = virarCard;
      if (cards[index1] === cards[index2]) {
        setPares([...pares, cards[index1]]);
      }
      setTimeout(() => setVirarCard([]), 500);
    }
  }, [virarCard, cards, pares]);

  const renderCard = (value, index) => (
    <TouchableOpacity
      style={[styles.card,{backgroundColor:virarCard.includes(index) || pares.includes(value)? 'gray': 'white', },]}
      onPress={() => pressCard(index)}
      key={index}
    >
      <Text style={styles.cardText}>
        {virarCard.includes(index) || pares.includes(value) ? value : ''}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {cards.map((value, index) => renderCard(value, index))}
      </View>

      <View style={styles.botoesContainer}>

        <TouchableOpacity style={styles.botao} onPress={handleRestart}>
          <Text style={styles.botaoTexto}>Reiniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => props.changeScreen("home")}>
          <Text style={styles.botaoTexto}>Voltar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  botoesContainer: {
    marginTop: 20,
  },
  botao: {
    backgroundColor: 'gray',
    color: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 18,
  },
});
