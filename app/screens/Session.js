import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo';

import  Title  from '../components/Title/Title';
import  ButtonConnection  from '../components/ButtonConnection/ButtonConnection';

export default class Session extends React.Component {

    constructor(props) {
        super(props);
        this.sessionCode = "";

        this.joinSession = this.joinSession.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh(text) {
        this.sessionCode = text;
    }

    joinSession() {
        console.log(this.sessionCode);
    }

  render() {
    return (
      <View style={{ flex: 1 , flexDirection: 'row'}}>
        <View style={{ backgroundColor: '#5de2b4', flexDirection: 'row' }} />
        <LinearGradient colors={['rgba(0,255,255,0.7)', '#42af70']} style={styles.container}>
            <Title/>
            <TextInput
                onChangeText={(text) => this.handleRefresh(text)}
                placeholder='Rechercher...'
                underlineColorAndroid='transparent'
                returnKeyType='search'
                spellCheck={false}
                maxLength={40}
                clearButtonMode='always'
                style={styles.styleTextInput}
                value={this.sessionCode}
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
