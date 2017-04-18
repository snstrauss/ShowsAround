
import React, { Component } from 'react';

import { View, Text, Image, TouchableHighlight } from 'react-native';

import MultiShowStyles from './MultiShow-styles';
const { showBox, textParent, titleStyle, imageParent, carouselItem  } = MultiShowStyles;

import ShowIf from '../../helper-components/show-if/ShowIf';
import Carousel from 'react-native-looped-carousel';

class MultiShow extends Component {

    state = {
        gotDefaults: false,
        defaultPics: {}
    }



    componentWillMount(){

        fetch('http://showsaround.s3-website-eu-west-1.amazonaws.com/artists.json')
        .then((response) => response.text())
        .then((responseText) => {

            function updateArtists(jsonpData){
                return jsonpData;
            }

            eval('var artistsJson = ' + responseText);

            console.log(artistsJson);
            
            debugger;
            
            this.setState({
                defaultPics: artistsJson,
                gotDefaults: true
            })
        })
    }

    render(){

        thisShow = this.props.shows[0];
        artists = thisShow.artist.split(', ');

        debugger;
       

        return (
            <ShowIf condition={Object.keys(this.state.defaultPics).length}>
                <View style={showBox}>  
                    <View style={textParent}>
                        <Text style={titleStyle}>{thisShow.location}</Text>    
                    </View>
                    <Carousel style={{height: 150}} delay={2000} autoplay >
                        {artists.map((artistName) => (
                            <View style={carouselItem} key={artistName}>
                                <Text>
                                    {artistName}
                                </Text>
                            </View>
                        ))}
                    </Carousel>
                </View>
            </ShowIf>
            
        )
    }
}

export default MultiShow;

// {/*<Image resizeMode="stretch" 
//                                     style={{height: 150}}
//                                     source={{uri: this.state.defaultPics[artistName].image || 'https://s-media-cache-ak0.pinimg.com/originals/dc/8d/e0/dc8de0b124fbfc1865cb2daff109ce02.jpg'}}></Image>*/}