
import React, { Component } from 'react';

import { View } from 'react-native';



class ShowIf extends Component {

    render(){

        let insides = null;

        if(this.props.condition){
            insides = this.props.children;
        } else {
            insides = this.props.else;
        }

        return (
            <View>{insides}</View>
        )
    }
}

export default ShowIf;
