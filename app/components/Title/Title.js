import React from 'react';
import { Text } from 'react-native';
import FontText from '../FontText/FontText';
import { Provider, Redux } from 'react-redux';

var s = require('./styles');

const Title = () => (
    <FontText style={s.styles}>Uwav</FontText>
);

export default Title;