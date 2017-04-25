
import React from 'react';

import { View } from 'react-native';

import EndItemStyles from './EndItem-styles.js';

const { endItem } = EndItemStyles;

const EndItem = (props) => (
    <View style={[endItem, {height: props.height}]}>
    </View>
);

export default EndItem;
