
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
        showDetails: false,
        currentArtistIndex: 0
    }

    showDetails(event){
        
        this.setState((oldState) => {
            
            let cond = !oldState.showDetails;

            return {
                showDetails: cond
            }
        })
    }

    slideChanged(idx){
        
        console.log('slide changed!');
        console.log(idx);
        console.log('');
        // debugger;
        
    }

    render() {
        
        
        let theShows = this.props.shows;
        theShows = (typeof theShows === 'Array') ? theShows[0] : theShows;
        let theArtists = this.props.shows.artist.split(', ');
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
                <View>
                    {/*<View style={textParent} collapsable={false}>
                        <Text style={titleStyle}>{showTitle}</Text>
                    </View>*/}
                    <View style={showBox}>
                        <ShowIf condition={moreThanOneArtist}
                                else=
                                {
                                    <View>
                                        <NavButton title={showTitle}
                                            titleColor="white"
                                            imageSrc={{uri: artistsPics[0].pic}}
                                            onPress={this.showDetails.bind(this)} />
                                    </View>
                                    
                                } >
                            
                            <Carousel style={{ height: 150 }}
                                      delay={4000} 
                                      autoplay
                                      onAnimateNextPage={this.slideChanged.bind(this)} >
                                {artistsPics.map((artist) => (
                                    <TouchableHighlight onPress={this.showDetails.bind(this)} style={carouselItem} key={artist.artist}>
                                        <Image resizeMode="stretch"
                                            style={{ height: 150 }}
                                            source={{ uri: artist.pic }}>
                                            <View style={textParent} collapsable={false}>
                                                <Text style={titleStyle}>{`${showTitle} - ${artist.artist}`}</Text>
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
                </View>
            </TouchableHighlight>


        )
    }
}

export default MultiShow;

