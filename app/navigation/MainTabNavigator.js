import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { LinearGradient, Font } from 'expo';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TestNavigator from '../screens/TestNavigator';
import TestNavigator2 from '../screens/TestNavigator2';
import ScreenTest from '../screens/ScreenTest';

import { MaterialIcons } from '@expo/vector-icons';

import  Title  from '../components/Title/Title';
import  ButtonConnection  from '../components/ButtonConnection/ButtonConnection';

class TabIcon extends React.Component {
  render() {
    let baseSize = this.props.size || 32;
    return (
      <MaterialIcons
        name={this.props.name}
        size={Platform.OS === 'android' ? baseSize - 2 : baseSize}
        color={this.props.focused ? 'white' : 'black'}
      />
    );
  }
}

const createTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator : createBottomTabNavigator;

const MainTabNavigator = createTabNavigator({

  NavigatorTest: {screen: TestNavigator},
  TestScreen: {screen: ScreenTest},
  NavigatorTest2: {screen: TestNavigator2},

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
            return <TabIcon name="search" focused={focused} />;
          }
          if (routeName == 'TestScreen'){
            return <TabIcon name="playlist-play" focused={focused} />;
          }
          if (routeName == 'NavigatorTest2'){
            return <TabIcon name="history" focused={focused} />;
          }          
        },      
      };      
    },
    tabBarOptions: {
      tinColor: 'black',
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      showIcon: true,
      showLabel: true,
      lazyLoad: true,
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: 'transparent'
      },
      style: {
        backgroundColor: 'rgba(66, 175, 112, 0.1)',
        borderTopWidth: 3,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 15,
        height: 75,
      }
    }
  });

  export default MainTabNavigator;

