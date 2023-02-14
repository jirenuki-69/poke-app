import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, StatusBar, ScrollView, ToastAndroid, Text } from 'react-native';
import { TextInput, ActivityIndicator } from '@react-native-material/core';
import { getPokemonInfo, requestAPI } from './utils/request';
import PokemonImage from './components/PokemonImage';
import PokemonTitleSubtitle from './components/PokemonTitleSubtitle';
import axios from 'axios';

export default function App() {
  const [value, setValue] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [loading, setLoading] = useState(false);
  const [pokeNotFound, setNotFound] = useState('');

  const onSubmit = async () => {
    setPokemon(null);
    setLoading(true);

    try {
      const { data }: { data: Pokemon } = await requestAPI.get(`pokemon/${value}`);

      const { description } = await getPokemonInfo(data.id);

      getTypesMatchUps(data.types);

      setLoading(false);
      setPokemon({ ...data, description });
    } catch (error) {
      setLoading(false);
      setNotFound('Pokemon no encontrado');
    }

    // setTimeout(async () => {
    //   const { data }: any = await requestAPI.get(`pokemon/${value}`);

    //   setLoading(false);
    //   setPokemon(data);
    // }, 2000);
  };

  const getTypesMatchUps = async (types: TypeInfo[]) => {
    const urls = types.map(({ type: { url } }) => url);
    const response: any = await Promise.all(urls.map(async (url) => await axios.get(url)));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text>{pokeNotFound}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: '5%',
    paddingTop: '5%'
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
