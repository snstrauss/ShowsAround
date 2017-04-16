
import React, { Component } from 'react';

import { View, Text, ScrollView } from 'react-native';

import OnlyShowsStyles from './OnlyShows-styles';
const { view, text } = OnlyShowsStyles;

import Accordion from 'react-native-collapsible/Accordion';

import ShowHeader from '../show/show-export/ShowHeader';
import ShowContent from '../show/show-export/ShowContent';
import EndItem from '../../helper-components/end-item/EndItem';

class OnlyShows extends Component {

    componentWillMount(){
        
        debugger;
        console.log(this.props.defaultPictures);
    }

    render(){

        const defaultArtist = {
            Indie: '',
            details: '',
            english: '',
            genres: '',
            image: 'https://www.chicagoentertainmentagency.com/blog/wp-content/uploads/2014/02/Live-Music.jpg'
        }

        return (
            <ScrollView ref="scrolly">
                <Accordion

                    ref="accord"

                    sections={this.props.showsToShow}

                    renderHeader={(show, idx) => {
                        
                        let thisArtist = this.props.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                        
                        return (
                            <View>
                                <ShowHeader key={show.artist + idx} 
                                    idx={idx} 
                                    isLast={idx === this.props.showsToShow.length - 1} 
                                    show={show} 
                                    artist={thisArtist} 
                                    parent={this} />
                            </View>
                        )
                    }}

                    renderContent={(show, idx) => {
                        
                        let thisArtist = this.props.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                        
                        return (
                            <View>
                                <ShowContent key={show.artist + idx} 
                                    idx={idx} 
                                    isLast={idx === this.props.showsToShow.length - 1} 
                                    show={show} 
                                    artist={thisArtist} 
                                    parent={this} />
                            </View>
                        )
                    }}

                    onChange={(idx) => {
                        if (idx === this.props.showsToShow.length - 1){
                            {/*console.log(this.state.goDown());*/}
                        }
                    }}>
                </Accordion>
                <EndItem></EndItem>
            </ScrollView>
        )
    }
}

export default OnlyShows;