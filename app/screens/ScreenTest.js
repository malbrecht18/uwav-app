import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient, Font } from 'expo';
import { createStackNavigator } from 'react-navigation';

import  Title  from '../components/Title/Title';
import  ButtonConnection  from '../components/ButtonConnection/ButtonConnection';

export default class ScreenTest extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />        
        <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>      
            <Title/>
            <Text>Success</Text>
        </LinearGradient>                 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 64,
    color: 'white',
  },
});
