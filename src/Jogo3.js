import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function Jogo3(props) {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [index1, index2] = flippedIndices;
      if (cards[index1] === cards[index2]) {
        setMatchedPairs([...matchedPairs, cards[index1]]);
      }
      setTimeout(() => setFlippedIndices([]),500);
    }
  }, [flippedIndices, cards, matchedPairs]);

  function generateCards() {
    const numbers = [1, 2, 3, 4,];
    const allCards = numbers.concat(numbers);
    return shuffleArray(allCards);
  }

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const handleCardPress = (index) => {
    if (flippedIndices.includes(index) || flippedIndices.length === 2) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
  };

  const handleRestart = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMatchedPairs([]);
  };

  const renderCard = (value, index) => (
    <TouchableOpacity
      style={[
        styles.card,
      ]}
      onPress={() => handleCardPress(index)}
      key={index}
    >
      <Text style={styles.cardText}>{flippedIndices.includes(index) || matchedPairs.includes(value) ? value : ''}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {cards.map((value, index) => renderCard(value, index))}
      </View>
      <View>
      <TouchableOpacity style={styles.botao} onPress={handleRestart}>
        <Text style = {{backgroundColor: 'blue'}}>Reiniciar</Text>
      </TouchableOpacity>
      <Button title="Voltar" onPress={() => props.changeScreen("home")} />
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
  voltar: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
  },
});
