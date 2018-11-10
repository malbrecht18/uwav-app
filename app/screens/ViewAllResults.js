import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LinearGradient } from 'expo';

import Title from '../components/Title/Title';
import SongListAllResults from '../components/SongListAllResults/SongListAllResults';

export default class ViewAllResults extends React.Component {

  render() {
    const {navigation} = this.props;

    const text = navigation.getParam('userStr', 'no text !');

    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
        <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <Text style={styles.textStyle}>{text}</Text>
            <SongListAllResults textSearch={text}/>
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
    fontSize: 64,
    color: 'white',
  },
});
