import React from 'react';
import { RefreshControl, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo';

import  Title  from '../components/Title/Title';
import Utility from '../components/Utility';
import SpotifyStore from '../components/SpotifyStore';

var styles = require('../components/SongList/styles.js');
export default class ScreenTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first: true,
      isLoading: false,
      refreshing: false,
      timer: null,
    };

    this.playlistId = "";

    this.renderTracks = this.renderTracks.bind(this);
    this.getTracks = this.getTracks.bind(this);

    this._onRefresh = this._onRefresh.bind(this);
  }

  getTracks() {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    SpotifyStore('user_data').then((result) => {
      this.accessToken = result.access_token;
      this.refreshToken = result.refresh_token;
      this.expiresIn = result.expires_in;
      this.clientCode = result.client_code;

      SpotifyStore('session_data').then((result) => {

        this.playlistId = result.playlist_id;

        let url = "https://api.spotify.com/v1/playlists/" + this.playlistId;
        let options = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken,
          }
        };

        fetch(url, options)
        .then((response) => {
          if (response.status == '401') {
            let refresh = Utility.refreshToken();
            this.accessToken = refresh.accessToken;
            this.expiresIn = refresh.expiresIn;
            this.getTracks();
          } else if (response.status == '200') {
            return response.json();
          }
        })
        .then((responseJson) => {
          this.setState({
            ...this.state,
            first: false,
            dataSource: responseJson.tracks.items,
            isLoading: false,
          });
        })
      });
    });
  }

  renderTracks = ({ item }) =>
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.imageAlbumStyle}
              source={{uri: item.track.album.images[2].url}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {this.checkSizeName(item.track.name, 41)}
          </Text>
          <Text style={styles.styleArtistName}
                numberOfLines={1}>
            {' ' + this.checkSizeName(this.checkArtistsNumber(item.track.artists) + ' • ' + this.checkSizeName(item.track.album.name, 35), 55)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  checkArtistsNumber(artists) {
    let artistToReturn = '';
    if (artists.length > 1) {
      for (let i = 0; i < artists.length; i++) {
        if (artistToReturn != '') {
          artistToReturn = artistToReturn + ', ' + artists[i].name;
        }
        else {
          artistToReturn = artists[i].name;
        }
      }
    }
    else {
      artistToReturn = artists[0].name;
    }
    return artistToReturn;
  }

  checkSizeName(name, size) {
    return name.length < size ? name : name.substring(0, size) + '...';
  }

  _onRefresh = () => {
    this.setState({
      ...this.state,
      refreshing: true,
    });
    this.getTracks()
    this.setState({
      ...this.state,
      refreshing: false,
    });
  }

  componentDidMount() {
    if (this.state.first) {
      this.getTracks();
    }
  }

  render() {
    if(!this.state.isLoading){
      return (
        <View style={{ flex: 1 , flexDirection: 'row'}}>
          <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
          <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <FlatList
              style={{marginBottom: 83, marginTop: 19}}
              data={this.state.dataSource}
              renderItem={this.renderTracks}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
            />
          </LinearGradient>
        </View>
      );
    } else {
      return(
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
          <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator/>
            </View>
          </LinearGradient>
        </View>
      )
    }
  }
}