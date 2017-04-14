
import React, { Component } from 'react';

import { View, Text } from 'react-native';

import AreasStyles from './Areas-styles';
const { view, text } = AreasStyles;

class Areas extends Component {

    render(){

        return (
            <View style={view}>
                <Text style={text}>
                    this areas is areas
                </Text>
            </View>
        )
    }
}

export default Areas;