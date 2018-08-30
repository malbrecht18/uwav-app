import React, { Component } from 'react';
import { Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import FontTextRoboto from '../FontText/FontTextRoboto';

var s = require('./styles');

class ButtonConnection extends Component {
    
    render() {
        return(
            <TouchableOpacity onPress={this.props.onPress} style={s.buttonConnection}>
                <FontTextRoboto style={s.textButtonConnection}>GO!</FontTextRoboto>
            </TouchableOpacity>
        );
    }
}

export default ButtonConnection;