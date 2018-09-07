import React from 'react';
import { RefreshControl, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo';

import  Title  from '../components/Title/Title';

var styles = require('../components/SongList/styles.js');
export default class ScreenTest extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      first: true,
      isLoading: false,
      refreshing: false,
    };

    this.userToken = this.props.token;
    this.playlistId = "6VIMwOQw4rOInLuRa7jayv";

    this.renderTracks = this.renderTracks.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  getTracks() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    let url = "https://api.spotify.com/v1/playlists/" + this.playlistId;
    let options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userToken,
      }
    };

    fetch(url, options)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        ...this.state,
        first: false,
        dataSource: responseJson.tracks.items,
        isLoading: false,
      });
    })
  }

  renderTracks = ({ item }) =>
    <TouchableOpacity
      delayPressIn={75}
    >
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
    const {navigation} = this.props;
    const accessToken = navigation.getParam('accessToken', 'no token !');
    const refreshToken = navigation.getParam('refreshToken', 'no refresh token !');
    const expiresIn = navigation.getParam('expiresIn', 'no expire value !');

    this.userToken = accessToken;

    //console.log('Token from playlist : ' + accessToken);

    if(!this.state.isLoading){
      return (
        <View style={{ flex: 1 , flexDirection: 'row'}}>
          <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
          <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <FlatList
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
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator/>
        </View>
      )
    }
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: "100%",
    width: "100%",
  },
  textStyle: {
    fontSize: 64,
    color: 'white',
  },
});*/
