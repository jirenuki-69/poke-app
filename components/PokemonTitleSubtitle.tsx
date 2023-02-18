import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface Props {
  title: string,
  subtitle: string,
  flag?: boolean | undefined
}

const PokemonTitleSubtitle = ({ title, subtitle, flag }: Props) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
    <Text style={{ fontSize: 16, textAlign: 'justify' }}>{subtitle}</Text>
    <View style={{ ...styles.divider, display: flag ? 'flex' : 'none' }} />
  </View>
);

const styles = StyleSheet.create(({ 
  divider: {
    borderWidth: 0.5,
    marginVertical: 8,
    flex: 1,
    width: '100%',
  }
}))

export default PokemonTitleSubtitle;
