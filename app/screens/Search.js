import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

import SongList from '../components/SongList/SongList';

export default class Search extends React.Component {

  render() {
    const {navigation} = this.props;
    const accessToken = navigation.getParam('accessToken', 'no token !');
    const refreshToken = navigation.getParam('refreshToken', 'no refresh token !');
    const expiresIn = navigation.getParam('expiresIn', 'no expire value !');

    console.log("access token: " + accessToken);

    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
        <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <SongList
              token={accessToken}
            />
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
