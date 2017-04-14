
import React from 'react';

import { TouchableHighlight, View, Text } from 'react-native';

import NavButtonStyles from './NavButton-styles';
const { view, text } = NavButtonStyles;

const NavButton = (props) => (
    <View>
        <Text>
            {this.props.children}
        </Text>
    </View>
);

export default NavButton;