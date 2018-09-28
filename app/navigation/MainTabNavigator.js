import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Search from '../screens/Search';
import History from '../screens/History';
import Playlist from '../screens/Playlist';
import ViewAllResults from '../screens/ViewAllResults';

const SearchStackNavigator = createStackNavigator (
{
  Search: { screen: Search },
  ViewAllResults: { screen: ViewAllResults },
}
,
{
  headerMode: 'none',
  initialRouteName: 'Search',
});

class TabIcon extends React.Component {
  render() {
    let baseSize = this.props.size || 32;
    return (
      <MaterialIcons
        name={this.props.name}
        size={Platform.OS === 'android' ? baseSize - 6 : baseSize}
        color={this.props.focused ? 'white' : 'black'}
      />
    );
  }
}

//const createTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator : createBottomTabNavigator;
const createTabNavigator = createBottomTabNavigator;


const MainTabNavigator = createTabNavigator({

  Search: {screen: SearchStackNavigator},
  Playlist: {screen: Playlist},
  History: {screen: History},

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
          if (routeName == 'Search'){
            return <TabIcon name="search" focused={focused} />;
          }
          if (routeName == 'Playlist'){
            return <TabIcon name="playlist-play" focused={focused} />;
          }
          if (routeName == 'History'){
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

