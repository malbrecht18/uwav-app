import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, TextInput, StyleSheet } from 'react-native';

class SongList extends React.Component {

  constructor(){
    super();
    this.userStr = ""
    this.type = "track"
    this.limit = 50
    this.userToken = 'BQAKZHPYnWzEHAETtikI4PbFrj3UKKqcG9QzOstHyrquLPljqSf4fdwJBpb-Sk_3QWyytGZkdjPryEGawAJ85uUuRRMmDEG7mtFT1-z17hYkPRoJfqa2bfDKR5ogWu60jiHi6x2zsg'
    this.state ={ isLoading: false}
    this.listRefreshing = false

    this.setSearch = this.setSearch.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.renderList = this.renderList.bind(this);
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
            dataSource: responseJson.tracks.items,
            isLoading: false,
          }, function(){

          });

        })
        .catch((error) =>{
          this.listRefreshing = true;
          this.setState({
            isLoading: false,
          })
          console.error(error);
        });

    } else {
        this.listRefreshing = true;
        this.setState({
          isLoading: false,
          dataSource: null,
        })
      }
  }

  handleRefresh(text) {
    this.userStr = text;
    this.listRefreshing = true;
    this.setState({
      isLoading: true,
    });
    this.setSearch();
    if (!text) {
      this.setState({
        dataSource: null,
      })
    }
  }

  renderList(){
    if(this.state.isLoading){
      return(
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return(
        <FlatList
          style={styles.flatListStyle}
          data={this.state.dataSource}
          renderItem={({item}) =>
            <View style={styles.container}>
              <Image style={styles.imageStyle}
                     source={{uri: item.album.images[0].url}} />
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.styleSongName}
                      numberOfLines={1}>
                  {this.checkSizeName(item.name, 45)}
                </Text>
                <Text style={styles.styleArtistName}
                      numberOfLines={1}>
                  {' ' + this.checkSizeName(this.checkArtistsNumber(item.artists) + ' • ' + this.checkSizeName(item.album.name, 35), 55)}
                </Text>
              </View>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          refreshing = {this.listRefreshing}
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