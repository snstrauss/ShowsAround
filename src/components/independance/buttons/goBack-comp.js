
import React, { Component } from 'react';

import { View, Text, TouchableHighlight } from 'react-native';

import GoBackStyles from './goBack-styles';
const { view, text } = GoBackStyles;

class GoBack extends Component {

    render(){

        return (
            <TouchableHighlight style={view} onPress={this.props.activate}>
                <Text style={view}>
                    {this.props.title}
                </Text>
            </TouchableHighlight>
        )
    }
}


export default GoBack;