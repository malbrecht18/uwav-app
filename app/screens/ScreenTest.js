import React from 'react';
import { StyleSheet, Text, View, Platform, WebView } from 'react-native';
import { LinearGradient, Font } from 'expo';
import { createStackNavigator } from 'react-navigation';

import { ButtonTest } from '../components/ButtonTest/ButtonTest';
import  Title  from '../components/Title/Title';
import { ButtonConnection } from '../components/ButtonConnection/ButtonConnection';

export default class ScreenTest extends React.Component {

  constructor(props) {
    super(props);
    this.client_id = 'be2a1bbadd2e47bd908b45d002d38d28';
    this.response_type = 'code';
    this.scope = 'user-read-private user-read-email';
    this.spotify_state = this.generateRandomString(16);
    this.redirect_uri = 'http://localhost:8888/success';
  }
  render() {
    return (
      <WebView
        /*onNavigationStateChange={(state) => {
          console.log(state.url);
          if (state.url.indexOf('http://localhost:8888/success') != -1) {
            this.props.navigation.navigate('Success')
          }
        }}*/
        onLoad={this.loadSuccess}
        onError={this.logError(state)}
        source={{uri: `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(this.client_id)}&response_type=${encodeURIComponent(this.response_type)}&redirect_uri=${encodeURIComponent(this.redirect_uri)}&scope=${encodeURIComponent(this.scope)}&state=${encodeURIComponent(this.spotify_state)}`}}
      />
    );
  }
  generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  };

  loadSuccess(state) {
    console.log(state.url);
    if (state.url.indexOf('http://localhost:8888/success') != -1) {
      stopLoading();
      console.log("STOP LOADING");
      return (
        () => this.props.navigation.navigate('Success')
      );
    }
  };

  logError() {
    console.log("ERROR LOOOOOOOOL !");
  }
}