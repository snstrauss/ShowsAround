// import react
import React, { Component } from 'react';

// import react-native
import { ScrollView, View, Text, Image, TouchableHighlight } from 'react-native';
import Button from 'react-native-button';

// import stylesheet
import showListStyles from './ShowsList-styles.js';
const { navButton, navImage, navTextView, navText } = showListStyles;

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
    
    static navigationOptions = {
        // header: {
        //     visible: false
        // }
        headerVisible: false
    }

    state = {
        showsArray: [],
        gotShows: false,
        
        defaultPictures: {},
        gotArtists: false,
        
        independShows: []
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
            
            console.info('only data!');
            console.info(onlyData);

            var now = new Date();

            var onlyAfterToday = fullJson.filter(findAfterToday.bind(null, now));

            function findAfterToday(now, show){
                
                const showDate = new Date(show.date);

                return ((showDate > now) && (!show.area.includes('עצמאות')));
            }

            var onlyIndepend = fullJson.filter(findIndepend);

            function findIndepend(show){
                return show.area.includes('עצמאות');
            }

            console.info('only after today!');
            console.info(onlyAfterToday);
            console.log('');
            console.info('only independance');
            console.info(onlyIndepend);
            console.log('');


            this.setState({
                showsArray: onlyAfterToday,
                gotShows: true,
                independShows: onlyIndepend
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

        const { navigate } = this.props.navigation;
        
        return (
            <View>
                <Header title="ShowsAround" />
                <ShowIf condition={this.state.gotShows && this.state.gotArtists} else={<WaitMsg msg={'please wait...'}/>}>
                    <TouchableHighlight style={navButton} onPress={() => navigate('Areas')}>
                        <View>
                            <View style={navTextView}>
                                <Text style={navText}>
                                    לאירועי יום העצמאות
                                </Text>
                            </View>
                            <Image resizeMode="stretch" style={navImage} source={require('../../assets/fireworks.jpg')} />
                        </View>
                    </TouchableHighlight>
                    <ScrollView ref={view => this.view = view} >
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
            </View>
        )
    }
};

export default ShowsList;
