
import React, { Component } from 'react';

import { View, Text, Image, TouchableHighlight } from 'react-native';

import MultiShowStyles from './MultiShow-styles';
const { showBox, textParent, titleStyle, imageParent, carouselItem, carouselText, details, detailsText } = MultiShowStyles;

import ShowIf from '../../helper-components/show-if/ShowIf';
import NavButton from '../../helper-components/nav-button/NavButton-comp';
import Carousel from 'react-native-looped-carousel';

class MultiShow extends Component {

    state = {
        gotDefaults: false,
        defaultPics: {},
        showDetails: false
    }

    showDetails(event){
        
        this.setState((oldState) => {

            let cond = !oldState.showDetails;

            return {
                showDetails: cond
            }
        })
    }

    render() {

        let theShows = this.props.shows;
        theShows = (typeof theShows === 'Array') ? theShows[0] : theShows
        // thisShow = this.props.shows[0];
        artistsPics = this.props.pics; 
        
        moreThanOneArtist = artistsPics && artistsPics.length > 1;
        let showTitle = theShows.location;
        if(!moreThanOneArtist){
            showTitle += ' - ' + theShows.artist;   
        }
        
        let description = theShows.details;

        return (
            <TouchableHighlight onPress={this.showDetails.bind(this)} >
                <View style={showBox}>
                    <View style={textParent}>
                        <Text style={titleStyle}>{showTitle}</Text>
                    </View>
                    <ShowIf condition={moreThanOneArtist}
                            else=
                            {
                                <NavButton title={this.props.cityName}
                                        hideTitle={true}
                                        titleColor="white"
                                        imageSrc={{uri: artistsPics[0].pic}}
                                        onPress={this.showDetails.bind(this)} />
                            } >
                        
                        <Carousel style={{ height: 150 }} delay={4000} autoplay >
                            {artistsPics.map((artist) => (
                                <TouchableHighlight onPress={this.showDetails.bind(this)} style={carouselItem} key={artist.artist}>
                                    <Image resizeMode="stretch"
                                        style={{ height: 150 }}
                                        source={{ uri: artist.pic }}>
                                        <View style={{ backgroundColor: 'white', zIndex: 2 }}>
                                            <Text style={carouselText}>
                                                {artist.artist}
                                            </Text>
                                        </View>
                                    </Image>
                                </TouchableHighlight>
                            ))}
                        </Carousel>
                    </ShowIf>
                    <ShowIf condition={this.state.showDetails}>
                        <View style={details}>
                            <Text style={detailsText}>
                                {description}
                            </Text>
                        </View>
                    </ShowIf>
                </View>
            </TouchableHighlight>


        )
    }
}

export default MultiShow;

