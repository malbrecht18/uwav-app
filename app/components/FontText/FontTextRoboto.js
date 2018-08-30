import { Text, StyleSheet } from 'react-native' ;
import React, { Component } from 'react' ;
import {Font} from 'expo';

class FontText extends Component {

    constructor(props) { 
        super(props); 
        this.state = { 
            titleText: "UwaV" 
        }; 
    } 

    state = { 
        fontLoaded: false,
    }; 

    async componentDidMount(){ 
        await Font.loadAsync({
            'Roboto': require('../../../assets/fonts/Roboto-Medium.ttf'), 
        }); 

        this.setState({ fontLoaded: true }); } 
    
        render(){
            return (
                this.state.fontLoaded ? ( <Text style={[styles.titleText, this.props.style]}>{this.props.children}</Text> ) : null 
            );
        }
    }

    const styles = StyleSheet.create({
        titleText: {
            backgroundColor: 'transparent',
            color: 'white',              
            fontFamily: 'Roboto',              
        },
    });

    export default FontText ;