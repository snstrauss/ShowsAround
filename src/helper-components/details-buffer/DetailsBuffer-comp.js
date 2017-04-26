
import React, { Component } from 'react';

import { View, Text } from 'react-native';

import DetailsBufferStyles from './DetailsBuffer-styles';
const { view, text } = DetailsBufferStyles;

class DetailsBuffer extends Component{

    render(){

        let {height, color, fontSize} = this.props;
        console.log(height, color, fontSize)
        
        let dynamicViewStyles = {
            height: height
        }

        let dynamicTextStyles = {
            color: color,
            fontSize: fontSize
        }

        return (
            <View style={[view, dynamicViewStyles]}>
                <Text style={[text, dynamicTextStyles]}>
                    {this.props.children}
                </Text>
            </View>
        )
    }
}

export default DetailsBuffer;