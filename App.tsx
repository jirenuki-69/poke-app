import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, StatusBar, ScrollView, ToastAndroid } from 'react-native';
import { TextInput, ActivityIndicator } from '@react-native-material/core';
import { requestAPI } from './utils/request';
import PokemonImage from './components/PokemonImage';
import PokemonTitleSubtitle from './components/PokemonTitleSubtitle';

export default function App() {
  const [value, setValue] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setPokemon(null);
    setLoading(true);

    try {
      const { data }: any = await requestAPI.get(`pokemon/${value}`);

      setLoading(false);
      setPokemon(data);
    } catch (error) {
      ToastAndroid.show('Error', ToastAndroid.SHORT);
    }

    // setTimeout(async () => {
    //   const { data }: any = await requestAPI.get(`pokemon/${value}`);

    //   setLoading(false);
    //   setPokemon(data);
    // }, 2000);
  };

  // const getPokemonDescription = async (id: number) => {
  //   const { data: flavor_text_entries } = await requestAPI.get(`pokemon-species/${id}`);

  //   return flavor_text_entries[0].flavor_text;
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExpoStatusBar style="auto" />
      <TextInput
        autoCapitalize="none"
        label="Pokemon Name"
        variant="standard"
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={onSubmit}
      />
      {pokemon ? (
        <View>
          <PokemonImage uri={pokemon.sprites.front_default} name={pokemon.name} />
          <PokemonTitleSubtitle
            title="Types"
            subtitle={pokemon.types.map(({ type: { name } }) => name).join(', ')}
          />
          <PokemonTitleSubtitle title="Description" subtitle={pokemon.description} />
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        ''
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
