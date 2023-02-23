import React, { useState } from 'react';
import { Modal, View, ScrollView, StyleSheet } from 'react-native';
import PokemonTitleSubtitle from './PokemonTitleSubtitle';

interface Props {
  pokemon: Pokemon,
  modalVisible: boolean,
  setModalVisible: any
}

const DescriptionModal = ({ pokemon, modalVisible, setModalVisible }: Props) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={setModalVisible}
    >
      <ScrollView>
        <View style={styles.container}>
          <PokemonTitleSubtitle title="Tipo" subtitle={pokemon.typeInfo.names} />
          <PokemonTitleSubtitle title="Descripcion" subtitle={pokemon.description} />
          <PokemonTitleSubtitle
            title="Tipos a los que NO le hace daño"
            subtitle={pokemon.typeInfo.no_damage_to || 'No aplica'}
          />
          <PokemonTitleSubtitle
            title="Tipos a los que hace la mitad de daño"
            subtitle={pokemon.typeInfo.half_damage_to || 'No aplica'}
          />
          <PokemonTitleSubtitle
            title="Tipos a los que les hace el doble de daño,"
            subtitle={pokemon.typeInfo.double_damage_to || 'No aplica'}
          />
          <PokemonTitleSubtitle
            title="Tipos a los que recibe el doble de daño"
            subtitle={pokemon.typeInfo.double_damage_from || 'No aplica'}
          />
          <PokemonTitleSubtitle title="Ataques" subtitle={pokemon.movesInfo.join(` / `)} />
          <PokemonTitleSubtitle
            title="Cadena evolutivas"
            subtitle={pokemon.evolutionTree!.map((value: any) => `${value.name}(${value.types})`).join(' --> ')}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create(({
  container: {
    textAlign: 'left',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '60%',
    alignSelf: 'center',
    alignContent: 'center'
  }
}));

export default DescriptionModal;
