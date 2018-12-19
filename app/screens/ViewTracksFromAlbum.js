import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo';

import Title from '../components/Title/Title';
import TracksFromAlbumResult from '../components/TracksFromAlbumResult/TracksFromAlbumResult';

export default class ViewAllResults extends React.Component {

  render() {
    const {navigation} = this.props;

    const text = navigation.getParam('userStr', 'no text !');
    const albumId = navigation.getParam('albumId', 'no albumId !');
    const imageUrl = navigation.getParam('imageUrl', 'no image !');
    const releaseDate = navigation.getParam('releaseDate', 'no releaseDate !');
    const albumName = navigation.getParam('albumName', 'no albumName');

    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
        <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <Image style = {{height: 150, width: 150}} source={{uri: imageUrl.url}} />
            <Text style={{fontSize: 14}}>{albumName}</Text>
            <Text style={{fontSize: 10}}>{releaseDate}</Text>
            <TracksFromAlbumResult textSearch={text} albumId={albumId}/>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: "100%",
    width: "100%",
  },
  textStyle: {
    fontSize: 24,
    color: 'black',
    marginTop: 12,
  },
});
