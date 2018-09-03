import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MainTabNavigator from './app/navigation/MainTabNavigator';

import  HomeScreen  from './app/screens/HomeScreen';

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
