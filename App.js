import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainTabNavigator from './app/navigation/MainTabNavigator';
import HomeScreen from './app/screens/HomeScreen';
import Login from './app/screens/Login';
import Session from './app/screens/Session';

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Tab: MainTabNavigator,
  Login: Login,
  Session: Session,
},
{
  initialRouteName: 'Home',
  headerMode: 'none',
},
);

export default class App extends React.Component{
  render() {
    console.ignoredYellowBox = ['Setting a timer'];
    return(
      <RootStack/>
    )
  };
}
