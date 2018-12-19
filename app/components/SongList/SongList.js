import React from 'react';

import { SectionList, FlatList, ActivityIndicator, Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import Utility from '../Utility';
import SpotifyStore from '../SpotifyStore';


var styles = require('./styles');

class SongList extends React.Component {

  constructor(props){
    super(props);
    this.userStr = ""
    this.type = "track,artist,album"
    this.limit = 5
    this.playlistId = "6VIMwOQw4rOInLuRa7jayv"
    this.state = {
      isLoading: false
    }

    this.listRefreshing = false

    this.setSearch = this.setSearch.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderList = this.renderList.bind(this);

    this.selectSong = this.selectSong.bind(this);


    this.renderTracks = this.renderTracks.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
    this.renderArtists = this.renderArtists.bind(this);

    //this.renderSectionSeparator = this.renderSectionSeparator.bind(this);
    this.renderArtistImage = this.renderArtistImage.bind(this);
  }

  setSearch() {
    if (this.userStr != "") {
      return fetch('https://api.spotify.com/v1/search?q='
                    + encodeURIComponent(this.userStr)
                    + '&type=' + encodeURIComponent(this.type)
                    + '&limit=' + encodeURIComponent(this.limit),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.accessToken,
        }
      })
        .then((response) => {
          if (response.status == '401') {
            let refresh = Utility.refreshToken();
            this.accessToken = refresh.accessToken;
            this.expiresIn = refresh.expiresIn;
            this.setSearch();
          }
          return response.json();
        })
        .then((responseJson) => {
          console.log("Tracks items:" + responseJson.tracks.items);
          this.listRefreshing = false;
          this.setState({
            ...this.state,
            tracksData: responseJson.tracks.items,
            albumsData: responseJson.albums.items,
            artistsData: responseJson.artists.items,
            isLoading: false,
          });
        })
        .catch((error) =>{
          this.listRefreshing = false;
          this.setState({
            ...this.state,
            isLoading: false,
          })
          console.error(error);
        });

    } else {
        this.listRefreshing = false;
        this.setState({
          ...this.state,
          isLoading: false,
          tracksData: null,
          albumsData: null,
          artistsData: null,
        })
      }
  }

  handleRefresh(text) {
    this.userStr = text;
    this.listRefreshing = true;
    this.setState({
      ...this.state,
      isLoading: true,
    });

    this.setSearch();
    if (!text || text === '') {
      this.setState({
        ...this.state,
        tracksData: null,
        albumsData: null,
        artistsData: null,
      })
    };
  }

  selectSong(item) {
    let url = 'https://api.spotify.com/v1/playlists/' +
    encodeURIComponent(this.playlistId) +
    '/tracks?uris=' +
    encodeURIComponent(item.uri);

    let options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken,
      }
    };

    fetch(url, options)
        .then((response) => {
          if (response.status != 201) {
            if (response.status == '401') {
              let refresh = Utility.refreshToken();
              this.accessToken = refresh.accessToken;
              this.expiresIn = refresh.expiresIn;
              this.selectSong();
            }
            console.error("Cannot add track to playlist");
          }
        })
        .catch((error) => {
          console.error(error);
        })
  }

  renderArtistImage(item) {
    if (typeof item.images[2] === 'undefined') {
      return ("https://image.jimcdn.com/app/cms/image/transf/none/path/ \
              s1ffdfc26721cdb35/image/idb7de00841fb1ae1/version/1465665708/image.png");
    } else {
      return (item.images[2].url);
    }
  }

 /* renderSectionSeparator = ({leadingItem}) =>
    leadingItem ? (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewAllResults', {userStr: this.userStr})}>
        <View>
          <Text style={styles.separatorSectionList}>
            Voir tous
          </Text>
        </View>
      </TouchableOpacity>
    ) : null*/

  renderNextScreen(path){
    switch (path) {
      case 'Titres':
        this.props.navigation.navigate('ViewAllResults', {userStr: this.userStr});
        break;
      case 'Albums':
        this.props.navigation.navigate('ViewAllAlbumsResults', {userStr: this.userStr});
        break;
      case 'Artists':
        this.props.navigation.navigate('ViewAllArtistsResults', {userStr: this.userStr});
        break;
      default:
        return null;
    }
  }

  renderTracks = ({ item }) =>
    <TouchableOpacity onPress={() => this.selectSong(item)}>
      <View style={styles.container}>
        <View style={styles.imageArtistAndTrackStyle}>
          <Image style={styles.imageTrackStyle}
                source={{uri: item.album.images[2].url}} />
        </View>
                {console.log(item.album.images[2].url)}
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {Utility.checkSizeName(item.name, 41)}
          </Text>
          <Text style={styles.styleArtistName}
                numberOfLines={1}>
            {' ' + Utility.checkSizeName(Utility.checkArtistsNumber(item.artists) +
             ' • ' + Utility.checkSizeName(item.album.name, 35), 55)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  renderAlbums = ({ item, index, section }) =>
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.imageAlbumStyle}
               source={{uri: this.renderArtistImage(item)}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {Utility.checkSizeName(item.name, 45)}
          </Text>
          <Text style={styles.styleArtistName}>
            {' ' + Utility.checkSizeName(Utility.checkArtistsNumber(item.artists) +
             ' • ' + Utility.checkDate(item.release_date), 55)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  renderArtists = ({item, index, section}) =>
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imageArtistAndTrackStyle}>
          <Image style={styles.imageArtistStyle}
                source={{uri: this.renderArtistImage(item)}} />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {Utility.checkSizeName(item.name, 45)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  renderList(){
    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator/>
        </View>
      )
    } else if (!this.userStr || this.userStr == '') {
      <View>
        <Text> Recherche vide</Text>
      </View>
    } else {
      return(
        <SectionList
          style={styles.flatListStyle}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.viewTitleSectionList}>
              <Text style={styles.titleSectionList}>{title}</Text>
            </View>
          )}
          renderItem={({ item, index, section }) => <Text>{item.name}</Text>}
          sections={[
            {title: 'Titres', data: this.state.tracksData, renderItem: this.renderTracks},
            {title: 'Albums', data: this.state.albumsData, renderItem: this.renderAlbums},
            {title: 'Artists', data: this.state.artistsData, renderItem: this.renderArtists}
          ]}
          refreshing = {this.listRefreshing}
          //SectionSeparatorComponent={this.renderSectionSeparator}
          renderSectionFooter={({section: {item, title}}) => (
            <TouchableOpacity onPress={() => this.renderNextScreen(title)}>
            <View>
              <Text style={styles.separatorSectionList}>
                Voir tous
              </Text>
            </View>
          </TouchableOpacity>
          )}
          stickySectionHeadersEnabled={false}
        />
      )
    }
  }


  render(){
    SpotifyStore('user_data').then((result) => {
      this.accessToken = result.access_token;
    });

    return(
      <View style={styles.textInputContainer}>
        <TextInput
          onChangeText={(userStr) => this.handleRefresh(userStr)}
          placeholder='Rechercher...'
          underlineColorAndroid='transparent'
          returnKeyType='search'
          spellCheck={false}
          maxLength={40}
          clearButtonMode='always'
          style={styles.styleTextInput}
          value={this.userStr}
        />
        {this.renderList()}
      </View>
    );
  }
}

export default withNavigation(SongList);