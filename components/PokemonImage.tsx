import React from 'react';
import { Image, StyleSheet } from 'react-native';

const PokemonImage = ({ uri }: { uri: string }) => (
  <Image source={{ uri }} style={styles.pokemonImage} resizeMode="contain" />
);

const styles = StyleSheet.create({
  pokemonImage: {
    width: '100%',
    height: '100%'
  }
});

export default PokemonImage;
