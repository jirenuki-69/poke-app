import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, StatusBar, ScrollView, ToastAndroid, Text } from 'react-native';
import { TextInput, ActivityIndicator } from '@react-native-material/core';
import { getPokemonInfo, requestAPI } from './utils/request';
import PokemonImage from './components/PokemonImage';
import PokemonTitleSubtitle from './components/PokemonTitleSubtitle';
import axios from 'axios';
import { string } from 'prop-types';

export default function App() {
  const [value, setValue] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | any | null>();
  const [loading, setLoading] = useState(false);
  const [pokeNotFound, setNotFound] = useState('');

  const onSubmit = async () => {
    setPokemon(null);
    setLoading(true);

    try {
      const { data }: { data: Pokemon } = await requestAPI.get(`pokemon/${value}`);
      const pokemonInfo = await getPokemonInfo(data.id);

      if (isEmpty(pokemonInfo)) {
        setLoading(false);
        setNotFound('Pokemon no encontrado');
      } else {
        setLoading(false);
        setPokemon(pokemonInfo);
      }
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExpoStatusBar style="auto" />
        <TextInput
          autoCapitalize="none"
          label="Nombre del Pokemon"
          variant="standard"
          style={styles.input}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={onSubmit}
        />
        {pokemon ? (
          <View>
            <PokemonImage uri={pokemon.image} name={pokemon.name} />
            <PokemonTitleSubtitle
              title="Tipos"
              subtitle={pokemon.typeInfo.map(({ name } : { name: String }) => name).join(', ')}
            />
            <PokemonTitleSubtitle title="Descripcion" subtitle={pokemon.description} flag/>
            {pokemon.typeInfo.map((type : TypeInfo, ix : React.Key) => {
              return <>
                <View>
                  <PokemonTitleSubtitle
                    title="Tipo"
                    subtitle={type.name} />
                  <PokemonTitleSubtitle
                    title="Tipos a los que NO le hace daño"
                    subtitle={type.no_damage_to || 'No aplica'} />
                    <PokemonTitleSubtitle
                    title="Tipos a los que hace la mitad de daño"
                    subtitle={type.half_damage_to || 'No aplica'} />
                    <PokemonTitleSubtitle
                    title="Tipos a los que les hace el doble de daño,"
                    subtitle={type.double_damage_to || 'No aplica'} />
                    <PokemonTitleSubtitle
                    title="Tipos a los que recibe el doble de daño"
                    subtitle={type.double_damage_from || 'No aplica'}
                    flag />
                </View>
              </>
            })}
            <PokemonTitleSubtitle
              title="Ataques"
              subtitle={pokemon.movesInfo.join(` / `)}
            />
            <PokemonTitleSubtitle
              title="Cadena evolutivas"
              subtitle={pokemon.evolutionTree.map((value : any) => `${value.name}(${value.types})`).join(' --> ')}
            />
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
