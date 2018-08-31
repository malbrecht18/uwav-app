import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient, Font } from 'expo';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MainTabNavigator from './app/navigation/MainTabNavigator';

import { ButtonTest } from './app/components/ButtonTest';
import { Title } from './app/components/Title';
import { ButtonConnection } from './app/components/ButtonConnection';

import  HomeScreen  from './app/screens/HomeScreen';
import  ScreenTest  from './app/screens/ScreenTest';

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Tab: MainTabNavigator,
},
{
  initialRouteName: 'Home',
  headerMode: 'none',
},
);

export default class App extends React.Component{
  render() {
    return(
      <RootStack/>
    )
  };
}
