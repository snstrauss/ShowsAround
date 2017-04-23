
import React, { Component } from 'react';

import { View, Text, Image, TouchableHighlight } from 'react-native';

import MultiShowStyles from './MultiShow-styles';
const { showBox, textParent, titleStyle, imageParent, carouselItem, carouselText } = MultiShowStyles;

import ShowIf from '../../helper-components/show-if/ShowIf';
import Carousel from 'react-native-looped-carousel';

class MultiShow extends Component {

    state = {
        gotDefaults: false,
        defaultPics: {}
    }



    componentWillMount() {


    }

    render() {

        let theShows = this.props.shows;
        theShows = (typeof theShows === 'Array') ? theShows[0] : theShows
        // thisShow = this.props.shows[0];
        artistsPics = this.props.pics;

        
        debugger;
        

        return (

            <View style={showBox}>
                <View style={textParent}>
                    <Text style={titleStyle}>{theShows.location}</Text>
                </View>
                <Carousel style={{ height: 150 }} delay={4000} autoplay >
                    {artistsPics.map((artist) => (
                        <View style={carouselItem} key={artist.artist}>
                            <Image resizeMode="stretch"
                                style={{ height: 150 }}
                                source={{ uri: artist.pic }}>
                                <View style={{ backgroundColor: 'white', zIndex: 2 }}>
                                    <Text style={{ fontSize: 24, color: 'red' }}>
                                        {artist.artist}
                                    </Text>
                                </View>
                            </Image>
                        </View>
                    ))}
                </Carousel>
            </View>


        )
    }
}

export default MultiShow;

