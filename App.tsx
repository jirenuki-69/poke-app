import React, { useState } from 'react';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import { StatusBar as ExpoStatusBar, StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Pressable,
  TouchableOpacity
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { TextInput, ActivityIndicator } from '@react-native-material/core';
import { getPokemonInfo, requestAPI } from './utils/request';
import PokemonImage from './components/PokemonImage';
import PokedexMainSpeaker from './components/PokedexMainSpeaker';
import PokedexLights from './components/PokedexLights';
import DescriptionModal from './components/DescriptionModal';

export default function App() {
  const [value, setValue] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const dimensions = useWindowDimensions();
  const translation = useSharedValue(0);
  const overlayOpacity = useSharedValue(1);

  const sayPokemonName = (pokemon: any) => {
    if (pokemon) {
      const types = pokemon.typeInfo.names.split(', ').join(' y ');
      Speech.speak(
        `${pokemon?.name}: Es un pokémon de tipo: ${types}. Descripción: ${pokemon?.description}`,
        {
          language: 'es',
          pitch: 0.4,
          rate: 1.3
        }
      );
    }
  };

  const sayError = () => {
    Speech.speak(`Error: pokémon no encontrado`, {
      language: 'es',
      pitch: 0.4,
      rate: 1.3
    });
  };

  const coverStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translation.value }]
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value
    };
  });

  const toggleCover = () => {
    if (translation.value === 0) {
      translation.value = withTiming(dimensions.width, { duration: 500 }, () => {
        overlayOpacity.value = withTiming(0, {
          duration: 250
        });
      });
    } else {
      translation.value = withTiming(0, { duration: 500 }, () => {
        overlayOpacity.value = 1;
      });

      Speech.stop();
    }
  };

  const onSubmit = async () => {
    setPokemon(null);
    setLoading(true);

    try {
      const { data }: { data: Pokemon } = await requestAPI.get(`pokemon/${value}`);

      const info: any = await getPokemonInfo(data.id);

      setLoading(false);
      setPokemon(info);
      runOnJS(sayPokemonName)(info);
    } catch (error) {
      setLoading(false);
      runOnJS(sayError)();
    }
  };

  return (
    <>
      {pokemon ? (
        <DescriptionModal pokemon={pokemon} setModalVisible={setOpen} modalVisible={open} />
      ) : (
        <></>
      )}
      <ExpoStatusBar style="auto" />

      <Pressable onPress={toggleCover} style={styles.pokedexTouchable}>
        <Animated.View pointerEvents="none" style={[styles.cover, coverStyle]}>
          <View style={styles.coverHandle} />
          <View style={styles.coverBinding} />
        </Animated.View>
        <View style={styles.pokedex}>
          <View style={styles.lights}>
            <PokedexMainSpeaker />
            <PokedexLights />
          </View>

          <View style={styles.details}>
            <View style={styles.screen}>
              <View style={styles.screenHeader}>
                <View style={styles.screenHeaderHole} />

                <View style={styles.screenHeaderHole} />
              </View>

              <View style={styles.screenPokemon}>
                <Animated.View style={[styles.screenPokemonOverlay, overlayStyle]} />
                <View style={styles.screenPokemonImage}>
                  {pokemon ? (
                    <PokemonImage uri={pokemon.image} />
                  ) : loading ? (
                    <ActivityIndicator size="large" style={{ alignSelf: 'center' }} color="red" />
                  ) : (
                    <></>
                  )}
                </View>
              </View>

              <View style={styles.screenSoundHoles}>
                <View style={[styles.screenSoundHole, styles.screenSoundHoleLarge]} />

                <View style={[styles.screenSoundHole, styles.screenSoundHoleSmall]} />

                <View style={[styles.screenSoundHole, styles.screenSoundHoleMedium]} />

                <View style={[styles.screenSoundHole, styles.screenSoundHoleLarge]} />
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <TextInput
                autoCapitalize="none"
                label="Nombre del Pokemon"
                variant="standard"
                style={styles.input}
                color="white"
                inputStyle={{ color: 'white' }}
                value={value}
                onChangeText={setValue}
                onSubmitEditing={onSubmit}
              />
            </View>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View style={styles.greenButton}>
                <Text style={styles.text}>Detalles</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  cover: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    top: 150,
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    shadowOpacity: 0.4
  },
  coverHandle: {
    height: 40,
    width: 40,
    backgroundColor: 'rgb(255, 165, 0)',
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    transform: [{ rotate: '45deg' }, { translateX: -30 }]
  },
  coverBinding: {
    height: '100%',
    width: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(15, 15, 15)'
  },
  pokedexTouchable: {
    flex: 1
  },
  pokedex: {
    flex: 1,
    backgroundColor: 'red'
  },
  lights: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(15, 15, 15)',
    backgroundColor: 'red',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowRadius: 10,
    shadowOpacity: 0.4,
    paddingTop: Constants.statusBarHeight + 10,
    paddingLeft: 10,
    paddingBottom: 24
  },
  mainLight: {
    marginLeft: 20,
    height: 80,
    width: 80,
    backgroundColor: 'rgb(75, 154, 244)',
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainLightInner: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(20, 90, 170)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    shadowOpacity: 0.9
  },
  redLight: {
    marginLeft: 15,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(255, 0, 0)',
    borderWidth: 2,
    borderColor: 'rgb(200, 0, 0)'
  },
  orangeLight: {
    marginLeft: 10,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(255, 165, 0)',
    borderWidth: 2,
    borderColor: 'rgb(200, 165, 0)'
  },
  greenLight: {
    marginLeft: 10,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(0, 150, 0)',
    borderWidth: 2,
    borderColor: 'rgb(0, 100, 0)'
  },
  details: {
    height: '100%',
    borderWidth: 10,
    borderColor: 'rgba(0, 0, 0, 0.15)'
  },
  screen: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35
  },
  screenHeaderHole: {
    backgroundColor: 'rgb(200, 0, 0)',
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    marginHorizontal: 10
  },
  screenPokemon: {
    marginHorizontal: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    padding: 15,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  screenPokemonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 1
  },
  screenPokemonImage: {
    height: 150,
    width: 150
  },
  screenSoundHoles: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 35,
    marginRight: 30
  },
  screenSoundHole: {
    height: 2,
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 2
  },
  screenSoundHoleLarge: {
    width: 40
  },
  screenSoundHoleMedium: {
    width: 38
  },
  screenSoundHoleSmall: {
    width: 35
  },
  greenButton: {
    marginLeft: 20,
    backgroundColor: '#8FD46D',
    height: 80,
    width: '60%',
    borderWidth: 5,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonsContainer: {
    padding: 25
  },
  input: {
    width: '100%',
    marginVertical: 20
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  }
});
