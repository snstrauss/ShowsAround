import React, { Component } from 'react';

import { Text, TouchableHighlight } from 'react-native';

import IndependStyles from './independ-styles';
const { view, text } = IndependStyles;


class Independ extends Component {

    wasPressed(){
        
        debugger;

        alert('independ was pressed');
    }

    render(){
        debugger;
        return (
            <TouchableHighlight style={view} onPress={this.wasPressed.bind(this)}>
                <Text style={text}>
                    this is Independ
                </Text>
            </TouchableHighlight>
        )
    }
}

export default Independ;