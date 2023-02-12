import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const PokemonImage = ({ uri, name }: { uri: string, name: string }) => (
  <View style={styles.container}>
    <Image
      source={{ uri }}
      style={styles.pokemonImage}
      resizeMode="contain"
    />
    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{name.toUpperCase()}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30
  },
  input: {
    width: '100%',
    marginTop: 20
  },
  pokemonContainer: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pokemonImage: {
    width: 300,
    height: 300
  }
});

export default PokemonImage;
