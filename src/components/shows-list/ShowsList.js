// import react
import React, { Component } from 'react';

// import react-native
import { ScrollView, View, Text } from 'react-native';

// import stylesheet
import showListStyles from './ShowsList-styles.js';

// import custom components
import Show from '../show/Show.js';
import Header from '../header/header-component.js';
import Independ from '../independance/independ-comp';

// import helper components
import ShowIf from '../../helper-components/show-if/ShowIf.js';
import WaitMsg from '../../helper-components/wait-msg/WaitMsg.js';
import EndItem from '../../helper-components/end-item/EndItem.js';

// import services
import Color from '../../services/random-color/randomColor.js';

class ShowsList extends Component {
    
    state = {
        showsArray: [],
        gotShows: false,
        defaultPictures: {},
        gotArtists: false
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
            
            this.setState({
                defaultPictures: artistsJson,
                gotArtists: true
            })
        })


        fetch('http://showsaround.s3-website-eu-west-1.amazonaws.com/shows.json')
        .then((response) => response.text())
        .then((responseText) => {

            function updateShows(jsonpData){
                return jsonpData;
            }

            eval('var fullJson = ' + responseText);

            var onlyData = fullJson.filter((show) => {
                return (show.artist !== '');
            })

            var now = new Date();

            var onlyAfterToday = fullJson.filter(findAfterToday.bind(null, now));

            function findAfterToday(now, show){
                
                const showDate = new Date(show.date);

                if(show.date){
                    return (showDate.getFullYear() >= now.getFullYear() && 
                            showDate.getMonth() >= now.getMonth() && 
                            showDate.getDate() >= now.getDate()
                            );
                } else {
                    return false;
                }
            }

            console.log(onlyAfterToday);
            console.log('');

            this.setState({
                showsArray: onlyAfterToday,
                gotShows: true
            })
        })

    }

    scrollDown() {
        setTimeout(() => { this.view.scrollToEnd(); }, 1)
    }

    render(){

        let theArray = [];
        if(this.state.showsArray.length){
            theArray = this.state.showsArray;
        }

        const defaultArtist = {
            Indie: '',
            details: '',
            english: '',
            genres: '',
            image: 'https://www.chicagoentertainmentagency.com/blog/wp-content/uploads/2014/02/Live-Music.jpg'
        }

        return (
            <ShowIf condition={this.state.gotShows && this.state.gotArtists} else={<WaitMsg msg={'please wait...'}/>}>
                <ScrollView ref={view => this.view = view} >
                    <Independ />
                    {theArray.map((show, idx) => {

                        let thisArtist = this.state.defaultPictures[show.artist.split(',')[0]] || defaultArtist;

                        return (
                            <View key={`${show.artist} - ${show.date} - ${idx}`}>
                                {/* 
                                    this will render before the first item, and will 
                                    serve as buffer before header    
                                 */}
                                <ShowIf condition={idx === 0}>
                                    <View style={{borderTopWidth: 2, borderColor: Color.getRandom()}}></View>
                                </ShowIf>
                                
                                {/* 
                                    this is the actual item
                                 */}
                                <Show key={show.artist + idx} idx={idx} isLast={idx === theArray.length - 1} show={show} artist={thisArtist} parent={this}></Show>

                                {/* 
                                    this will render after the last item, and will be used 
                                    as a buffer for the ScrollView glitch
                                    (the actual last item will be fully visible)    
                                 */}
                                <ShowIf condition={idx === theArray.length - 1}>
                                    <EndItem></EndItem>
                                </ShowIf>

                            </View>
                        )
                    })}
                </ScrollView>
            </ShowIf>
        )
    }
};

export default ShowsList;
