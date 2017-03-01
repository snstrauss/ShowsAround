
import React from 'react';

import { View } from 'react-native';


const ShowIf = (props) => {

    let insides = null;

    if(props.condition){
        insides = props.children;
    } else {
        insides = props.else;
    }
    
    return (
        <View>{insides}</View>
    )

}

export default ShowIf;
