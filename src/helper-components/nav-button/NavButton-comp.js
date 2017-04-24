
import React from 'react';

import { TouchableHighlight, View, Text, Image } from 'react-native';

import ShowIf from '../../helper-components/show-if/ShowIf';

import NavButtonStyles from './NavButton-styles';
const { navButton, navTextView, navText, navImage } = NavButtonStyles;

const NavButton = (props) => {
    
    const hideTitle = props.hideTitle;
    
    // debugger;
    
    return (
        <TouchableHighlight style={navButton} onPress={props.onPress}>
            <View>
                    <View style={[navTextView, hideTitle ? {opacity: 0} : {opacity: 1}]}>
                        <Text style={[navText, {color: props.titleColor}]}>
                            {props.title}
                        </Text>
                    </View>
                <Image resizeMode="stretch" style={navImage} source={props.imageSrc} />
            </View>
        </TouchableHighlight>
    )
};

export default NavButton;