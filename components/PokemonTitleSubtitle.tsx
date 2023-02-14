import React from 'react';
import { Text, View } from 'react-native';

const PokemonTitleSubtitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>{title}</Text>
    <Text style={{ fontSize: 16, textAlign: 'justify' }}>{subtitle}</Text>
  </View>
);

export default PokemonTitleSubtitle;
