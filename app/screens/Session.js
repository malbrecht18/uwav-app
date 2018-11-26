import React from 'react';
import { StyleSheet, View, TextInput, Clipboard } from 'react-native';
import { LinearGradient } from 'expo';

import  Title  from '../components/Title/Title';
import  ButtonConnection  from '../components/ButtonConnection/ButtonConnection';
import SpotifyStore from '../components/SpotifyStore';

export default class Session extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '4b55a7a8-bdf6-4929-9a1b-eb1cc42c3b7d'
        };
        this.joinSession = this.joinSession.bind(this);
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
        } else {
            console.error("Session doesn't exists");
        }
    })
    .then((responseJson) => {
        let sessionData = {
          playlist_id: responseJson.playlist_id
        }

        SpotifyStore('session_data', sessionData).then(() => {
            this.props.navigation.navigate('Tab');
        });
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
    paddingLeft: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(66, 175, 112, 0.4)',
    borderBottomStartRadius: 100,
    borderBottomEndRadius: 100,
  },
});
