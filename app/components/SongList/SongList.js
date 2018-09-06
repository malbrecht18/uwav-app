import React from 'react';
import { SectionList, FlatList, ActivityIndicator, Text, View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class SongList extends React.Component {

  constructor(props){
    super(props);
    this.userStr = ""
    this.type = "track,artist,album"
    this.limit = 5
    this.userToken = this.props.token
    this.state ={ isLoading: false }
    this.listRefreshing = false

    this.setSearch = this.setSearch.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderList = this.renderList.bind(this);
    this.sectionsList = this.sectionsList.bind(this);

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

  renderArtistImage(item) {
    if (typeof item.images[2].url === 'undefined') {
      return ("https://cdn.pixabay.com/photo/2013/07/13/13/17/karaoke-160752_1280.png");
    } else {
      return (item.images[2].url);
    }
  }

  renderSectionSeparator = ({leadingItem}) => 
    leadingItem ? (
      <TouchableOpacity>
        <View>
          <Text>
            Plus...
          </Text>
        </View>
      </TouchableOpacity>
    ) : null

  sectionsList = () => {
    return ([
      {title: 'Titres', data: this.state.tracksData, renderItem: this.renderTracks},
      {title: 'Albums', data: this.state.albumsData, renderItem: this.renderAlbums},
      {title: 'Artistes', data: this.state.artistsData, renderItem: this.renderArtists},
    ]);
  }

  renderTracks = ({ item }) =>
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.imageStyle}
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
        <Image style={styles.imageStyle}
               source={{uri: item.images[2].url}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {this.checkSizeName(item.name, 45)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  renderArtists = ({item, index, section}) =>
    <TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.imageStyle}
               source={{uri: this.renderArtistImage}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.styleSongName}
                numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>

  renderList(){
    const renderTracks = ({ item }) =>
      <Text>OK</Text>

    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator/>
        </View>
      )
    } else if (typeof this.state.tracksData === 'undefined') {
      <View>
        <Text> Il n'y a rien !</Text>
      </View>
    } else {
      return(
        <SectionList
          style={styles.flatListStyle}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          )}
          //sections={this.sectionsList}
          renderItem={({ item, index, section }) => <Text>{item.name}</Text>}
          sections={[
            {title: 'Titres', data: this.state.tracksData, renderItem: this.renderTracks},
            {title: 'Albums', data: this.state.albumsData, renderItem: this.renderAlbums},
            {title: 'Artists', data: this.state.artistsData, renderItem: this.renderArtists}
          ]}
          keyExtractor={(item, index) => index.toString()}
          refreshing = {this.listRefreshing}
          SectionSeparatorComponent={({leadingItem}) => leadingItem ? (<Text>Plus...</Text>) : null}
        />
      )
    }
  }

  checkArtistsNumber(artists) {
    let artistToReturn = '';
    if (artists.length > 0) {
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

const styles = StyleSheet.create({
  styleTextInput: {
    height: 50,
    paddingLeft: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(66, 175, 112, 0.4)',
    borderBottomStartRadius: 100,
    borderBottomEndRadius: 100,
  },
  styleSongName: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingLeft: 10,
    fontSize: 16,
  },
  styleArtistName: {
    backgroundColor: 'rgba(0,0,0,0)',
    paddingLeft: 7,
    fontSize: 12,
  },
  container: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 5,
  },
  textInputContainer: {
    flex: 1,
    paddingTop:20,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  activityIndicatorContainer: {
    flex: 1,
    padding: 20
  },
  flatListStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 88,
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
});

export default SongList;