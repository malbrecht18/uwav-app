import React from 'react';
import { ActivityIndicator, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import Utility from '../Utility';
import SpotifyStore from '../SpotifyStore';

var styles = require('./styles');

class ArtistListAllResult extends React.Component {

  constructor(props){
    super(props);
    this.userStr = this.props.textSearch
    this.type = "artist"
    this.limit = 50
    this.state ={ isLoading: false, first: true }
    this.listRefreshing = false

    this.setSearch = this.setSearch.bind(this);
    this.displayDataSong = this.displayDataSong.bind(this);

    this.renderArtist = this.renderArtist.bind(this);
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
          this.listRefreshing = false;
          this.setState({
            ...this.state,
            artistData: responseJson.artists.items,
            isLoading: false,
          });
          console.log("item");
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
          artistData: null,
        })
      }
  }

  displayDataSong() {
    this.listRefreshing = true;
    this.setState({
      ...this.state,
      isLoading: true,
      first: false,
    });
    SpotifyStore('user_data').then((result) =>{
      this.accessToken = result.access_token;
      this.setSearch();
      if (!this.userStr || this.userStr === '') {
        this.setState({
          ...this.state,
          artistData: null,
        })
      }
    });
  }

  renderArtistImage(item) {
    if (typeof item.images[2] === 'undefined') {
      console.log("no cover");
      return ("https://image.jimcdn.com/app/cms/image/transf/none/path/ \
              s1ffdfc26721cdb35/image/idb7de00841fb1ae1/version/1465665708/image.png");
    } else {
      return (item.images[2].url);
    }
  }

  renderArtist = ({ item }) =>
    <TouchableOpacity>
        <View style={styles.container}>
        <View style={styles.imageArtistAndTrackStyle}>
            <Image style={styles.imageStyle}
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
        <FlatList
          style={styles.flatListStyle}
          data= {this.state.artistData}
          renderItem={this.renderArtist}
          keyExtractor={(item, index) => index.toString()}
          refreshing = {this.listRefreshing}
        />
      )
    }
  }

  componentDidMount() {
    if (this.state.first) {
        this.displayDataSong();
    }
  }

  render(){
    return(
      <View style={styles.textInputContainer}>
        {this.renderList()}
      </View>
    );
  }
}

export default withNavigation(ArtistListAllResult);