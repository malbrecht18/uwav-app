import React, { Component } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

var s = require('./styles');

class LogoutButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={s.buttonLogout}>
                <SimpleLineIcons name="logout" size={32} color="black" style={s.iconLogout}/>
            </TouchableOpacity>
        );
    }
}

export default LogoutButton;