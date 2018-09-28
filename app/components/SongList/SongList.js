import React from 'react';
import { SectionList, ToastAndroid, ActivityIndicator, Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

var styles = require('./styles');

class SongList extends React.Component {

  constructor(props){
    super(props);
    this.userStr = ""
    this.type = "track,artist,album"
    this.limit = 5
    this.userToken = this.props.token
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

    this.renderSectionSeparator = this.renderSectionSeparator.bind(this);
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
          'Authorization': 'Bearer ' + this.userToken,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
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
    }
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
        'Authorization': 'Bearer ' + this.userToken,
      }
    };

    fetch(url, options)
        .then((response) => {
          if (response.status != 201) {
            ToastAndroid.showWithGravityAndOffset(
              'Cannot add track to playlist',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50
            );
            console.error("Cannot add track to playlist");
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Track added to playlist',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          }
        })
        .catch((error) => {
          console.error(error);
        })
  }

  renderArtistImage(item) {
    if (typeof item.images[2] === 'undefined') {
      return ("https://image.jimcdn.com/app/cms/image/transf/none/path/s1ffdfc26721cdb35/image/idb7de00841fb1ae1/version/1465665708/image.png");
    } else {
      return (item.images[2].url);
    }
  }

  renderSectionSeparator = ({leadingItem}) =>
    leadingItem ? (
      <TouchableOpacity>
        <View>
          <Text style={styles.separatorSectionList}>
            Voir tous
          </Text>
        </View>
      </TouchableOpacity>
    ) : null

  renderTracks = ({ item }) =>
    <TouchableOpacity onPress={() => this.selectSong(item)}>
      <View style={styles.container}>
        <Image style={styles.imageTrackStyle}
              source={{uri: item.album.images[2].url}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {this.checkSizeName(item.name, 41)}
          </Text>
          <Text style={styles.styleArtistName}
                numberOfLines={1}>
            {' ' + this.checkSizeName(this.checkArtistsNumber(item.artists) + ' • ' + this.checkSizeName(item.album.name, 35), 55)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  renderAlbums = ({ item, index, section }) =>
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.imageAlbumStyle}
               source={{uri: item.images[2].url}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {this.checkSizeName(item.name, 45)}
          </Text>
          <Text style={styles.styleArtistName}>
            {' ' + this.checkSizeName(this.checkArtistsNumber(item.artists) + ' • ' + this.checkDate(item.release_date), 55)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  renderArtists = ({item, index, section}) =>
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.imageArtistStyle}
               source={{uri: this.renderArtistImage(item)}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {this.checkSizeName(item.name, 45)}
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
          //sections={this.sectionsList}
          renderItem={({ item, index, section }) => <Text>{item.name}</Text>}
          sections={[
            {title: 'Titres', data: this.state.tracksData, renderItem: this.renderTracks},
            {title: 'Albums', data: this.state.albumsData, renderItem: this.renderAlbums},
            {title: 'Artists', data: this.state.artistsData, renderItem: this.renderArtists}
          ]}
          refreshing = {this.listRefreshing}
          SectionSeparatorComponent={this.renderSectionSeparator}
          stickySectionHeadersEnabled={false}
        />
      )
    }
  }

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

  checkDate(release_date){
    if (typeof release_date == 'undefined' || release_date == '') {
      return ' ';
    }

    let date = new Date(release_date);
    return date.getFullYear();
  }

  render(){
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

export default SongList;