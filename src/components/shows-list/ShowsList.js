// import react
import React, { Component } from 'react';

// import react-native
import { ScrollView, View, Text, Image, TouchableHighlight } from 'react-native';
import Button from 'react-native-button';

import Accordion from 'react-native-collapsible/Accordion';

// import stylesheet
import showListStyles from './ShowsList-styles.js';
const { navButton, navImage, navTextView, navText } = showListStyles;
import ShowStyles from '../show/Show-styles';

// import custom components
import Show from '../show/Show.js';
import Header from '../header/header-component.js';
import Independ from '../independance/independ-comp';
import ShowHeader from '../show/show-export/ShowHeader';
import ShowContent from '../show/show-export/ShowContent';


// import helper components
import ShowIf from '../../helper-components/show-if/ShowIf.js';
import WaitMsg from '../../helper-components/wait-msg/WaitMsg.js';
import EndItem from '../../helper-components/end-item/EndItem.js';
import NavButton from '../../helper-components/nav-button/NavButton-comp';
import OnlyShows from '../only-shows/OnlyShows-comp';

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
        
        independShows: [],

        goDown: this.scrollDown.bind(this)
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

    scrollDown(idx) {
        setTimeout(() => { this.view.scrollToEnd(); }, 1)
    }

    goToAreas(){
        return this.props.navigation.navigate('Areas', {
            stateData: this.state.independShows,
            defaultPictures: this.state.defaultPictures
        });
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

        const self = this;

        function scrollToDown() {
            self.refs.scrolly.scrollToEnd();
            // setTimeout(() => { self.refs.scrolly.scrollToEnd(); }, 1)
        }

        return (
            <View>
                <Header title="ShowsAround" />
                <ShowIf condition={this.state.gotShows && this.state.gotArtists} else={<WaitMsg msg={'please wait...'}/>}>
                    <NavButton title="לאירועי יום העצמאות" 
                               titleColor="gold"
                               imageSrc={require("../../assets/fireworks.jpg")}
                               onPress={this.goToAreas.bind(this)} />
                    <OnlyShows showsToShow={this.state.showsArray} 
                               defaultPictures={this.state.defaultPictures} />
                    {/*<ScrollView ref="scrolly">
                        <Accordion

                            ref="accord"

                            sections={theArray}

                            renderHeader={(show, idx) => {
                                
                                let thisArtist = this.state.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                                
                                return (
                                    <View>
                                        <ShowHeader key={show.artist + idx} 
                                            idx={idx} 
                                            isLast={idx === theArray.length - 1} 
                                            show={show} 
                                            artist={thisArtist} 
                                            parent={this} />
                                    </View>
                                )
                            }}

                            renderContent={(show, idx) => {
                                
                                let thisArtist = this.state.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                                
                                return (
                                    <View>
                                        <ShowContent key={show.artist + idx} 
                                            idx={idx} 
                                            isLast={idx === theArray.length - 1} 
                                            show={show} 
                                            artist={thisArtist} 
                                            parent={this} />
                                    </View>
                                )
                            }}
                            
                            parentman={self}

                            self={this.refs.accord}

                            onChange={(idx) => {
                                if (idx === theArray.length - 1){
                                    console.log(this.parentman.state.goDown());
                                }
                            }}>
                        </Accordion>
                        <EndItem></EndItem>
                    </ScrollView>*/}
                </ShowIf>
            </View>
        )
    }
};

export default ShowsList;
