import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MainTabNavigator from './app/navigation/MainTabNavigator';

import HomeScreen from './app/screens/HomeScreen';
import Login from './app/screens/Login';

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Tab: MainTabNavigator,
  Login: Login,
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
