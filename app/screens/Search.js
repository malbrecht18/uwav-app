import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo';

import SongList from '../components/SongList/SongList';
import SpotifyStore from '../components/SpotifyStore';

import ViewAllResults from './ViewAllResults';

export default class Search extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
        <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <SongList/>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //alignItems: 'center',
    height: "100%",
    width: "100%",
  },
  textStyle: {
    fontSize: 64,
    color: 'white',
  },
});
