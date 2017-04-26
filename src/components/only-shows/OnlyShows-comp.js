
import React, { Component } from 'react';

import { View, Text, ScrollView, TouchableHighlight } from 'react-native';

import OnlyShowsStyles from './OnlyShows-styles';
const { view, text, noMoreShowsBuffer, noMoreShowsText } = OnlyShowsStyles;

import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ShowHeader from '../show/show-export/ShowHeader';
import ShowContent from '../show/show-export/ShowContent';
import EndItem from '../../helper-components/end-item/EndItem';
import ShowIf from '../../helper-components/show-if/ShowIf';
import DetailsBuffer from '../../helper-components/details-buffer/DetailsBuffer-comp';

class OnlyShows extends Component {

    state = {
        activeIndex: this.props.showsToShow.length - 1,
        bufferHeight: 40,
        isFirstTime: true
    }

    makeActive(index, event){
        
        let newIndex = (index === this.state.activeIndex) ? false : index;

        this.setState({
            activeIndex: newIndex
        })
    }

    render(){

        const defaultArtist = {
            Indie: '',
            details: '',
            english: '',
            genres: '',
            image: 'https://www.chicagoentertainmentagency.com/blog/wp-content/uploads/2014/02/Live-Music.jpg'
        }

        let lastIndex = this.props.showsToShow.length - 1;
        
        let firstTime = this.state.isFirstTime;

        return (
            <ScrollView ref="scrolly">
                <Accordion

                    activeSection={this.state.activeIndex}

                    ref="accord"

                    sections={this.props.showsToShow}

                    renderHeader={(show, idx) => {
                        
                        let thisArtist = this.props.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                        let isLast = idx === lastIndex;
                        return (
                            <View>
                                <ShowHeader key={show.artist + idx} 
                                    idx={idx} 
                                    isLast={isLast} 
                                    show={show} 
                                    artist={thisArtist} 
                                    parent={this}
                                    onPress={this.makeActive.bind(this, idx)} />
                            </View>
                        )
                    }}

                    renderContent={(show, idx, isActive) => {
                        
                        let thisArtist = this.props.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                        let isLast = (idx === lastIndex);
                        
                        
                        return (
                            <View onLayout={(event) => {
                                    
                                    if(isLast && firstTime){
                                        this.setState({
                                            activeIndex: -1,
                                            bufferHeight: event.nativeEvent.layout.height,
                                            isFirstTime: false
                                        })
                                    }
 
                                }}>
                                <ShowContent key={show.artist + idx} 
                                    idx={idx} 
                                    isLast={isLast} 
                                    show={show} 
                                    artist={thisArtist} 
                                    parent={this} />
                            </View>
                        )
                    }}

                    self={this} >
                </Accordion>
                <DetailsBuffer color="#4F4F4F" fontSize={25} height={this.state.bufferHeight}>
                    no more shows for now...
                    <Icon name="heart-broken" size={30} color="firebrick"/>
                </DetailsBuffer>
                <EndItem height={400}/>
            </ScrollView>
        )
    }
}

export default OnlyShows;