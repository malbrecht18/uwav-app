import React from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import {NavigationActions} from 'react-navigation';

import  Title  from '../components/Title/Title';
import  ButtonConnection  from '../components/ButtonConnection/ButtonConnection';
import SpotifyStore from '../components/SpotifyStore';
import Logout from '../components/Logout';
import LogoutButton  from '../components/LogoutButton/LogoutButton';

export default class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '4b55a7a8-bdf6-4929-9a1b-eb1cc42c3b7d'
        };
        this.joinSession = this.joinSession.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Logout().then(() => {
            this.props.navigation.reset([NavigationActions.navigate({routeName: 'Home'})], 0);
        });
    }

    joinSession() {
      this.sessionId = this.state.text;
      fetch('http://192.168.43.128:3000/session/' + this.sessionId, {
        method: 'GET',
        headers: {
            Authorization: 'Basic ' + this.client_code,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then((response) => {
        if(response.status == "200") {
            return response.json();
        } else if (response.status == "204"){
            Alert.alert(
                'Uwav',
                'No session corresponds to this code !',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        } else {
            console.error("Wrong request !");
        }
    })
    .then((responseJson) => {
        if (typeof responseJson !== 'undefined') {
            let sessionData = {
                playlist_id: responseJson.playlist_id
            }

            SpotifyStore('session_data', sessionData).then(() => {
                this.props.navigation.navigate('Tab');
            });
        }
    })
    .catch((error) => {
        console.error(error);
    });
    }

  render() {
    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
        <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <LogoutButton style={styles.LogoutButton}
                            onPress={this.logout}
            />
            <Title/>
            <TextInput
                style={styles.styleTextInput}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                placeholder='Rechercher...'
                underlineColorAndroid='transparent'
                returnKeyType='search'
                spellCheck={false}
                maxLength={40}
                clearButtonMode='always'
                onSubmitEditing={this.joinSession}
            />
            <ButtonConnection onPress={this.joinSession}/>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: "100%",
    width: "100%",
  },
  styleTextInput: {
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(66, 175, 112, 0.4)',
    borderBottomStartRadius: 100,
    borderBottomEndRadius: 100,
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 200,
  },
});
