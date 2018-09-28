import React from 'react';
import {ActivityIndicator, View, WebView} from 'react-native';

import Base64 from '../components/Base64';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.client_id = 'be2a1bbadd2e47bd908b45d002d38d28';
        this.client_secret = '6dce2c9cfd864a2983e6f12d41d0d396';
        this.client_code = Base64.btoa(this.client_id + ':' + this.client_secret);
        this.response_type = 'code';
        this.scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative';
        this.spotify_state = this.generateRandomString(16);
        this.redirect_uri = 'http://192.168.1.94/spotify/index.html';
        this.authorizationCode;

        this.state = {
            isLoggedIn: false,
            uri: `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(this.client_id)}&response_type=${encodeURIComponent(this.response_type)}&redirect_uri=${encodeURIComponent(this.redirect_uri)}&scope=${encodeURIComponent(this.scope)}&state=${encodeURIComponent(this.spotify_state)}`,
        }

        this.getToken = this.getToken.bind(this);
        this.setUri = this.setUri.bind(this);
    }

    generateRandomString = (length) => {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    getToken() {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + this.client_code,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "grant_type=authorization_code&code=" +  this.authorizationCode + "&redirect_uri=" + this.redirect_uri,
        })
        .then((response) => {
            if(response.status == "200") {
                return response.json();
            } else {
                console.error("Cannot get user token");
            }
        })
        .then((responseJson) => {
            this.setState({
                ...this.state,
                isLoggedIn: true,
            })
            this.props.navigation.navigate('Session', {
                accessToken: responseJson.access_token,
                refreshToken: responseJson.refresh_token,
                expiresIn: responseJson.expires_in,
                clientCode: this.client_code,
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    setUri(state) {
        this.setState({
            ...this.state,
            uri: state.url,
        })
    }

    render() {
        if (!this.state.isLoggedIn && this.state.uri.indexOf('https://accounts.spotify.com/authorize') != -1) {
            return (
                <WebView
                    ref = {(ref) => { this.webview = ref; }}
                    style={{marginTop: 24}}
                    onNavigationStateChange = {(state) => {
                        console.log(state);
                        if (state.url.indexOf(this.redirect_uri + '?code') != -1 && !state.loading) {
                            this.authorizationCode = state.url.substring(state.url.indexOf('code') + 5, state.url.length);
                            console.log('This is the authorization code : ' + this.authorizationCode);
                            this.getToken();
                        }
                    }}
                    source={{uri: this.state.uri}}
                />
            );
        } else {
            //this.props.navigation.navigate('Home');
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }
    }
}