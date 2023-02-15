import React from 'react';
import { StyleSheet, View } from 'react-native';

const PokedexMainSpeaker = () => (
  <View style={styles.speaker}>
    <View style={styles.speakerBlue}>
      <View style={styles.speakerBlue2}>
        <View style={styles.speakerWhite} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  speaker: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: 'white',
    padding: 5,
    paddingBottom: 7,
    paddingLeft: 7,
    marginRight: 20,
    borderWidth: 1
  },
  speakerBlue: {
    flex: 1,
    backgroundColor: '#0EBDD2',
    borderRadius: 60,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 15,
    opacity: 0.8
  },
  speakerBlue2: {
    flex: 1,
    backgroundColor: '#0BEFF6',
    borderRadius: 60,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 5,
    opacity: 0.5
  },
  speakerWhite: {
    flex: 1,
    backgroundColor: '#a2f5fc',
    borderRadius: 60,
    opacity: 0.8
  }
});

export default PokedexMainSpeaker;
