import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, TextInput } from 'react-native';

class SongList extends React.Component {

  constructor(){
    super();
    this.userStr = ""
    this.type = "track"
    this.limit = 50
    this.userToken = 'BQBTwWZOByrrsoI_kOSk1eqhb7t8ktG4QZXnLTHgiVFOcj10TQC-D2l3x4PJIGoIuwzU_cRTBrc1m_u39eW4K6CBzBOodGiJh8g0ObUzyWgNIeYal4uD8P9hxfQQiqDsFE8IUt05g01NBEI-F4SPSzLwCTSZ65rroJc'
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
  }

  renderList(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return(
        <FlatList
          style={{backgroundColor: 'rgba(0,0,0,0)'}}
          data={this.state.dataSource}
          renderItem={({item}) =>
            <View style={{flex:1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)', padding: 5}}>
              <Image style={{width: 50, height: 50}}
                     source={{uri: item.album.images[0].url}} />
              <Text style={{backgroundColor: 'rgba(0,0,0,0)', paddingLeft: 10}}
                    numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={{backgroundColor: 'rgba(0,0,0,0)'}}
                    numberOfLines={1}>
                {' ' + item.artists[0].name}
              </Text>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          refreshing = {this.listRefreshing}
        />
      )
    }
  }

  render(){
    return(
      <View style={{flex: 1, paddingTop:20, backgroundColor: 'rgba(0,0,0,0)'}}>
        <TextInput
          onChangeText={(userStr) => this.handleRefresh(userStr)}
          placeholder='Rechercher...'
          underlineColorAndroid='transparent'
          returnKeyType='search'
          spellCheck={false}
          maxLength={40}
          clearButtonMode='always'
          style={{height: 50, paddingLeft: 5}}
          value={this.userStr}
        />
        {this.renderList()}
      </View>
    );
  }
}

export default SongList;