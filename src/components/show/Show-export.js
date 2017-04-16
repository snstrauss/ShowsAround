
import React, { Component } from 'react';

import { View, Text } from 'react-native';

import ShowStyles from './Show-styles';



const ShowExport = {

    header: (
        <View style={showBox}>  
            <View style={textParent}>
                <Text style={titleStyle}>{thisShow.artist}</Text>    
            </View>
            <View style={[imageParent, {borderColor: this.state.borderColor}]}>
                <Image resizeMode="stretch" style={{height: this.imageHeight}} source={{ uri: thisShowDefaultPicUri }}></Image>
                <View style={priceParent}>
                    <Text style={priceStyle}>{thisPrice}</Text>
                </View>
            </View>
        </View>
    ),

    content: (
        <View style={[detailsParent, {borderColor: this.state.borderColor}]}>
            <Text style={detailsStyle}>{thisShow.details}</Text>
        </View>
    )

}