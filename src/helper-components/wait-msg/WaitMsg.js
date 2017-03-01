
import React from 'react';

import { View, Text } from 'react-native';

import WaitMsgStyles from './WaitMsg-styles.js';

const WaitMsg = (props) => {

    const { waitMsgContainer, waitMsgBox, waitMsgText } = WaitMsgStyles;

    return (
        <View style={waitMsgBox}>
            <Text style={waitMsgText}>{props.msg}</Text>
        </View>        
    )
}

// <View style={waitMsgContainer}>
//         </View>



export default WaitMsg;
