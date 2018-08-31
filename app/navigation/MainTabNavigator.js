import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient, Font } from 'expo';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TestNavigator from '../screens/TestNavigator';
import ScreenTest from '../screens/ScreenTest';

import { MaterialIcons } from '@expo/vector-icons';

import  Title  from '../components/Title/Title';
import  ButtonConnection  from '../components/ButtonConnection/ButtonConnection';

class TabIcon extends React.Component {
  render() {
    let baseSize = this.props.size || 26;
    return (
      <MaterialIcons
        name={this.props.name}
        size={Platform.OS === 'android' ? baseSize - 2 : baseSize}
        color={this.props.focused ? 'black' : 'black'}
      />
    );
  }
}

const createTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator : createBottomTabNavigator;

const MainTabNavigator = createTabNavigator({

  NavigatorTest: {screen: TestNavigator},
  TestScreen: {screen: ScreenTest},

  },
  {
    navigationOptions: ({ navigation }) => {
      let tabBarLabel;
      const { routeName } = navigation.state;
      if (routeName == 'NavigatorTest'){
        tabBarLabel = 'ScreenNavigatorTest';
      }

      return {
        header: null,
        tabBarLabel,
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;
          if (routeName == 'NavigatorTest'){
            return <TabIcon name="group-work" focused={focused} />;
          }
        },
      };
    },
  });

  export default MainTabNavigator;

