import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient, Font } from 'expo';
import { createStackNavigator } from 'react-navigation';

import { ButtonTest } from '../components/ButtonTest/ButtonTest';
import  Title  from '../components/Title/Title';
import  ButtonConnection  from '../components/ButtonConnection/ButtonConnection';

export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flex: 1, flexDirection: 'row' }} />        
        <LinearGradient colors={['rgba(0,255,255,0.7)', 'transparent']} style={styles.container}>      
            <Title/>
            <ButtonConnection onPress={() => this.props.navigation.navigate('Test')}/>
        </LinearGradient>          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
