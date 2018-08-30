import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';

const ButtonTest = ({title, onPress}) => ( 
    <Button title='test' onPress={() => {alert('alert o gogol')}}/>               
);

export default ButtonTest;

