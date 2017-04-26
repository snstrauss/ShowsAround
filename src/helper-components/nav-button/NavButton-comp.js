
import React from 'react';

import { TouchableHighlight, View, Text, Image } from 'react-native';

import ShowIf from '../../helper-components/show-if/ShowIf';

import NavButtonStyles from './NavButton-styles';
const { navButton, navTextView, navText, navImage, textParent, titleStyle } = NavButtonStyles;

const NavButton = (props) => {
    
    const hideTitle = props.hideTitle;
    
    let specialTitleStyle = props.titleStyleOverride ? props.titleStyleOverride : navText;
    
    return (
        <TouchableHighlight style={navButton} onPress={props.onPress}>
            <View>
                    <View style={textParent} collapsable={false}>
                        <Text style={specialTitleStyle}>{props.title}</Text>
                    </View>
                <Image resizeMode="stretch" style={navImage} source={props.imageSrc} />
            </View>
        </TouchableHighlight>
    )
};

export default NavButton;