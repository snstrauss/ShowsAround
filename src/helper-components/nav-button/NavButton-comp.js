
import React from 'react';

import { TouchableHighlight, View, Text, Image } from 'react-native';

import NavButtonStyles from './NavButton-styles';
const { navButton, navTextView, navText, navImage } = NavButtonStyles;

const NavButton = (props) => (
    <TouchableHighlight style={navButton} onPress={props.onPress}>
        <View>
            <View style={navTextView}>
                <Text style={[navText, {color: props.titleColor}]}>
                    {props.title}
                </Text>
            </View>
            <Image resizeMode="stretch" style={navImage} source={props.imageSrc} />
        </View>
    </TouchableHighlight>
);

export default NavButton;