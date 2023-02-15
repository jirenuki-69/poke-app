import React from 'react';
import { View, StyleSheet } from 'react-native';

const PokedexLights = () => {
  const Display = ({ backgroundColor }: { backgroundColor: string }) => (
    <View style={{ ...styles.main, backgroundColor }}>
      <View style={styles.secondary} />
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Display backgroundColor="#a00716" />
      <Display backgroundColor="#DAEA5E" />
      <Display backgroundColor="#8cd668" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  main: {
    width: 30,
    height: 30,
    borderRadius: 30,
    paddingBottom: 13,
    paddingRight: 10,
    paddingLeft: 5,
    paddingTop: 2,
    marginRight: 15,
    borderWidth: .5,
    borderColor: 'black'
  },
  secondary: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    opacity: 0.08
  }
});

export default PokedexLights;
