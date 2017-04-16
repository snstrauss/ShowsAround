import React, { Component } from 'react';

import { Text, TouchableHighlight } from 'react-native';

import IndependStyles from './independ-styles';
const { view, text } = IndependStyles;


class Independ extends Component {

    wasPressed(){
        alert('independ was pressed');
    }

    render(){
        
        return (
            <TouchableHighlight style={view} onPress={this.wasPressed.bind(this)}>
                <Text style={text}>
                    this is Independ button
                </Text>
            </TouchableHighlight>
        )
    }
}

export default Independ;